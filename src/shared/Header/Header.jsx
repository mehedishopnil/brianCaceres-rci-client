import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/rci-logo-white.png";
import {
  IoMdNotificationsOutline,
} from "react-icons/io";
import {
  FaUserCircle,
  FaTimes,
  FaBars,

} from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import SearchBarMobile from "../../components/SearchBarMobile/SearchBarMobile";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [user, setUser] = useState(true)
  const [role, setRole] = useState(true)


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-[#037092]">
      {/* Desktop Navbar */}
      <div className="container mx-auto hidden md:px-10 lg:flex justify-between items-center navbar">

        {/* Logo and Search Bar */}
        <div className=" navbar-start flex items-center gap-5">
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
        <div className="navbar-center">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <Link to="/lastCallVacation">
                <p className="text-xl">BOOK</p>
              </Link>
            </li>
            {/* {user && role ? (
              <>
                <li>
                  <Link to="/">
                    <p className="text-xl">TRIPS</p>
                  </Link>
                </li>
                {role === "admin" ? (
                  <>
                    <li>
                      <Link to="/admin-panel/admin-overview">
                        <p className="text-xl">AdminPanel</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile">
                        <p className="text-xl">Profile</p>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/dashboard">
                        <p className="text-xl">Dashboard</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/notifications">
                        <p className="text-xl">Notifications</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/myAccount">
                        <p className="text-xl">My Account</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile">
                        <p className="text-xl">Profile</p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/myFavorites">
                        <p className="text-xl">My Favorites</p>
                      </Link>
                    </li>
                  </>
                )}
              </>
            ) : (
              <>
                <li>
                  <Link to="/">
                    <p className="text-xl">HOME</p>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <p className="text-xl">LOGIN</p>
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <p className="text-xl">SIGN UP</p>
                  </Link>
                </li>
              </>
            )*/}
          </ul> 
        </div>

        {/* User Icons */}
        <div className="navbar-end text-white flex gap-5 items-center">
          {user ? (
            <>
              <IoMdNotificationsOutline className="text-3xl" />

              <Link to="/profile">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User Profile"
                    className="text-3xl w-[50px] rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-3xl" />
                )}
              </Link>

              <div>
                {/* <button
                  onClick={signOut}
                  className="bg-white text-gray-700 rounded px-3 py-1"
                >
                  Logout
                </button> */}
              </div>
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
      <div className="p-3">
        <div className="container mx-auto flex lg:hidden justify-between items-center navbar">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link to="/" className="z-20">
              <img src={logo} alt="" className="w-[52px] h-[52px]" />
            </Link>
            <div className="w-[1px] h-14 bg-white"></div>
            <img
              src="https://www.rci.com/static/images/content/header/RCI-ClubWyndham-new.png"
              alt=""
              className="w-20 h-10" 
            />
          </div>

          {/* Mobile Dropdown */}
          <div className="flex dropdown relative">
            
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <FaTimes className="h-8 w-8 text-xl text-white" />
              ) : (
                <FaBars className="h-8 w-8 text-xl text-white" />
              )}
            </div>
            {isMenuOpen && (
              <div className="p-5">
                <ul className="absolute right-0 menu menu-lg dropdown-content mt-5 p-2 shadow bg-white rounded-box w-screen z-10 h-fit flex flex-col">
                  <div>
                    <Link to="/lastCallVacation" onClick={closeMenu}>
                      <li className="flex font-regular text-gray-600">
                        <div className="">
                          <img
                            src="https://www.rci.com/static/images/content/icons-header/book.svg"
                            alt=""
                          />
                          <a>BOOK</a>
                        </div>
                      </li>
                    </Link>
                    {user && role ? (
                      <>
                        <Link to="/" onClick={closeMenu}>
                          <li className="flex font-regular text-gray-600">
                            <div className="">
                              <img
                                src="https://www.rci.com/static/images/content/icons-header/trips.svg"
                                alt=""
                              />
                              <a>TRIPS</a>
                            </div>
                          </li>
                        </Link>

                        <Link to="/" onClick={closeMenu}>
                          <li className="flex font-regular text-gray-600">
                            <div className="">
                              <img
                                src="https://www.rci.com/static/images/content/icons-header/offers.svg"
                                alt=""
                              />
                              <a>DEALS</a>
                            </div>
                          </li>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/" onClick={closeMenu}>
                          <li className="flex font-regular text-gray-600">
                            <div className="">
                              <IoHomeOutline className="text-2xl" />
                              <a>Home</a>
                            </div>
                          </li>
                        </Link>
                      </>
                    )}
                  </div>
                      <div className="divider"></div>
                  
                </ul>
              </div>
            )}
          </div>
        </div>
        <SearchBarMobile />
      </div>
    </div>
  );
};

export default Header;