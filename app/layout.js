import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});


export const metadata = {
  title: "Black Atlas Group",
  description: "Coming Soon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${playfair.variable} antialiased`}
      >
        {/* SVG MASK DEFINITIONS */}
        {/* <svg className="w-0 h-0" viewBox="0 0 100 100" >
          <defs>
            <mask id="mask">
              <rect fill="#FFFFFF" x="0" y="0" width="100vw" height="100vh"></rect>
             
              <circle fill="#000000" cx="1000" cy="410" r="90" />
              
             
              <circle fill="#000000" cx="1000" cy="455" r="100" />
            </mask>
          </defs>
        </svg> */}



        <Navbar />
        {children}
        <Footer/>
        <GoogleAnalytics gaId="G-VPRPK0MD62" />
      </body>
    </html>
  );
}
