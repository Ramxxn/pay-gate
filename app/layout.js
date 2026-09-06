import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthWrapper from "./components/AuthWrapper";
import Script from "next/script";


export const metadata = {
  title: "Paygate",
  description: "Fund Supporter",
};

export default function RootLayout({ children }) {
  return (
    <html
    lang="en"
    className={`h-full antialiased`}
    >
      <body className="min-h-full w-full flex flex-col">
        <AuthWrapper>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthWrapper>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      </body>
    </html>
  );
}
