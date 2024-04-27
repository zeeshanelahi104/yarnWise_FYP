// "use client";
// import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast, Toaster } from 'react-hot-toast';
// import Link from 'next/link';

// interface User {
//   _id: string;
// }

// interface ContextType {
//   user: User;
//   setUser: React.Dispatch<React.SetStateAction<User>>;
// }

// export const Context = createContext<ContextType | undefined>(undefined);

// interface ContextProviderProps {
//   children: ReactNode;
// }

// export const ContextProvider = ({ children }: ContextProviderProps) => {
//   const [user, setUser] = useState<User>({ _id: '' }); 

//   return (
//     <Context.Provider value={{ user, setUser }}>
//       {children}
//       <Toaster />
//     </Context.Provider>
//   );
// };

// export const LogoutBtn = () => {
//   const [user, setUser] = useState<User>({ _id: '' }); 
//   const router = useRouter();
  
//   const logoutHandler = async () => {
//     try {
//       const res = await fetch('/api/auth/logout');
//       const data = await res.json();

//       if (!data.success) toast.error(data.message);
//       else {
//         setUser({ _id: '' }); // Reset user state
//         toast.success(data.message);
//         router.push("/login")
//       }
//     } catch (error) {
//       if (typeof error === 'string') {
//         toast.error(error);
//       } else {
//         toast.error('An error occurred during logout.');
//       }
//     }
//   };

//   return  (
//     <button className="btn" onClick={logoutHandler}>
//       Logout
//     </button>
//   ) 
// };
"use client";
import { createContext, ReactNode, useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface User {
  _id: string;
  token: string;
}

interface ContextType {
  user: User | null;
  handleLogin: (userData: User, rememberMe: boolean) => void;
  handleLogout: () => void;
  isLoading: boolean; // Add isLoading state
}

export const Context = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Initialize isLoading as true
const router = useRouter();
  // useEffect(() => {
  //   // Check if user data exists in cookies
  //   const cookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
  //   if (cookie) {
  //     const token = cookie.split('=')[1];
  //     // Assuming you have a function to fetch user data based on the token
  //     fetchUserData(token);
  //   } else {
  //     setIsLoading(false); // Set isLoading to false if there is no token
  //   }
  // }, []);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser({ _id: userData._id, token });
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', (error as Error).message);
    } finally {
      setIsLoading(false); // Set isLoading to false after fetching user data (whether successful or not)
    }
  };

  const handleLogin = async (userData: User, rememberMe: boolean) => {
    try {
      console.log("User Data yuytytyt",userData);
      setUser(userData);
      document.cookie = `token=${userData.token}; path=/;${rememberMe ? 'max-age=31536000' : ''}`;
      // toast.success('Login successful!');
      // router.push("/");
    } catch (error) {
      console.error('An error occurred while logging in:', (error as Error).message);
      toast.error('Failed to log in. Please try again.');
    }
  };

  const handleLogout = () => {
    try {
      setUser(null);
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      toast.success('Logout successful!');
    } catch (error) {
      console.error('An error occurred while logging out:', (error as Error).message);
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <Context.Provider value={{ user, handleLogin, handleLogout, isLoading }}>
      {children}
    </Context.Provider>
  );
};

