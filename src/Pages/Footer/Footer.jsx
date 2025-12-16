import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 mt-16">
      <div className="container mx-auto px-5 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10">
        {/* Logo + Website Name */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="https://i.ibb.co/4pDNDk1/avatar.png"
              alt="logo"
              className="h-12 w-12 rounded-full"
            />
            <h2 className="text-xl font-bold text-white">
              Digital Life Lessons
            </h2>
          </div>
          <p className="text-sm text-gray-400">
            Learn From Real Experiences. Inspire & Guide The World With Your
            Life Lessons.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>

            <li>
              <a href="/dashboard" className="hover:text-white">
                Dashboard
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: support@digitallessons.com</li>
            <li>Phone: +880 1234 567890</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Terms + Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Terms & Social
          </h3>
          <ul className="space-y-2 text-sm mb-4">
            <li>
              <a href="/terms" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-xl">
            <a href="#" className="hover:text-white">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 mt-10" />

      {/* Bottom */}
      <p className="text-center text-sm text-gray-500 mt-5">
        © {new Date().getFullYear()} Digital Life Lessons — All Rights Reserved.
      </p>
    </footer>
  );
}
