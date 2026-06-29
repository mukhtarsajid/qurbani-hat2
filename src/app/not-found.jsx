 // FILE: app/not-found.jsx

import Link from "next/link";
import "./not-found.css";

export default function NotFound() {
  return (
    <div className="notfound-page">
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-title">Page Not Found</h2>
      <p className="notfound-msg">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/" className="notfound-btn">
        Go Back Home
      </Link>
    </div>
  );
}