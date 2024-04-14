import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import SideBar from "./components/Sidebar/SideBar";
import GlobalStyleProvider from "./providers/GlobalStyleProvider";
import ContextProvider from "./providers/ContextProvider";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";
import { redirect } from "next/navigation";
const lato = Lato({
  weight: ["100", "300", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={lato.className}>
        <NextTopLoader
          height={5}
          color="#27AE60"
          easing="cubic-bezier(0.53,0.21,0,1)"
          showSpinner
        />
        <ClerkProvider>
          <ContextProvider>
            <GlobalStyleProvider>
              {userId && <SideBar />}
              <div className="w-full">{children}</div>
            </GlobalStyleProvider>
          </ContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
