import "./Footer.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
        <span>
          <Logo />
          <div>
            <h1>Xampl</h1>
            <i>We're Better.</i>
          </div>
          <p>
            We are dedicated to providing the best services and products to our
            customers. Our team is committed to excellence and customer
            satisfaction.
          </p>
        </span>
        <ul className="social-links">
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram /> Instagram
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
              LinkedIn
            </a>
          </li>
        </ul>
        </div>
        <div className="location">
          <a href="mailto:info@xample.com">info@example.com</a>
          <p>123 Business Lane</p>
          <p>Business City, BC 12345</p>
          <p>Country</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Xample Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
