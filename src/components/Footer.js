import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full gap-2 max-h-16 bg-red-600 flex justify-center items-center py-4 text-white font-xs font-semibold">
      Made with &hearts; by
      <Link
        href="https://drive.google.com/file/d/1BSCXXR7vjwOtnmkuta1Z5TnBGOstoEF_/view?usp=sharing"
        className="underline"
      >
        Ayush.
      </Link>
    </footer>
  );
};

export default Footer;
