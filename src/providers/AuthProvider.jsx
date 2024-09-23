import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import app from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); 
  const [resortData, setResortData] = useState([]); 
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsersData, setAllUsersData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);


  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

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




// SignIn process (with email and password)
const login = async (email, password) => {
  setLoading(true);
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const signedInUser = userCredential.user;

    // Fetch specific user data from backend based on email
    const userDataResponse = await fetch(
      `https://rci-last-call-server.vercel.app/users?email=${email}`
    );
    if (!userDataResponse.ok) {
      throw new Error("Failed to fetch user data from backend");
    }

    const userData = await userDataResponse.json();
    setUser(userData[0]); // Set user state with fetched userData

    console.log("User signed in and data fetched:", signedInUser, userData);

    // Show success alert
    Swal.fire({
      title: "Successfully Signed In",
      showClass: {
        popup: "animate__animated animate__fadeInUp animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutDown animate__faster",
      },
    });

    return userCredential; // Return the userCredential
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error; // Throw the error to handle it in the SignIn component
  } finally {
    setLoading(false);
  }
};




  // Function to create user and send data to backend
  const createUser = async (name, email, password, membership) => {
    setLoading(true);
    try {
      // Check if user already exists in the backend
      const userExistsResponse = await fetch(
        `https://rci-last-call-server.vercel.app/users?email=${email}`
      );

      if (userExistsResponse.status === 404) {
        console.log("User not found, proceeding with registration");
      } else if (!userExistsResponse.ok) {
        throw new Error("Failed to check if user exists");
      } else {
        const userExistsData = await userExistsResponse.json();
        if (userExistsData.length > 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You are already registered",
          });
          return; // Stop the registration process
        }
      }

      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const createdUser = userCredential.user;

      // Send user data to backend
      const backendResponse = await fetch(
        "https://rci-last-call-server.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            membership,
          }),
        }
      );

      if (!backendResponse.ok) {
        throw new Error("Failed to send user data to backend");
      }

      Swal.fire({
        title: "Successfully Registered",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });

      // Fetch specific user data from backend based on email
      const userDataResponse = await fetch(
        `https://rci-last-call-server.vercel.app/users?email=${email}`
      );
      if (!userDataResponse.ok) {
        throw new Error("Failed to fetch user data from backend");
      }
      const userData = await userDataResponse.json();
      setUser(userData[0]); // Set user state with fetched userData
      return userCredential;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fetch all Users Data
  const fetchAllUsersData = async () => {
    setLoading(true);
    try {
      console.log("Fetching all users data...");
      const response = await fetch(
        "https://rci-last-call-server.vercel.app/all-users"
      );
      if (!response.ok) {
        throw new Error(
          `Error fetching all users data: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setAllUsersData(data);
    } catch (error) {
      console.error("Error fetching all users data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (email, isAdmin) => {
    try {
      const response = await fetch(
        `https://rci-last-call-server.vercel.app/update-user`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, isAdmin }),
        }
      );

      if (!response.ok) {
        // Log response details for debugging
        const errorText = await response.text();
        throw new Error(
          `Error updating user role: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      // Fetch updated user data
      const updatedUser = await response.json();

      // Log the updated user for debugging
      console.log("Updated user:", updatedUser);

      // Update the state with the updated user
      setAllUsersData((prevUsers) =>
        prevUsers.map((user) => (user.email === email ? updatedUser : user))
      );
    } catch (error) {
      console.error("Error updating user role:", error.message);
    }
  };



// Google Login
const googleLogin = async () => {
  setLoading(true);
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if the user already exists in the backend
    const userExistsResponse = await fetch(
      `https://rci-last-call-server.vercel.app/users?email=${user.email}`
    );

    if (userExistsResponse.status === 404) {
      console.log("User not found, creating new user");

      // User does not exist, send user data to backend
      const backendResponse = await fetch(
        "https://rci-last-call-server.vercel.app/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.displayName || "", // Use displayName if available
            email: user.email,
            photoURL: user.photoURL,
          }),
        }
      );

      if (!backendResponse.ok) {
        const errorText = await backendResponse.text();
        console.error(
          `Failed to update backend data with Google user: ${backendResponse.status} ${backendResponse.statusText}`
        );
        console.error("Response text:", errorText);
        throw new Error("Failed to update backend data with Google user");
      }

      // Set user state with new user data
      const newUser = {
        name: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL,
      };
      setUser(newUser);

      console.log("New user signed up with Google:", user);
    } else if (userExistsResponse.ok) {
      const userExistsData = await userExistsResponse.json();

      if (userExistsData.length > 0) {
        // User exists, set user state with fetched userData
        setUser(userExistsData[0]);
        console.log("User logged in with Google:", user);
      } else {
        // In case the user is not found but the response is ok (not 404), it could be an unexpected scenario
        console.log(
          "Unexpected response: User not found but status is not 404"
        );
      }
    } else {
      const errorText = await userExistsResponse.text();
      console.error(
        `Failed to check if user exists: ${userExistsResponse.status} ${userExistsResponse.statusText}`
      );
      console.error("Response text:", errorText);
      throw new Error("Failed to check if user exists");
    }

    return result;
  } catch (error) {
    console.error("Error logging in with Google:", error.message);
    throw error;
  } finally {
    setLoading(false);
  }
};



// Sign out process
const signOut = async () => {
  setLoading(true);
  try {
    await firebaseSignOut(auth);
    setUser(null);
    setBookingsData([]); // Clear bookings data on sign out
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error.message);
  } finally {
    setLoading(false);
  }
};



  const authInfo = {
    loading,
    user,
    resortData,
    filteredData,
    totalPages,
    currentPage,
    allUsersData,
    bookingsData,
    paginate,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
