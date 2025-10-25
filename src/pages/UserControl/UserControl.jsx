import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const UserControl = () => {
  const { allUsersData, updateUser, removeUser } = useContext(AuthContext);
  const [uniqueUsers, setUniqueUsers] = useState([]);

  useEffect(() => {
    // Function to remove duplicate emails
    const removeDuplicateEmails = users => {
      const uniqueEmails = new Set();
      return users.filter(user => {
        if (uniqueEmails.has(user.email)) {
          return false;
        } else {
          uniqueEmails.add(user.email);
          return true;
        }
      });
    };

    // Ensure allUsersData is an array and remove duplicates
    const usersArray = Array.isArray(allUsersData)
      ? allUsersData
      : [allUsersData];
    const uniqueUsersArray = removeDuplicateEmails(usersArray);

    setUniqueUsers(uniqueUsersArray);
  }, [allUsersData]);

  const handleRoleToggle = (email, isAdmin) => {
    // Toggle isAdmin status
    updateUser(email, !isAdmin);
  };

  const handleRemoveUser = async email => {
    // Show confirmation dialog before deleting
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await removeUser(email);
      } catch (error) {
        console.error('Failed to remove user:', error);
      }
    }
  };

  return (
    <div className="p-3 sm:p-5 md:p-6 lg:p-8 min-h-screen">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">
        All Users ({uniqueUsers.length})
      </h1>

      <div className="max-w-7xl mx-auto grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        {uniqueUsers.map((user, index) => {
          const { photoURL, name, email, isAdmin } = user;
          return (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden p-4 sm:p-5 md:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                {/* User Info Section */}
                <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                  <img
                    src={photoURL}
                    alt={name}
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full flex-shrink-0 object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold truncate">
                      {name}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 break-all">
                      {email}
                    </p>
                    <p
                      className={`mt-1 sm:mt-2 text-sm sm:text-base font-semibold ${
                        isAdmin ? 'text-green-500' : 'text-blue-500'
                      }`}
                    >
                      {isAdmin ? 'Admin' : 'User'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons Section */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto sm:flex-shrink-0">
                  <button
                    className="btn btn-sm sm:btn-md w-full sm:w-auto text-xs sm:text-sm whitespace-nowrap"
                    onClick={() => handleRoleToggle(email, isAdmin)}
                  >
                    {isAdmin ? 'Make User' : 'Make Admin'}
                  </button>
                  <button
                    className="btn btn-sm sm:btn-md w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white text-xs sm:text-sm"
                    onClick={() => handleRemoveUser(email)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserControl;