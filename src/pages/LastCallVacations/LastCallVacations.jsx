import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { AuthContext } from "../../providers/AuthProvider";
import ResortCard from "../../components/ResortCard/ResortCard";

const LastCallVacations = () => {
  const {
    resortData,
    allResortData,
    loading,
    totalPages,
    currentPage,
    fetchResortData,
  } = useContext(AuthContext);
  const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
  const [pageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(resortData);
  }, [resortData]);

  useEffect(() => {
    setLocalCurrentPage(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setLocalCurrentPage(pageNumber);
    fetchResortData(pageNumber); // Ensure fetchResortData is called correctly
    if (pageNumber > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    } else if (pageNumber <= minPageNumberLimit + 1) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNextbtn = () => {
    if (localCurrentPage < totalPages) {
      handlePageChange(localCurrentPage + 1);
    }
  };

  const handlePrevbtn = () => {
    if (localCurrentPage > 1) {
      handlePageChange(localCurrentPage - 1);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredData(resortData);
      return;
    }
    const filteredResults = allResortData.filter((resort) =>
      resort.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const renderPageNumbers = Array.from({ length: totalPages }).map(
    (_, index) => {
      const pageNumber = index + 1;
      if (pageNumber <= maxPageNumberLimit && pageNumber > minPageNumberLimit) {
        return (
          <li key={pageNumber}>
            <button
              className={`px-3 py-1 rounded-md ${
                localCurrentPage === pageNumber
                  ? "bg-blue-500 text-white"
                  : "border text-gray-200"
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        );
      }
      return null;
    }
  );

  return (
    <div className="container mx-auto p-4 space-y-5 pb-20">
      {searchTerm && (
        <div className="pt-2">
          <h1 className="text-xl">{filteredData.length} Resorts</h1>
        </div>
      )}

      <div className="divider"></div>
      {/* Filter Section */}

      <div className="w-full md:flex md:justify-center">
      <div className="mb-4 flex md:w-1/2 ">
        <input
          type="text"
          placeholder="Filter by location"
          className="w-full px-3 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-3 py-2 bg-[#037092] text-white rounded-md"
        >
          Filter
        </button>
      </div>
      </div>

      {/* Data showing section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <Loading/>
        ) : (
          filteredData.map((resort) => (
            <Link to={`/singleResortPage/${resort._id}`} key={resort._id}>
              <ResortCard resort={resort} />
            </Link>
          ))
        )}
      </div>

      {/* Pagination section */}
      <div className="flex flex-col items-center md:justify-center md:pt-10 mt-4 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <button
          onClick={handlePrevbtn}
          className={`px-3 py-1 rounded-md ${
            localCurrentPage === 1 ? "bg-gray-200" : "bg-blue-500 text-white"
          }`}
          disabled={localCurrentPage === 1}
        >
          Prev
        </button>
        <ul className="flex space-x-2">{renderPageNumbers}</ul>
        <button
          onClick={handleNextbtn}
          className={`px-3 py-1 rounded-md ${
            localCurrentPage === totalPages
              ? "bg-gray-200"
              : "bg-blue-500 text-white"
          }`}
          disabled={localCurrentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LastCallVacations;