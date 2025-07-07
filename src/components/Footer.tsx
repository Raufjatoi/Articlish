
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-6 border-t border-gray-200">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600">
          By <a 
            href="https://raufjatoi.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black font-medium hover:underline"
          >
            Abdul Rauf Jatoi
          </a> | <a 
            href="https://www.icreativez.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black font-medium hover:underline"
          >
            icreativez
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;


