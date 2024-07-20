// components/Footer.js
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="flex flex-wrap justify-around bg-gray-800 text-white py-3">
            <div className="text-center items-center text-gray-400 mt-1">
                <p>Anish Bar, CSE, GCETTS</p>
            </div>
            <div className="flex items-center justify-center space-x-6">
                <a
                    href="https://www.facebook.com/anish.bar.9/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                >
                    <FaFacebookF size={20} />
                </a>
                <a
                    href="https://www.instagram.com/anishbar2003/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-500"
                >
                    <FaInstagram size={20} />
                </a>
                <a
                    href="https://www.linkedin.com/in/anishbar03/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700"
                >
                    <FaLinkedinIn size={20} />
                </a>
                <a
                    href="https://github.com/Anix003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400"
                >
                    <FaGithub size={20} />
                </a>
                <a
                    href="https://x.com/anish_bar?s=09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                >
                    <FaTwitter size={20} />
                </a>
            </div>
            <div className="text-center text-gray-400 mt-1">
                <p>&copy; {new Date().getFullYear()}  All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
