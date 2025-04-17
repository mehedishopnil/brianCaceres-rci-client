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

    // Enhanced search function that handles partial word matches
    const performSearch = (query) => {
        if (!query.trim()) return [];

        const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 0);
        
        return allResortData.map(item => {
            let score = 0;
            let matchedWords = [];
            
            // Check each query word against place_name and location
            queryWords.forEach(word => {
                const placeNameWords = item.place_name.toLowerCase().split(/\s+/);
                const locationWords = item.location.toLowerCase().split(/\s+/);
                
                // Check if word matches any part of place_name
                const placeNameMatch = placeNameWords.some(placeWord => 
                    placeWord.includes(word)
                );
                
                // Check if word matches any part of location
                const locationMatch = locationWords.some(locWord => 
                    locWord.includes(word)
                );
                
                if (placeNameMatch) {
                    score += 2; // Higher weight for place_name matches
                    matchedWords.push(word);
                }
                if (locationMatch) {
                    score += 1; // Lower weight for location matches
                    if (!matchedWords.includes(word)) {
                        matchedWords.push(word);
                    }
                }
                
                // Also check resort_ID if it exists
                if (item.resort_ID && item.resort_ID.toString().toLowerCase().includes(word)) {
                    score += 1;
                    if (!matchedWords.includes(word)) {
                        matchedWords.push(word);
                    }
                }
            });
            
            return { 
                ...item, 
                score, 
                matchedWordsCount: matchedWords.length,
                matchedWords 
            };
        })
        .filter(item => item.score > 0) // Only include items with at least one match
        .sort((a, b) => {
            // First sort by score (descending)
            if (b.score !== a.score) return b.score - a.score;
            
            // Then by number of matched words (descending)
            if (b.matchedWordsCount !== a.matchedWordsCount) {
                return b.matchedWordsCount - a.matchedWordsCount;
            }
            
            // Then by whether the match was in place_name (prioritize place_name matches)
            const aPlaceNameMatch = a.matchedWords.some(word => 
                a.place_name.toLowerCase().includes(word)
            );
            const bPlaceNameMatch = b.matchedWords.some(word => 
                b.place_name.toLowerCase().includes(word)
            );
            
            if (bPlaceNameMatch && !aPlaceNameMatch) return 1;
            if (aPlaceNameMatch && !bPlaceNameMatch) return -1;
            
            return 0;
        });
    };

    // Handle the search operation
    const handleSearch = () => {
        try {
            if (searchQuery.trim() === '') {
                return; // Prevent empty searches
            }
            setLoading(true);

            // Get sorted and filtered results
            const filteredResortData = performSearch(searchQuery);

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