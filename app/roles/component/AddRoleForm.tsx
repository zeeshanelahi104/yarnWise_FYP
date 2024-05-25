"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Role } from "@/types";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  useGetRoleQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
} from "@/features/roleSlice";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
interface RolePermissions {
  user: string[];
  role: string[];
  inventory: string[];
  transaction: string[];
  broker: string[];
  party: string[];
  report: string[];
}

interface RoleState {
  role: string;
  permissions: RolePermissions;
}

export default function AddRoleForm() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const { id } = params;
  const roleId = Array.isArray(id) ? id[0] : id;
  const [role, setRole] = useState<RoleState>({
    role: "",
    permissions: {
      user: [],
      role: [],
      inventory: [],
      transaction: [],
      broker: [],
      party: [],
      report: [],
    },
  });

  const { data: roleData, isLoading } = useGetRoleQuery(id);
  const [addRole] = useAddRoleMutation();
  const [updateRole] = useUpdateRoleMutation();

  useEffect(() => {
    if (!isLoading && roleData && roleData.role) {
      setRole(roleData.role);
    }
  }, [isLoading, roleData]);

  // const handleChange = (
  //   category: keyof RolePermissions,
  //   permission: string
  // ) => {
  //   setRole((prevRole) => ({
  //     ...prevRole,
  //     permissions: {
  //       ...prevRole.permissions,
  //       [category]: prevRole.permissions[category]?.includes(permission)
  //         ? prevRole.permissions[category]?.filter((p) => p !== permission)
  //         : [...prevRole.permissions[category], permission],
  //     },
  //   }));
  // };
  const handleChange = (
    category: keyof RolePermissions,
    permission: string
  ) => {
    if (category === "report") {
      setRole((prevRole) => ({
        ...prevRole,
        permissions: {
          ...prevRole.permissions,
          report: permission === "view" ? [permission] : [],
        },
      }));
    } else {
      setRole((prevRole) => ({
        ...prevRole,
        permissions: {
          ...prevRole.permissions,
          [category]: prevRole.permissions[category]?.includes(permission)
            ? prevRole.permissions[category]?.filter((p) => p !== permission)
            : [...prevRole.permissions[category], permission],
        },
      }));
    }
  };

  const handleSave = async () => {
    try {
      if (roleId) {
        await updateRole({ roleId, body: role });

        toast.success("Role updated successfully");
        update({ permissions: role.permissions });
        // Fetch all users with this role from the database
        const url = `http://localhost:3000/api/getAllUsersByRoleName?role=${role.role}`;
        let postData = {
          role: role?.role,
        };
        const response = await axios.post(url, postData);
        const users = response;
        // Update permissions for each user
        await Promise.all(
          users.data.users.map(async (user: any) => {
            try {
              await axios.post(
                `http://localhost:3000/api/updateUserPermissions`,
                {
                  userId: user._id,
                  permissions: role.permissions,
                }
              );
              // Handle success response if needed
            } catch (error) {
              console.error("Error updating user permissions:", error);
              // Handle error if needed
            }
          })
        );
      } else {
        await addRole(role);
        toast.success("Role added successfully");
      }

      setRole({
        role: "",
        permissions: {
          user: [],
          role: [],
          inventory: [],
          transaction: [],
          broker: [],
          party: [],
          report: [],
        },
      });
      router.push("/roles");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <>
      <div className="addrole-from-wrapper flex flex-col gap-10 flex-1 container pt-[45px]">
        <h1 className="title text-primary-clr text-center">
          {id ? "Edit" : "Add"} Role
        </h1>
        <div className="addrole-input w-full">
          <label>
            Add Role
            <Input
              type="text"
              className="w-full border border-black font-bold mt-2"
              placeholder="Enter Role Name"
              value={role?.role}
              onChange={(e) => setRole({ ...role, role: e.target.value })}
            />
          </label>
        </div>
        <div className="permissions-table">
          <div className="permissions-table-wrapper">
            <div className="permission-table">
              <table className="border border-gray-200 w-full">
                <thead>
                  <tr>
                    <td>Permissions</td>
                    <td className="text-center">Create</td>
                    <td className="text-center">Update</td>
                    <td className="text-center">View</td>
                    <td className="text-center">Delete</td>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(role.permissions).map(
                    ([category, permissions]) => (
                      <tr key={category}>
                        <td className="font-bold">{category}</td>
                        {/* {["create", "update", "view", "delete"].map(
                          (permission) => (
                            <td key={permission} className="text-center">
                              <input
                                type="checkbox"
                                id={`${category}-${permission}`}
                                value={`${category}-${permission}`}
                                name={`${category}-${permission}`}
                                checked={permissions.includes(permission)}
                                onChange={() =>
                                  handleChange(
                                    category as keyof RolePermissions,
                                    permission
                                  )
                                }
                              />
                            </td>
                          )
                        )} */}
                        {["create", "update","view", "delete"].map((permission) => (
                          <td key={permission} className="text-center">
                            <input
                              type="checkbox"
                              id={`${category}-${permission}`}
                              value={`${category}-${permission}`}
                              name={`${category}-${permission}`}
                              checked={permissions.includes(permission)}
                              onChange={() =>
                                handleChange(
                                  category as keyof RolePermissions,
                                  permission
                                )
                              }
                              disabled={
                                category === "report" && permission !== "view"
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
            <div className="btns-wrapper"></div>
          </div>
          <div className="flex gap-5">
            <div className=" mt-10">
              <button
                className="bg-primary-clr w-[150px] hover:bg-black hover:text-white text-white px-4 py-2 rounded-[5px]"
                onClick={handleSave}
                type="submit"
              >
                <span className="mx-auto flex justify-center">
                  {id ? "Save" : "Add"} Role
                </span>
              </button>
            </div>
            <div className=" mt-10">
              <button className="bg-white w-[100px] border border-primary-clr hover:bg-primary-clr hover:text-white text-black px-4 py-2 rounded-[5px]">
                <Link href={"/"} className="mx-auto flex justify-center">
                  Back
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
