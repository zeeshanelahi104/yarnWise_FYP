// "use client";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useParams, useRouter } from "next/navigation";
// import { UserTypes } from "@/types";
// import {
//   useGetUserQuery,
//   useUpdateUserMutation,
//   useAddUserMutation,
// } from "@/features//userSlice";
// import { Button } from "@/components/ui/button";
// import { useGetRolesQuery } from "@/features/roleSlice";
// import axios from "axios";

// export default function AddUserForm() {
//   const params = useParams();
//   const router = useRouter();
//   const { id } = params;
//   const userId = Array.isArray(id) ? id[0] : id;
//   const [user, setUser] = useState<UserTypes>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     role: "",
//     permissions: {
//       user: [],
//       role: [],
//       inventory: [],
//       transaction: [],
//       broker: [],
//       party: [],
//       report: [],
//       dashboard: [],
//     },
//     address: "",
//   });

//   // Fetch user data
//   const {
//     data: userData,
//     isLoading: isUserLoading,
//     isSuccess: isUserSuccess,
//     isError: isUserError,
//     error: userError,
//   } = useGetUserQuery(userId); // Use userId here instead of id

//   // Fetch roles data
//   const {
//     data: rolesData,
//     isLoading: isRolesLoading,
//     isSuccess: isRolesSuccess,
//     isError: isRolesError,
//     error: rolesError,
//   } = useGetRolesQuery();

//   const [addUser] = useAddUserMutation();
//   const [updateUser] = useUpdateUserMutation();

//   useEffect(() => {
//     if (isUserSuccess && userData && userData.user) {
//       setUser(userData.user);
//     }
//   }, [isUserSuccess, userData]);

//   const handleChange = (field: string, value: any) => {
//     const parsedValue = parseInt(value);
//     if (
//       ["debit", "credit", "brokerCommissionPercentage"].includes(field) &&
//       parsedValue < 0
//     ) {
//       return;
//     }
//     setUser((prevData) => ({ ...prevData, [field]: value }));
//   };
//   const countDigits = (contactNumber: string) => {
//     const numericString = contactNumber.replace(/\D/g, ""); // Remove non-numeric characters
//     return numericString.length; // Return the length of the numeric string
//   };
//   const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     let dataToSend = { ...user };

//     if (dataToSend._id) {
//       delete dataToSend._id;
//     }
//     if (
//       !user.firstName ||
//       !user.lastName ||
//       !user.email ||
//       !user.address ||
//       !user.phoneNumber ||
//       !user.password
//     ) {
//       alert("All Fields are required");
//       return;
//     }
//     if (user.password.length < 8) {
//       alert("Please Enter Password Of minimum 8 characters");
//       return;
//     }
//     if (countDigits(user.phoneNumber) !== 11) {
//       alert("Enter only 11 digits Phone Number");
//       return;
//     }
//     const regex = /[^a-zA-Z\s]/;
//     if (regex.test(user.firstName) || regex.test(user.lastName)) {
//       alert(
//         "Names cannot contain numbers or characters. Please enter only alphabets."
//       );
//       return;
//     }

//     if (id) {
//       updateUser({ userId, body: dataToSend })
//         .unwrap()
//         .then(() => {
//           toast.success("User updated successfully");
//           setUser({
//             firstName: "",
//             lastName: "",
//             email: "",
//             password: "",
//             role: "",
//             permissions: {
//               user: [],
//               role: [],
//               inventory: [],
//               transaction: [],
//               broker: [],
//               party: [],
//               report: [],
//               dashboard: [],
//             },
//             address: "",
//             phoneNumber: "",
//           });
//           router.push("/users");
//         })
//         .catch(() => {
//           toast.error("Error updating user");
//         });
//     } else {
//       addUser(user)
//         .unwrap()
//         .then(() => {
//           toast.success("User added successfully");
//           setUser({
//             firstName: "",
//             lastName: "",
//             email: "",
//             password: "",
//             role: "",
//             permissions: {
//               user: [],
//               role: [],
//               inventory: [],
//               transaction: [],
//               broker: [],
//               party: [],
//               report: [],
//               dashboard: [],
//             },
//             address: "",
//             phoneNumber: "",
//           });
//           router.push("/users");
//         })
//         .catch(() => {
//           toast.error("Error adding user");
//         });
//     }
//   };

//   const handleRoleChange = (e: any) => {
//     const selectedRole = e.target.value;
//     const selectedRoleObject = rolesData.role.find(
//       (role: any) => role.role === selectedRole
//     );
//     setUser((prevUser) => ({
//       ...prevUser,
//       role: selectedRole,
//       permissions: selectedRoleObject ? selectedRoleObject.permissions : {},
//     }));
//   };

//   return (
//     <>
//       <div className="register-page-wrapper flex py-5">
//         <div className="register-form w-full flex flex-1 flex-col ">
//           <h1 className="title container pt-[10px] text-[40px] text-primary-clr title font-bold flex justify-center items-center uppercase">
//             {id ? "Edit" : "Add"} User
//           </h1>
//           <div className="register-form-wrapper container">
//             <div className="register-form-inner-wrapper rounded-[10px]">
//               <div className="registration-fields-wrapper grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <label>
//                   Enter First Name
//                   <Input
//                     className="rounded-[10px] w-full text-black border border-primary-clr mt-2"
//                     type="text"
//                     name="firstName"
//                     placeholder="Enter Your First Name"
//                     value={user.firstName}
//                     onChange={(e) => handleChange("firstName", e.target.value)}
//                   />
//                 </label>
//                 <label>
//                   Enter Last Name
//                   <Input
//                     className="rounded-[10px] w-full text-black border border-primary-clr mt-2"
//                     type="text"
//                     name="lastName"
//                     placeholder="Enter Your Last Name"
//                     value={user.lastName}
//                     onChange={(e) => handleChange("lastName", e.target.value)}
//                   />
//                 </label>
//                 <label>
//                   Enter Your Email
//                   <Input
//                     className="rounded-[10px] w-full mt-2 text-black border border-primary-clr "
//                     type="email"
//                     name="email"
//                     placeholder="Enter Your Email"
//                     value={user.email}
//                     onChange={(e) => handleChange("email", e.target.value)}
//                   />
//                 </label>
//                 <label>
//                   Enter Your Password
//                   <Input
//                     className="rounded-[10px] mt-2 w-full text-black border border-primary-clr "
//                     type="password"
//                     name="password"
//                     placeholder="Enter Password of minimum 8 characters"
//                     value={user.password}
//                     onChange={(e) => handleChange("password", e.target.value)}
//                   />
//                 </label>
//                 <label>
//                   Enter Your Address
//                   <Input
//                     className="rounded-[10px] mt-2 w-full text-black border border-primary-clr"
//                     type="text"
//                     name="address"
//                     placeholder="Enter Your Address"
//                     value={user.address}
//                     onChange={(e) => handleChange("address", e.target.value)}
//                   />
//                 </label>
//                 <label>
//                   Enter Your Phone Number
//                   <Input
//                     className="rounded-[10px] mt-2 w-full text-black border border-primary-clr"
//                     type="number"
//                     inputMode="numeric"
//                     pattern="[0-9]*"
//                     name="phoneNumber"
//                     placeholder="Enter Your Phone Number"
//                     value={user.phoneNumber}
//                     onChange={(e) =>
//                       handleChange("phoneNumber", parseInt(e.target.value))
//                     }
//                     onInput={(e) => {
//                       const target = e.target as HTMLInputElement;
//                       target.value = target.value.replace(/\D/g, "");
//                     }}
//                   />
//                 </label>
//                 <label>
//                   Select Role
//                   <select
//                     name="role"
//                     id="role"
//                     value={user.role}
//                     onChange={handleRoleChange}
//                     className="rounded-[10px] mt-2 w-full text-black border border-primary-clr p-2"
//                   >
//                     {rolesData?.role?.map((role: any) => (
//                       <option key={role._id} value={role.role}>
//                         {role.role}
//                       </option>
//                     ))}
//                   </select>
//                 </label>
//               </div>
//               <div className="text-center mt-10">
//                 <Button
//                   className="primaryBtn w-[150px] hover:bg-black hover:text-white text-white"
//                   onClick={handleSave}
//                 >
//                   {id ? "Edit" : "Add"} User
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { UserTypes } from "@/types";
import {
  useGetUserQuery,
  useUpdateUserMutation,
  useAddUserMutation,
} from "@/features//userSlice";
import { Button } from "@/components/ui/button";
import { useGetRolesQuery } from "@/features/roleSlice";
import axios from "axios";

export default function AddUserForm() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const userId = Array.isArray(id) ? id[0] : id;
  const [user, setUser] = useState<UserTypes>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    permissions: {
      user: [],
      role: [],
      inventory: [],
      transaction: [],
      broker: [],
      party: [],
      report: [],
      dashboard: [],
    },
    address: "",
  });

  // Fetch user data
  const {
    data: userData,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
    isError: isUserError,
    error: userError,
  } = useGetUserQuery(userId); // Use userId here instead of id

  // Fetch roles data
  const {
    data: rolesData,
    isLoading: isRolesLoading,
    isSuccess: isRolesSuccess,
    isError: isRolesError,
    error: rolesError,
  } = useGetRolesQuery();

  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (isUserSuccess && userData && userData.user) {
      setUser(userData.user);
    }
  }, [isUserSuccess, userData]);

  const handleChange = (field: string, value: any) => {
    setUser((prevData) => ({ ...prevData, [field]: value }));
  };

  const countDigits = (contactNumber: string) => {
    const numericString = contactNumber.replace(/\D/g, ""); // Remove non-numeric characters
    return numericString.length; // Return the length of the numeric string
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let dataToSend = { ...user };

    if (dataToSend._id) {
      delete dataToSend._id;
    }
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.address ||
      !user.phoneNumber ||
      !user.password
    ) {
      alert("All Fields are required");
      return;
    }
    if (user.password.length < 8) {
      alert("Please Enter Password Of minimum 8 characters");
      return;
    }
    if (countDigits(user.phoneNumber) !== 11) {
      alert("Enter only 11 digits Phone Number");
      return;
    }
    const regex = /[^a-zA-Z\s]/;
    if (regex.test(user.firstName) || regex.test(user.lastName)) {
      alert(
        "Names cannot contain numbers or characters. Please enter only alphabets."
      );
      return;
    }

    if (id) {
      updateUser({ userId, body: dataToSend })
        .unwrap()
        .then(() => {
          toast.success("User updated successfully");
          setUser({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "",
            permissions: {
              user: [],
              role: [],
              inventory: [],
              transaction: [],
              broker: [],
              party: [],
              report: [],
              dashboard: [],
            },
            address: "",
            phoneNumber: "",
          });
          router.push("/users");
        })
        .catch(() => {
          toast.error("Error updating user");
        });
    } else {
      addUser(user)
        .unwrap()
        .then(() => {
          toast.success("User added successfully");
          setUser({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "",
            permissions: {
              user: [],
              role: [],
              inventory: [],
              transaction: [],
              broker: [],
              party: [],
              report: [],
              dashboard: [],
            },
            address: "",
            phoneNumber: "",
          });
          router.push("/users");
        })
        .catch(() => {
          toast.error("Error adding user");
        });
    }
  };

  const handleRoleChange = (e: any) => {
    const selectedRole = e.target.value;
    const selectedRoleObject = rolesData.role.find(
      (role: any) => role.role === selectedRole
    );
    setUser((prevUser) => ({
      ...prevUser,
      role: selectedRole,
      permissions: selectedRoleObject ? selectedRoleObject.permissions : {},
    }));
  };

  return (
    <>
      <div className="register-page-wrapper flex py-5">
        <div className="register-form w-full flex flex-1 flex-col ">
          <h1 className="title container pt-[10px] text-[40px] text-primary-clr title font-bold flex justify-center items-center uppercase">
            {id ? "Edit" : "Add"} User
          </h1>
          <div className="register-form-wrapper container">
            <div className="register-form-inner-wrapper rounded-[10px]">
              <div className="registration-fields-wrapper grid grid-cols-1 md:grid-cols-2 gap-8">
                <label>
                  Enter First Name
                  <Input
                    className="rounded-[10px] w-full text-black border border-primary-clr mt-2"
                    type="text"
                    name="firstName"
                    placeholder="Enter Your First Name"
                    value={user.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                </label>
                <label>
                  Enter Last Name
                  <Input
                    className="rounded-[10px] w-full text-black border border-primary-clr mt-2"
                    type="text"
                    name="lastName"
                    placeholder="Enter Your Last Name"
                    value={user.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                </label>
                <label>
                  Enter Your Email
                  <Input
                    className="rounded-[10px] w-full mt-2 text-black border border-primary-clr "
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    value={user.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </label>
                <label>
                  Enter Your Password
                  <Input
                    className="rounded-[10px] mt-2 w-full text-black border border-primary-clr "
                    type="password"
                    name="password"
                    placeholder="Enter Password of minimum 8 characters"
                    value={user.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                </label>
                <label>
                  Enter Your Address
                  <Input
                    className="rounded-[10px] mt-2 w-full text-black border border-primary-clr"
                    type="text"
                    name="address"
                    placeholder="Enter Your Address"
                    value={user.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                </label>
                <label>
                  Enter Your Phone Number
                  <Input
                    className="rounded-[10px] mt-2 w-full text-black border border-primary-clr"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    name="phoneNumber"
                    placeholder="Enter Your Phone Number"
                    value={user.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/\D/g, "");
                    }}
                  />
                </label>
                <label>
                  Select Role
                  <select
                    name="role"
                    id="role"
                    value={user.role}
                    onChange={handleRoleChange}
                    className="rounded-[10px] mt-2 w-full text-black border border-primary-clr p-2"
                  >
                    {rolesData?.role?.map((role: any) => (
                      <option key={role._id} value={role.role}>
                        {role.role}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="text-center mt-10">
                <Button
                  className="primaryBtn w-[150px] hover:bg-black hover:text-white text-white"
                  onClick={handleSave}
                >
                  {id ? "Edit" : "Add"} User
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
