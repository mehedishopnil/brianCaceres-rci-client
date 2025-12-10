import { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../public/rci-logo-white.png';
import logo2 from '../../../public/Travel&Leisure-logo.png';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';
import SearchBarMobile from '../../components/SearchBarMobile/SearchBarMobile';
import { IoChevronDown, IoSearch } from 'react-icons/io5';
import { IoMdNotificationsOutline } from 'react-icons/io';
import MobileDropdown from './MobileDropdown';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut, role } = useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    { label: 'HOME', path: '/', showAlways: true },
    { label: 'BOOK VACATION', path: '/lastCallVacation', showAlways: true },
  ];

  const userNavItems =
    role === 'admin'
      ? [
          { label: 'Admin Panel', path: '/admin-panel/admin-overview' },
          { label: 'Profile', path: '/profile' },
        ]
      : [
          { label: 'Dashboard', path: '/dashboard/overview' },
          { label: 'My Account', path: '/profile' },
          { label: 'Notifications', path: '/notifications' },
          { label: 'My Favorites', path: '/myFavorites' },
        ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowUserMenu(false);
  }, [location]);

  const handleSignOut = () => {
    signOut();
    setShowUserMenu(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#037092] shadow-xl' : 'bg-[#037092]'
      }`}
    >
      {/* Top Bar */}
      <div className="hidden lg:block bg-gradient-to-r from-blue-800 to-cyan-700">
        <div className="container mx-auto px-6 py-2">
          <div className="flex justify-between items-center text-sm text-white/90">
            <div className="flex items-center gap-6">
              <span>🌐 Global | EN</span>
              <span className="hidden xl:inline">📞 1-800-RCI-VACA</span>
              <span className="hidden xl:inline">⭐ Member Since 1974</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">
                Help Center
              </a>
              <span className="w-px h-4 bg-white/30"></span>
              <a href="#" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 lg:px-6">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Section - Logo & Brand */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-4 group ml-2 lg:ml-0">
              <div className="relative">
                <img
                  src={logo}
                  alt="RCI Logo"
                  className="w-10 lg:w-12 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden lg:block w-px h-10 bg-gradient-to-b from-white/50 to-transparent"></div>
              <img
                src={logo2}
                alt="Travel & Leisure"
                className="hidden lg:block w-20 transition-opacity duration-300 group-hover:opacity-90"
              />
            </Link>
          </div>

          {/* Center Section - Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center gap-1">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-semibold text-white/90 hover:text-white transition-colors group ${
                    location.pathname === item.path ? 'text-white' : ''
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-cyan-300 to-white rounded-full"></span>
                  )}
                  <span className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Search Button */}
            <button
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors lg:hidden"
              aria-label="Search"
            >
              <IoSearch className="w-5 h-5" />
            </button>

            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors relative"
                    aria-label="Notifications"
                  >
                    <IoMdNotificationsOutline className="w-5 h-5 lg:w-6 lg:h-6" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </button>
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors group"
                    aria-label="User menu"
                  >
                    <div className="relative">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-white/30 group-hover:border-white/50 transition-colors"
                        />
                      ) : (
                        <FaUserCircle className="w-8 h-8 lg:w-10 lg:h-10 text-white/80 group-hover:text-white transition-colors" />
                      )}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#037092]"></div>
                    </div>
                    <IoChevronDown
                      className={`w-4 h-4 text-white/70 transition-transform duration-200 ${
                        showUserMenu ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 z-50 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-slideDown">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt="Profile"
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <FaUserCircle className="w-10 h-10 text-gray-400" />
                          )}
                          <div>
                            <p className="font-semibold text-gray-900 truncate">
                              {user.name || user.email}
                            </p>
                            <p className="text-sm text-gray-500">
                              {role === 'admin' ? 'Administrator' : 'Member'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        {userNavItems.map(item => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors group"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                          </Link>
                        ))}
                      </div>

                      <div className="p-3 border-t border-gray-100 bg-gray-50">
                        <button
                          onClick={handleSignOut}
                          className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Auth Buttons */}
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-sm font-semibold text-white hover:text-white/90 transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/registration"
                    className="px-5 py-2.5 bg-gradient-to-r from-white to-gray-100 text-blue-600 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Join Now
                  </Link>
                </div>

                {/* Mobile Auth Buttons - Now handled inside MobileDropdown */}
              </>
            )}
          </div>
          {/* Mobile Menu Button - Replaced by MobileDropdown component */}
          <div className='md:hidden lg:hidden'>
            <MobileDropdown
              user={user}
              role={role}
              signOut={signOut}
              navItems={navItems}
              userNavItems={userNavItems}
            />
          </div>
        </nav>
      </div>

      {/* Search Bar Mobile */}
      <SearchBarMobile />
    </header>
  );
};

export default Header;
