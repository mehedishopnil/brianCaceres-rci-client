import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import LastCallVacations from "../pages/LastCallVacations/LastCallVacations";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import SingleResortPage from "../components/SingleResortPage/SingleResortPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Profile from "../pages/Profile/Profile";
import Dashboard from "../layout/Dashboard/Dashboard";
import Overview from "../pages/Overview/Overview";
import MyBookings from "../pages/MyBookings/Mybookings";
import SingleAvailableUnit from "../components/SingleResortPage/FilterContent/FilteredComponent/SingleAvailableUnit";


export const router = createBrowserRouter([
     {
          path: "/",
          element: <Main/>,
          children:[
               {
                    path: "/",
                    element: <Home/>
               },
               {
                    path: "lastCallVacation",
                    element: <LastCallVacations/>
               },
               {
                    path: "singleResortPage/:id",
                    element: <SingleResortPage/>
               },
               {
                    path: "login",
                    element: <Login/>
               },
               {
                    path: "registration",
                    element: <Registration/>
               },
               {
                    path: "profile",
                    element: <Profile/>
               },
               {
                    path: "single-available-unit",
                    element: <SingleAvailableUnit/>
               },
               {
                    path: "*",
                    element: <ErrorPage/>
 
               }
          ]
     },


     // Dashboard Part
  {
     path: "dashboard",
     element: <Dashboard />,
     children: [
       { path: "overview", element: <Overview /> },
       { path: "my-bookings", element: <MyBookings /> }
     ],
   },
])