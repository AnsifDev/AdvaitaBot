import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/providers";
// import { ThemeProvider } from "next-themes";


export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: "Web App for Bhagavat Gita's explainations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?display=swap&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=chat,close,dock_to_right,keyboard_arrow_down,keyboard_arrow_left,keyboard_arrow_right,keyboard_arrow_up,report,send,unfold_more,web_asset_off" />
      </head>
      <body className="bg-neutral-900">
        {/* <ThemeProvider attribute="class" defaultTheme='system' enableSystem> */}
          <Providers>
            {children}
          </Providers>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
