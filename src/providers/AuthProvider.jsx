import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(true); // Should be handled via auth service
  const [resortData, setResortData] = useState([]); // Full resort data
  const [filteredData, setFilteredData] = useState([]); // Paginated resort data
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 15; // Number of items per page

  // Fetch exactly 30 resort data entries
  const fetchResortData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://brian-caceres-rci-server.vercel.app/resorts?limit=30`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching resort data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const resorts = data.resorts || [];

      if (resorts.length > 0) {
        setResortData(resorts);

        // Calculate total pages based on 15 items per page
        const pages = Math.ceil(resorts.length / ITEMS_PER_PAGE);
        setTotalPages(pages);

        // Set the initial paginated data for the first page
        const firstPageData = resorts.slice(0, ITEMS_PER_PAGE);
        setFilteredData(firstPageData);
      }
    } catch (error) {
      console.error("Error fetching resort data:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Failed to fetch resort data: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  // Paginate data client-side
  const paginate = (pageNumber) => {
    const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = resortData.slice(startIndex, endIndex);

    setFilteredData(paginatedData);
    setCurrentPage(pageNumber);
  };

  // Fetch resort data when the component mounts
  useEffect(() => {
    fetchResortData();
  }, []);

  const authInfo = {
    loading,
    user,
    resortData,
    filteredData,
    totalPages,
    currentPage,
    paginate, // Pagination function
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
