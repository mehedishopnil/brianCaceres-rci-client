import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/rci-logo-white.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle, FaTimes, FaBars, FaRegIdBadge } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import SearchBarMobile from "../../components/SearchBarMobile/SearchBarMobile";
import { RiLoginBoxLine } from "react-icons/ri";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-[#037092]">
      {/* Desktop Navbar */}
      <div className="container mx-auto hidden lg:flex justify-between items-center p-5">
        {/* Logo and Search Bar */}
        <div className="flex items-center gap-5">
          <Link to="/" className="z-20">
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </Link>
          <div className="w-[1px] h-14 bg-white"></div>
          <img
            src="https://www.rci.com/static/images/content/header/RCI-ClubWyndham-new.png"
            alt=""
            className="w-[80px]"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="menu menu-horizontal text-white space-x-8">
          <li>
            <Link to="/lastCallVacation" className="text-xl">
              BOOK
            </Link>
          </li>
        </ul>

        {/* User Icons */}
        <div className="flex items-center gap-5 text-white">
          {user ? (
            <>
              <IoMdNotificationsOutline className="text-3xl" />
              <Link to="/profile">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-3xl" />
                )}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-gray-700 rounded px-3 py-1"
              >
                Login
              </Link>
              <Link
                to="/registration"
                className="bg-white text-gray-700 rounded px-3 py-1"
              >
                Registration
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="p-3 lg:hidden">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex gap-2 items-center">
          <Link to="/" className="z-20">
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </Link>
          <div className="w-[1px] h-14 bg-white"></div>
          <img
            src="https://www.rci.com/static/images/content/header/RCI-ClubWyndham-new.png"
            alt=""
            className="w-20 "
          />
          </div>

          {/* Mobile Dropdown */}
          <div className="relative z-10">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="h-8 w-8" />
              ) : (
                <FaBars className="h-8 w-8" />
              )}
            </button>
            {isMenuOpen && (
              <ul className="absolute right-0 mt-5 w-48 bg-white shadow-lg rounded-lg py-2">
                <li className="px-5 py-2 space-y-2 ">
                  <Link to="/lastCallVacation" onClick={closeMenu} className="flex items-center text-lg gap-2 p-1 rounded hover:bg-gray-100">
                  <img src="https://www.rci.com/static/images/content/icons-header/book.svg" alt="" />
                    <h1>BOOK</h1>
                  </Link>

                  <Link to="/login" onClick={closeMenu} className="flex items-center text-lg gap-2 p-1 rounded hover:bg-gray-100">
                  <RiLoginBoxLine />
                    <h1>Login</h1>
                  </Link>


                  <Link to="/registration" onClick={closeMenu} className="flex items-center text-lg gap-2 p-1 rounded hover:bg-gray-100">
                  <FaRegIdBadge />
                    <h1>Registration</h1>
                  </Link>
                </li>
                <div className="divider"></div>
                {user && role ? (
                  <div>
                    <li className="px-5 py-2 hover:bg-gray-100">
                      <Link to="/" onClick={closeMenu} className="flex gap-2">
                      <img src="https://www.rci.com/static/images/content/icons-header/trips.svg" alt="" />
                        <h1>TRIPS</h1>
                      </Link>
                    </li>
                    <li className="px-5 py-2 hover:bg-gray-100">
                      <Link to="/" onClick={closeMenu} className="flex gap-2">
                      <img src="https://www.rci.com/static/images/content/icons-header/offers.svg" alt="" />
                        <h1>DEALS</h1>
                      </Link>
                    </li>


                    <li className="px-5 py-2 hover:bg-gray-100">
                      <Link to="/" onClick={closeMenu} className="flex gap-2">
                      <img src="https://www.rci.com/static/images/content/icons-header/offers.svg" alt="" />
                        <h1>DEALS</h1>
                      </Link>
                    </li>
                  </div>
                ) : (
                  <>
                  
                    <li className="px-5 py-2 hover:bg-gray-100">
                      <Link to="/" onClick={closeMenu}>
                        <IoHomeOutline className="inline-block mr-2" />
                        Home
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
        <SearchBarMobile />
      </div>
    </div>
  );
};

export default Header;
