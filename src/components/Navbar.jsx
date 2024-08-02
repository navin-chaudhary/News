import React from "react";

function Navbar() {
  return (
    <>
      <nav className="bg-white flex justify-center mt-4">
        <div className="max-w-[1400px] w-[96%]  flex justify-between items-center">
        <div>
          <img src="./news-logo.png" alt="logo" className="h-8 lg:h-14 md:h-12 sm:h-10"/>
        </div>
        <ul className="flex text-2xl gap-3 font-serif cursor-pointer">
          <li className="hover:text-blue-500">Home</li>
          <li className="hover:text-blue-500">About</li>
        </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
