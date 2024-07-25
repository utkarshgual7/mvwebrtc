import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Toaster from "@/components/ui/Toaster";

import '@stream-io/video-react-sdk/dist/css/styles.css'
import 'react-datepicker/dist/react-datepicker.css';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ConnectVice",
  description: "Live meet app for MachineVice",
  icons: {
    icon: "/icons/mv.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
      appearance={{
        layout:{
          logoImageUrl:'/icons/mv.svg'
        },
        variables: {
         
    
          colorText: "#fff",
        
          colorBackground: "#1C1F2E",
          colorInputBackground: "#252A41",
          colorInputText: "#fff",
          colorPrimary: '#C41E3A'
         

        }
      }}
      >

      <body className={`${inter.className} bg-dark-2`}>{children}
      
      </body>
      </ClerkProvider>
    </html>
  );
}
