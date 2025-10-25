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
    <div className="p-5">
      <h1 className="text-center text-2xl font-bold mb-6">
        All Users ({uniqueUsers.length})
      </h1>

      <div className="max-w-full grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {uniqueUsers.map((user, index) => {
          const { photoURL, name, email, isAdmin } = user;
          return (
            <div
              key={index}
              className="md:w-full bg-white shadow-md rounded-lg overflow-hidden p-4"
            >
              <div className="flex flex-col md:w-full sm:flex-row justify-between items-center mb-4">
                <div className="flex items-center md:w-full">
                  <img
                    src={photoURL}
                    alt={name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{name}</h2>
                    <p className="text-gray-500 lg:text-sm">{email}</p>
                    <p
                      className={`mt-2 ${
                        isAdmin ? 'text-green-500' : 'text-blue-500'
                      }`}
                    >
                      {isAdmin ? 'Admin' : 'User'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                  <button
                    className="btn"
                    onClick={() => handleRoleToggle(email, isAdmin)}
                  >
                    {isAdmin ? 'Make User' : 'Make Admin'}
                  </button>
                  <button
                    className="btn bg-red-500 hover:bg-red-600 text-white"
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
