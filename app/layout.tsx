"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import ReduxProvider from "@/components/ReduxProvider";
import { Toaster } from "react-hot-toast";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { AuthProvider } from "@/context/AuthProvider";
import { ReactNode } from "react";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import Navbar from "@/components/common/Navbar/Navbar";
import { usePathname } from "next/navigation";

interface RootLayoutProps {
  children?: ReactNode;
  session?: any;
}
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, session }: RootLayoutProps) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <head>
        <meta name="title" content="YarnWise" />
        <meta name="description" content="Generated by create next app" />
        <title>YarnWise</title>
      </head>
      <body className={inter.className}>
        <SessionProviderWrapper session={session}>
          <AuthProvider>
            <ReduxProvider>
              <Theme>
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1">
                    <Toaster />
                    <Navbar />
                    <div
                      className={` 
                    ${
                      pathname === "/auth/login" ||
                      pathname === "/transactions/manage-transactions" ||
                      pathname === "/reports/transactions-report" ||
                      pathname === "/reports/broker-report" ||
                      pathname === "/reports/party-report"
                        ? ""
                        : "ml-0 mt-0 mb-0 lg:ml-60 lg:mt-[6rem] lg:mb-5"
                    }
        `}
                    >
                      {children}
                    </div>
                  </div>
                </div>
              </Theme>
            </ReduxProvider>
          </AuthProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import Sidebar from '@/components/common/Sidebar/Sidebar';
// import ReduxProvider from '@/components/ReduxProvider';
// import { Toaster } from 'react-hot-toast';
// import '@radix-ui/themes/styles.css';
// import { Theme } from '@radix-ui/themes';
// import { AuthProvider } from '@/context/AuthProvider';
// import { ReactNode } from 'react';
// import SessionProviderWrapper from '@/components/SessionProviderWrapper';
// import Navbar from '@/components/common/Navbar/Navbar';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'YarnWise',
//   description: 'Generated by create next app',
// };

// interface RootLayoutProps {
//   children: ReactNode;
//   session: any;
// }

// export default function RootLayout({ children, session }: RootLayoutProps) {
//   return (
//     <html lang="en">
//       <head>{/* Meta tags, links, and other head elements */}</head>
//       <body className={inter.className}>
//         <SessionProviderWrapper session={session}>
//           <AuthProvider>
//             <ReduxProvider>
//               <Theme>
//                 <div className="flex">
//                   <Sidebar />
//                   <div className="flex flex-col flex-1">
//                     <Navbar  />
//                     <div className="mt-20">
//                       <Toaster />
//                       {children}
//                     </div>
//                   </div>
//                 </div>
//               </Theme>
//             </ReduxProvider>
//           </AuthProvider>
//         </SessionProviderWrapper>
//       </body>
//     </html>
//   );
// }
