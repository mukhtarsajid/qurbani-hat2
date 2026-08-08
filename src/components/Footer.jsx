 // FILE: components/Footer.jsx

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-about">
          <h3>🐄 QurbaniHat</h3>
          <p>
            Bangladesh's trusted livestock marketplace for Qurbani. Find the
            best animals from verified sellers across the country.
          </p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/animals">All Animals</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>📧 info@qurbanihat.com</p>
          <p>📞 +880 1700-000000</p>
          <p>📍 Dhaka, Bangladesh</p>
          <div className="footer-socials">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">YouTube</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 QurbaniHat. All rights reserved.</p>
      </div>
    </footer>
  );
}