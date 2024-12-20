import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
// import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontMono } from "@/config/fonts";
// import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { NavThemeProvider } from "@/context/navbar_theme";
import AuthProvider from "./providers/AuthProvider";


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-mono antialiased",
          fontMono.variable
        )}
      >
        <AuthProvider>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen w-full">
            {/* <Navbar mode={theme.type} /> */}
            {/* <main className="container mx-auto max-w-7xl px-6 flex-grow"> */}
            <main className="flex-grow flex flex-col">
              <NavThemeProvider>
                {children}
              </NavThemeProvider>
            </main>
            <Footer />
          </div>
        </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
