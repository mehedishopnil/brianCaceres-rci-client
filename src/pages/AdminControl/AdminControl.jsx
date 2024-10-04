import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const AdminControl = () => {
  const { updateUser, allUsersData, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allUsersData && user) {
      setLoading(false);
    }
  }, [allUsersData, user]);

  // Filter to get only admin users
  const adminUsers = allUsersData ? allUsersData.filter(u => u.isAdmin) : [];

  // Handle admin role change
  const handleRoleChange = (email, isAdmin) => {
    // Check if the admin is trying to remove their own admin status
    if (user && user.email === email && !isAdmin) {
      alert("You cannot remove yourself as an admin.");
      return;
    }
    updateUser(email, isAdmin);
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Control Panel</h1>
      {adminUsers.length === 0 ? (
        <p className="text-gray-500">No admins available.</p>
      ) : (
        <div>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {adminUsers.map(u => (
                    <tr key={u.email}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.isAdmin ? 'Admin' : 'User'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleRoleChange(u.email, !u.isAdmin)}
                          disabled={user && user.email === u.email}
                          className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full ${
                            user && user.email === u.email ? 'bg-gray-400 text-white cursor-not-allowed' : (u.isAdmin ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-500 text-white hover:bg-blue-600')
                          }`}
                        >
                          {u.isAdmin ? 'Remove Admin' : 'Make Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card System */}
          <div className="block md:hidden">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {adminUsers.map(u => (
                <div key={u.email} className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold mb-2">{u.name}</h2>
                  <p className="text-sm text-gray-600 mb-2">Email: {u.email}</p>
                  <p className="text-sm text-gray-600 mb-4">Role: {u.isAdmin ? 'Admin' : 'User'}</p>
                  <button
                    onClick={() => handleRoleChange(u.email, !u.isAdmin)}
                    disabled={user && user.email === u.email}
                    className={`w-full py-2 px-4 text-white font-medium rounded-full ${
                      user && user.email === u.email ? 'bg-gray-400 cursor-not-allowed' : (u.isAdmin ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600')
                    }`}
                  >
                    {u.isAdmin ? 'Remove Admin' : 'Make Admin'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminControl;