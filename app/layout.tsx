import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider} from '@clerk/nextjs';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider as NextThemesProvider, ThemeProvider } from "next-themes";

const poppins = Poppins({ subsets: ["latin"], weight:['400', '500', '600', '700'], variable: '--fonts-poppins' });

export const metadata: Metadata = {
  title: "Evently",
  description: "Evently is plateform for event management",
  icons:{
    icon: '/assets/images/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.variable}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
          
        <Toaster/>
        </body>
      </html>
    </ClerkProvider>
    
  );
}
