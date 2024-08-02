import React from "react";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <>
      <nav className="bg-white flex justify-center mt-4">
        <div className="max-w-[1400px] w-[96%] container flex justify-between items-center">
          <div>
            <img
              src="./news-logo.png"
              alt="logo"
              className="h-8 lg:h-14 md:h-12 sm:h-10"
            />
          </div>
          <ul className="flex text-2xl gap-3 font-serif cursor-pointer">
            <li className="hover:text-white hover:bg-[#292B2C] p-3 rounded-lg ">
              <NavLink 
              to="/"
              className={({isActive}) =>
                ` ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-white `
            }
              >Home</NavLink>
            </li>
            <li className="hover:text-white hover:bg-[#292B2C] p-3 rounded-lg">
              <NavLink 
              to="/About"
              className={({isActive}) =>
                ` ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-white `
            }
              >About</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
