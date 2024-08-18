import React from "react";

const ContactSection = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white p-8 rounded-lg m-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions or need further information, feel free to
            reach out to us!
          </p>
          <ul>
            <li className="mb-2">
              <strong>Address:</strong> 123 Main Street, Rangpur, Bangladesh
            </li>
            <li className="mb-2">
              <strong>Phone:</strong> +880 1796244020
            </li>
            <li className="mb-2">
              <strong>Email:</strong> mehedirangpur3@gmail.com
            </li>
          </ul>
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/mueid11" target="_blank" className="hover:text-gray-300">
                Facebook
              </a>
              <a href="https://x.com/mehedirangpur3" target="_blank" className="hover:text-gray-300">
                Twitter
              </a>
              <a href="https://www.linkedin.com/in/mehedirangpur" target="_blank" className="hover:text-gray-300">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
