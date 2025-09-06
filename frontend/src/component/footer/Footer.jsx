import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-teal-600 text-gray-300 pt-10 pb-6">
      <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-4 gap-8">
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold text-white">PharmaNest</h2>
          <p className="mt-3 text-sm">
            Your trusted online pharmacy for medicines, healthcare products, and
            wellness essentials.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-2 flex flex-row justify-around gap-8">
          {/* Quick Links */}
          <nav>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-teal-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/medicines" className="hover:text-teal-400">
                  Medicines
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-teal-400">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-400">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Customer Support */}
          <nav>
            <h3 className="text-lg font-semibold text-white mb-3">
              Customer Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="hover:text-teal-400">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-teal-400">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-teal-400">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-teal-400">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-teal-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:support@pharmanest.com"
              className="hover:text-teal-400"
            >
              support@pharmanest.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+911234567890" className="hover:text-teal-400">
              +91 123 456 7890
            </a>
          </p>
          <div className="flex gap-4 mt-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-400"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-teal-400"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} PharmaNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
