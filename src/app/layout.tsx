import type { Metadata } from "next";
import { Open_Sans, Exo_2 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['300','400','500','600','700','800'],
});
const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo2',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Geneurasys",
  description: "Geneurasys Project",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
