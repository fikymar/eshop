import React from "react";

const Footer = () => {
  return (
    <footer className="self-end flex h-24 w-screen bg-red  items-center justify-center border-t">
      <a
        className="flex items-center justify-center gap-2"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by
      </a>
    </footer>
  );
};

export default Footer;
