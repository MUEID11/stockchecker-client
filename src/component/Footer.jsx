import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        <Link to="/" className="text-xl font-bold">
          Stock<span className="text-green-500">Checker</span>
        </Link>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          © Copyright 2021. All Rights Reserved to <a href="https://mueid-portfolio.vercel.app/">MUEID</a>
        </p>

        <div className="flex -mx-2">
          <a
           href="https://www.linkedin.com/in/mehedirangpur" target="_blank"
            className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            aria-label="linkedin"
          >
           <FaLinkedin />
          </a>

          <a
            href="https://www.facebook.com/mueid11" target="_blank"
            className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>

          <a
            href="https://github.com/MUEID11" target="_blank"
            className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            aria-label="Github"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
