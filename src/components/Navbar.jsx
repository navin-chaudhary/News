import React from "react";
import { Link, NavLink } from "react-router-dom";
function Navbar() {
  return (
    <>
      <nav className="bg-white  w-full flex justify-center mt-4">
        <div className="max-w-[1400px] w-[96%] container flex justify-between items-center">
          <div>
            <Link to='/'>
            <img
              src="./news-logo.png"
              alt="logo"
              className="h-8 lg:h-14 md:h-12 sm:h-10"
            />
            </Link>
          </div>
          <ul className="flex text-2xl gap-3 font-serif cursor-pointer">
            <li className="  p-3 rounded-lg ">
              <NavLink 
              to="/"
              className={({isActive}) =>
                ` ${isActive ? "text-orange-700" : "text-gray-700"}  `
            }
              >Home</NavLink>
            </li>
            <li className=" p-3 rounded-lg">
              <NavLink 
              to="/About"
              className={({isActive}) =>
                ` ${isActive ? "text-orange-700" : "text-gray-700"} `
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
