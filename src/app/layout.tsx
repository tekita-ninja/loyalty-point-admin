import { ThemeProvider } from "@/components/theme-provider";
import ContextProvider from "@/context";
import type { Metadata } from "next";
import { Exo_2, Open_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});
const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo2',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "App Name",
  description: "App Name Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.className} ${exo2.variable} antialiased`}
      >

        <ThemeProvider
          attribute="class"
          defaultTheme="class"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader initialPosition={0.2} color="#0B99FF" />
          <ContextProvider>
            {children}
          </ContextProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
