import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ResortCard from "../ResortCard/ResortCard";
import Loading from "../Loading";
import { AuthContext } from "../../providers/AuthProvider";

const Search = () => {
  const { allResortData } = useContext(AuthContext);
  const location = useLocation();
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [resortsCount, setResortsCount] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q") || "";
    setSearchTerm(searchQuery);
  }, [location.search]);

  // Enhanced search function that handles partial word matches
  const performSearch = (query, data) => {
    if (!query.trim()) return [];

    const queryWords = query
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    return data
      .map((item) => {
        let score = 0;
        let matchedWords = [];

        // Check each query word against place_name and location
        queryWords.forEach((word) => {
          const placeNameWords =
            item.place_name?.toLowerCase().split(/\s+/) || [];
          const locationWords = item.location?.toLowerCase().split(/\s+/) || [];

          // Check if word matches any part of place_name
          const placeNameMatch = placeNameWords.some((placeWord) =>
            placeWord.includes(word)
          );

          // Check if word matches any part of location
          const locationMatch = locationWords.some((locWord) =>
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
          if (
            item.resort_ID &&
            item.resort_ID.toString().toLowerCase().includes(word)
          ) {
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
          matchedWords,
        };
      })
      .filter((item) => item.score > 0) // Only include items with at least one match
      .sort((a, b) => {
        // First sort by score (descending)
        if (b.score !== a.score) return b.score - a.score;

        // Then by number of matched words (descending)
        if (b.matchedWordsCount !== a.matchedWordsCount) {
          return b.matchedWordsCount - a.matchedWordsCount;
        }

        // Then by whether the match was in place_name (prioritize place_name matches)
        const aPlaceNameMatch = a.matchedWords.some((word) =>
          a.place_name?.toLowerCase().includes(word)
        );
        const bPlaceNameMatch = b.matchedWords.some((word) =>
          b.place_name?.toLowerCase().includes(word)
        );

        if (bPlaceNameMatch && !aPlaceNameMatch) return 1;
        if (aPlaceNameMatch && !bPlaceNameMatch) return -1;

        return 0;
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (searchTerm.trim() !== "") {
          // Get sorted and filtered results
          const filteredData = performSearch(searchTerm, allResortData);
          setSearchData(filteredData);
          setResortsCount(filteredData.length);
        } else {
          setSearchData([]);
          setResortsCount(0);
        }
      } catch (error) {
        console.error("Error fetching and filtering data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, allResortData]);

  // Function to modify resort data before display
  const modifyResortData = (resort) => {
    const modifiedResort = { ...resort };
    
    // Remove price rates
    if (modifiedResort.price_rate) {
      delete modifiedResort.price_rate;
    }
    
    // Mark 3 and 4 bedroom units as unavailable
    if (modifiedResort.bedrooms) {
      const bedrooms = parseInt(modifiedResort.bedrooms);
      if (bedrooms === 3 || bedrooms === 4) {
        modifiedResort.available = false;
      }
    }
    
    return modifiedResort;
  };

  return (
    <div className="p-4">
      <div>
        <h1 className="text-center text-xl md:text-2xl ">
          Search Results Found:{" "}
          <span className="font-semibold">{searchTerm}</span>
        </h1>
        {/* Show count of resorts found */}
        {searchTerm && (
          <p className="text-center text-lg font-semibold mb-6">
            {resortsCount} {resortsCount === 1 ? 'resort' : 'resorts'} match your search
          </p>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>
              <Loading />
            </p>
          </div>
        ) : (
          <>
            {searchData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchData.map((resort) => {
                  const modifiedResort = modifyResortData(resort);
                  return (
                    <Link
                      to={
                        modifiedResort.available === false 
                          ? "#" 
                          : `/singleResortPage/${resort._id}`
                      }
                      key={resort._id}
                    >
                      <ResortCard 
                        resort={modifiedResort} 
                        showPoints={true} 
                        weekendPointPremium={500}
                      />
                    </Link>
                  );
                })}
              </div>
            ) : (
              searchTerm && (
                <p className="text-center mt-4">
                  No Results Found for '{searchTerm}'
                </p>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;