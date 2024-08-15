import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { Toaster } from "@/components/ui/toaster";
import "@mantine/core/styles.css";
import "./globals.css";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shango App",
  description: "This is shango application.",
};

const theme = createTheme({
  primaryColor: "primary",
  colors: {
    primary: [
      "#e6f2ff",
      "#d1e0ff",
      "#a2befa",
      "#709af3",
      "#467bee",
      "#2b68ec",
      "#1a5eeb",
      "#084ed2",
      "#0045bd",
      "#003ba8",
    ],
  },
  activeClassName: "",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${lexend.className}`}>
        <NextTopLoader color="#467bee" height={3} showSpinner={false} />
        <MantineProvider forceColorScheme="light" theme={theme}>
          {children}
        </MantineProvider>
        <Toaster />
      </body>
    </html>
  );
}
