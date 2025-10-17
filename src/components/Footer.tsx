import React from 'react';
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-[#2e4211] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {currentYear} Votifi. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-300 hover:text-white text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;