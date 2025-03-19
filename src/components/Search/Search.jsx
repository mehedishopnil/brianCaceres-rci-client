import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ResortCard from '../ResortCard/ResortCard';
import Loading from '../Loading';
import { AuthContext } from '../../providers/AuthProvider';

const Search = () => {
    const { allResortData } = useContext(AuthContext);
    const location = useLocation();
    const [searchData, setSearchData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.get('q') || '';
        setSearchTerm(searchQuery);
    }, [location.search]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (searchTerm.trim() !== '') {
                    const filteredData = allResortData.filter(resort => {
                        const nameMatch = resort.place_name ? resort.place_name.toLowerCase().includes(searchTerm.toLowerCase()) : false;
                        const locationMatch = resort.location ? resort.location.toLowerCase().includes(searchTerm.toLowerCase()) : false;
                        const idMatch = resort.resort_ID ? resort.resort_ID.toLowerCase().includes(searchTerm.toLowerCase()) : false;
                        return nameMatch || locationMatch || idMatch;
                    });
                    setSearchData(filteredData);
                } else {
                    setSearchData([]);
                }
            } catch (error) {
                console.error('Error fetching and filtering data:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm, allResortData]);

    // Function to modify place_name
    const modifyPlaceName = (place_name) => {
        // Check if the place_name contains a number followed by "Nights"
        const regex = /\d+\s*Nights/;
        if (regex.test(place_name)) {
            // Replace with "3 Nights" or remove it entirely
            return place_name.replace(regex, "3 Nights"); // Replace with "3 Nights"
            // Alternatively, to remove it entirely:
            // return place_name.replace(regex, "").trim();
        }
        return place_name; // Return the original if no match
    };

    return (
        <div className="p-4">
            <div>
                <h1 className="text-center text-2xl font-semibold my-2">
                    Search Results Found: {searchData.length}
                </h1>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        {/* Replace with your preferred loading indicator */}
                        <p><Loading/></p>
                    </div>
                ) : (
                    <>
                        {searchData.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {searchData.map((resort) => {
                                    // Modify the place_name before passing it to ResortCard
                                    const modifiedResort = {
                                        ...resort,
                                        place_name: modifyPlaceName(resort.place_name)
                                    };
                                    return (
                                        <Link to={`/singleResortPage/${resort._id}`} key={resort._id}>
                                            <ResortCard resort={modifiedResort} />
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center mt-4">No Results Found</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Search;