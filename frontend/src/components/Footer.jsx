import React from "react";

function Footer() {
  return (
    <footer
      className="border-t border-zinc-800 py-4 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#18181b" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-xs text-zinc-500 font-medium">SQL Studio</span>
        <span className="text-xs text-zinc-600">
          © {new Date().getFullYear()} SQL Studio. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
