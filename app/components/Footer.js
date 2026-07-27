"use client";

import React from "react";
import { GitHub, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">

        <div className="text-sm text-gray-600">
          © 2026 Raman
        </div>

        <div className="flex gap-5 text-gray-700">
          {/* <GitHub size={20} /> */}
          {/* <Linkedin size={20} /> */}
          {/* <Mail size={20} /> */}
        </div>

      </div>
    </footer>
  );
};

export default Footer;