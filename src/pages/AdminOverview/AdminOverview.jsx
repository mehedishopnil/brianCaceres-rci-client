import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Loading from "../../components/Loading";

const AdminOverview = () => {
  const { user, allBookingsData, allUsersData, fetchAllUsersData, fetchAllBookingsData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!allUsersData) {
          await fetchAllUsersData();
        }
        if (!allBookingsData) {
          await fetchAllBookingsData();
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchAllUsersData, fetchAllBookingsData, allUsersData, allBookingsData]);

  if (loading) {
    return <Loading />; // or any loading indicator you prefer
  }

  if (!user || !allBookingsData || !allUsersData) {
    return <Loading />;
  }

  const { name, photoURL, email } = user;

  return (
    <div className="py-5">
      <div>
        <div className="flex justify-center relative">
          <img src={photoURL} alt="" className="rounded-full" />
          <h1 className="absolute bottom-1 ml-16 badge bg-pink-200 text-blue-900">Admin</h1>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-center">{name}</h1>
          <h1 className="text-sm font-semibold text-center">{email}</h1>
        </div>
      </div>

      <div className="flex justify-center gap-5 shadow-sm m-5 p-5">
        <Link to="/admin-panel/users-bookings">
          <div className="text-center card border p-4">
            <h1 className="font-bold text-gray-500">Total Bookings:</h1>
            <h1 className="text-3xl text-gray-700">{allBookingsData.length}</h1>
          </div>
        </Link>

        <Link to="/admin-panel/user-control">
        <div className="text-center card border p-4">
          <h1 className="font-bold text-gray-500">Total Users:</h1>
          <h1 className="text-3xl text-gray-700">{allUsersData.length}</h1>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminOverview;