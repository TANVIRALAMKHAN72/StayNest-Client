import { FaFacebookF, FaTwitter, FaEnvelope } from "react-icons/fa";
import logo from "../assets/logo1.png";

const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-200 dark:bg-neutral py-8 px-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center">
            <img
              className="w-12 h-12 ml-1 cursor-pointer"
              src={logo}
              alt="Logo"
            />
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
              StayNest
            </span>
          </div>

          <div className="flex space-x-5 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 transition-colors"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-sky-500 dark:text-gray-300 transition-colors"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="mailto:support@example.com"
              className="text-gray-600 hover:text-red-500 dark:text-gray-300 transition-colors"
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>

        <div className="text-center md:text-right text-gray-600 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} StayNest. All rights reserved.</p>
          <p>
            Need help?{" "}
            <a
              href="mailto:support@example.com"
              className="text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
