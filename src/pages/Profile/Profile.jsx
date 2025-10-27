import { useContext } from 'react';
import { FaLock, FaRegEdit, FaUser } from 'react-icons/fa';
import { IoLocation } from 'react-icons/io5';
import { MdEmail, MdLogout, MdOutlineSupportAgent } from 'react-icons/md';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, signOut } = useContext(AuthContext);
  const { name, email, photoURL } = user;

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            My Profile
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 sm:mb-8">
          {/* Cover/Header Background */}
          <div className="h-24 sm:h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

          {/* Profile Info */}
          <div className="relative px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-16">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  src={photoURL}
                  alt={name}
                />
                <button className="absolute bottom-1 right-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors">
                  <FaRegEdit className="text-sm" />
                </button>
              </div>

              {/* Name and Position */}
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                  {name}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Member
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {/* Name Field */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-5 group">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="bg-blue-100 p-2.5 sm:p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <FaUser className="text-blue-600 text-lg sm:text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    Full Name
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                    {name}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-blue-600 transition-colors p-2">
                <FaRegEdit className="text-lg sm:text-xl" />
              </button>
            </div>
          </div>

          {/* Email Field */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-5 group">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="bg-green-100 p-2.5 sm:p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                  <MdEmail className="text-green-600 text-lg sm:text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    Email Address
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                    {email}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-green-600 transition-colors p-2">
                <FaRegEdit className="text-lg sm:text-xl" />
              </button>
            </div>
          </div>

          {/* Password Field */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-5 group">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 flex-1">
                <div className="bg-purple-100 p-2.5 sm:p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <FaLock className="text-purple-600 text-lg sm:text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    Password
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    ••••••••
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-purple-600 transition-colors p-2">
                <FaRegEdit className="text-lg sm:text-xl" />
              </button>
            </div>
          </div>

          {/* Location Field */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-5 group">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 flex-1">
                <div className="bg-orange-100 p-2.5 sm:p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <IoLocation className="text-orange-600 text-lg sm:text-xl" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    Location
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    USA
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-orange-600 transition-colors p-2">
                <FaRegEdit className="text-lg sm:text-xl" />
              </button>
            </div>
          </div>

          {/* Support Field */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-5 group cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 flex-1">
                <div className="bg-cyan-100 p-2.5 sm:p-3 rounded-lg group-hover:bg-cyan-200 transition-colors">
                  <MdOutlineSupportAgent className="text-cyan-600 text-xl sm:text-2xl" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    Need Help?
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-800">
                    Contact Support
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-cyan-600 transition-colors p-2">
                <FaRegEdit className="text-lg sm:text-xl" />
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-5 group hover:bg-red-50 border-2 border-transparent hover:border-red-200"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 flex-1">
                <div className="bg-red-100 p-2.5 sm:p-3 rounded-lg group-hover:bg-red-200 transition-colors">
                  <MdLogout className="text-red-600 text-lg sm:text-xl" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    Account
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                    Log Out
                  </p>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
