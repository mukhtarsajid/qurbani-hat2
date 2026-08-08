 // FILE: app/layout.js

import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./styles/globals.css";
import "animate.css";

export const metadata = {
  title: "QurbaniHat",
  description: "Livestock Booking Platform for Qurbani",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}