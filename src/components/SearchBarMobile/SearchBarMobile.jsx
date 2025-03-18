import React, { useState, useEffect, useContext } from 'react';
import { IoClose, IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const SearchBarMobile = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { allResortData } = useContext(AuthContext);

    // Load search history on mount
    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        setSearchHistory(savedHistory);
    }, []);

    // Save the search query to history
    const saveSearchQuery = (query) => {
        const updatedSearchHistory = [query, ...searchHistory.filter(item => item !== query)];
        updatedSearchHistory.splice(10); // Limit history to 10 items
        setSearchHistory(updatedSearchHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
    };

    // Remove an item from search history
    const removeSearchHistoryItem = (index) => {
        const updatedSearchHistory = [...searchHistory];
        updatedSearchHistory.splice(index, 1);
        setSearchHistory(updatedSearchHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedSearchHistory));
    };

    // Handle the search operation
    const handleSearch = () => {
        try {
            if (searchQuery.trim() === '') {
                return; // Prevent empty searches
            }
            setLoading(true);

            // Filter based on place_name, location, or resort_ID
            const filteredResortData = allResortData.filter(item => {
                const placeName = item.place_name.toLowerCase();
                const location = item.location.toLowerCase();
                const resortID = item.resort_ID ? item.resort_ID.toString().toLowerCase() : '';

                // Check if the place_name contains any number followed by "Nights"
                const hasNights = /\d+\s*Nights/.test(placeName);

                return (
                    (placeName.includes(searchQuery.toLowerCase()) ||
                     location.includes(searchQuery.toLowerCase()) ||
                     resortID.includes(searchQuery.toLowerCase())) &&
                    !hasNights // Exclude results with "Nights" in place_name
                );
            });

            // Save search query and handle navigation
            saveSearchQuery(searchQuery);
            setLoading(false);

            // Redirect with query and ids
            const ids = filteredResortData.map(item => item._id);
            navigate(`/search?q=${encodeURIComponent(searchQuery)}&ids=${encodeURIComponent(ids.join(','))}`);
        } catch (error) {
            console.error('Error filtering search results:', error.message);
            setLoading(false);
        }
    };

    // Trigger search on "Enter" key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Show the search history dropdown on focus
    const handleSearchBarFocus = () => {
        setShowHistoryDropdown(true);
    };

    // Select an item from search history
    const handleSearchHistorySelect = (query) => {
        setSearchQuery(query);
        setShowHistoryDropdown(false);
        handleSearch();
    };

    // Handle outside click to close history dropdown
    const handleOutsideClick = (e) => {
        if (!e.target.closest('.search-bar-container')) {
            setShowHistoryDropdown(false);
        }
    };

    // Attach event listener for closing dropdown
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className="search-bar-container">
            <div className="relative container flex justify-center pb-5 mx-auto">
                <input
                    type="text"
                    placeholder="Search by resort Name, Location, ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleSearchBarFocus}
                    onKeyPress={handleKeyPress}
                    className="w-10/12 px-2 py-1 rounded-full bg-gray-200 mt-4"
                />
                <button
                    className="absolute right-[7%] top-4 text-xl text-white bg-yellow-500 px-3 py-[6px] rounded-r-full"
                    onClick={handleSearch}
                >
                    <IoSearch />
                </button>
            </div>
            {showHistoryDropdown && (
                <div className="search-history-dropdown bg-white border mb-2 p-4">
                    <h1 className="text-center mb-2">Your Search History</h1>
                    <ul>
                        {searchHistory.map((query, index) => (
                            <li key={index} className="flex justify-between md:justify-center md:gap-10">
                                <span onClick={() => handleSearchHistorySelect(query)}>{query}</span>
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