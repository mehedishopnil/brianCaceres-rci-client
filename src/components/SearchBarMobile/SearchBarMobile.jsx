import React, { useState, useEffect, useContext } from 'react';
import { IoClose, IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const SearchBarMobile = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        setSearchHistory(savedHistory);
    }, []);

    const saveSearchQuery = (query) => {
        const updatedSearchHistory = [query, ...searchHistory.filter(item => item !== query)];
        updatedSearchHistory.splice(10); // Limit history to 10 items
        setSearchHistory(updatedSearchHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
    };

    const removeSearchHistoryItem = (index) => {
        const updatedSearchHistory = [...searchHistory];
        updatedSearchHistory.splice(index, 1);
        setSearchHistory(updatedSearchHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
    };

//     const handleSearch = () => {
//         try {
//             if (searchQuery.trim() === '') {
//                 setFilteredData(allResortData);
//                 return;
//             }
//             setLoading(true);

//             const filteredResortData = allResortData.filter(item =>
//                 item.place_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 (item.resort_ID && item.resort_ID.toString().toLowerCase().includes(searchQuery.toLowerCase()))
//             );

//             setFilteredData(filteredResortData);
//             saveSearchQuery(searchQuery);
//             setLoading(false);
//             const ids = filteredResortData.map(item => item._id);
//             navigate(`/search?q=${encodeURIComponent(searchQuery)}&ids=${encodeURIComponent(ids.join(','))}`);
//         } catch (error) {
//             console.error('Error filtering search results:', error.message);
//             setLoading(false);
//         }
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             handleSearch();
//         }
//     };

//     const handleSearchBarFocus = () => {
//         setShowHistoryDropdown(true);
//     };

//     const handleSearchHistorySelect = (query) => {
//         setSearchQuery(query);
//         setShowHistoryDropdown(false);
//         handleSearch();
//     };

//     const handleOutsideClick = (e) => {
//         if (e.target.closest('.search-bar-container') === null) {
//             setShowHistoryDropdown(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('click', handleOutsideClick);
//         return () => {
//             document.removeEventListener('click', handleOutsideClick);
//         };
//     }, []);

    return (
        <div className="search-bar-container">
            <div className=" relative container flex justify-center pb-5 mx-auto ">
                <input
                    type="text"
                    placeholder="Search by resort Name, Location, ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                   
                    className="w-10/12 px-2 py-1 rounded-full bg-gray-200 mt-4"
                />
                <button
                    className="absolute right-[7%] top-4 text-xl text-white bg-yellow-500 px-3 py-[6px] rounded-r-full"
                    
                >
                    <IoSearch />
                </button>
            </div>
            {showHistoryDropdown && (
                <div className="search-history-dropdown bg-white border mb-2 p-4">
                    <h1 className="text-center mb-2">Your Search History</h1>
                    <ul >
                        {searchHistory.map((query, index) => (
                            <li  key={index} className="flex justify-between md:justify-center md:gap-10">
                                {/* <span onClick={() => handleSearchHistorySelect(query)}>{query}</span> */}
                                <IoClose onClick={() => removeSearchHistoryItem(index)} className="cursor-pointer" />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBarMobile;