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
import AvailableBooking from "../components/SingleResortPage/AvailableBooking/AvailableBooking";
import SingleAvailableUnit from "../components/SingleResortPage/SingleAvailabelUnit/SingleAvailabelUnit";
import Checkout from "../pages/Checkout/Checkout";
import Payment from "../pages/Payment/Payment";
import PaymentConfirmation from "../pages/PaymentConfermation/PaymentConfermation";
import AdminPanel from "../layout/AdminPanel/AdminPanel";
import AdminOverview from "../pages/AdminOverview/AdminOverview";
import AdminControl from "../pages/AdminControl/AdminControl";
import UserControl from "../pages/UserControl/UserControl";
import UsersBookings from "../pages/UsersBookings/UsersBookings";
import SearchBarMobile from "../components/SearchBarMobile/SearchBarMobile";
import Search from "../components/Search/Search";
import ResortInputForm from "../pages/ResortInputForm/ResortInputForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "lastCallVacation",
        element: <LastCallVacations />,
      },
      {
        path: "singleResortPage/:id",
        element: <SingleResortPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "registration",
        element: <Registration />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "single-available-unit",
        element: <SingleAvailableUnit />,
      },
      {
        path: "available-booking",
        element: <AvailableBooking/> ,
      },
      {
        path: "search_bar_mobile",
        element: <SearchBarMobile/>
      },
      {
        path: "search",
        element: <Search/>
      },
      {
        path: "checkout",
        element: <Checkout/>
      },
      {
        path: "payment",
        element: <Payment/>
      },
      {
        path: "payment-confirmation",
        element: <PaymentConfirmation/>
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },

  // Dashboard Part
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { path: "overview", element: <Overview /> },
      { path: "my-bookings", element: <MyBookings /> },
    ],
  },

  // Admin panel Part::

  {
    path: "admin-panel",
    element: <AdminPanel/>,
    children: [
      {
        path: "admin-overview",
        element:<AdminOverview/>         
      },
      {
        path: "admin-control",
        element: <AdminControl/>
      },
      {
        path: "user-control",
        element: <UserControl/>
      },
      {
        path: "users-bookings",
        element: <UsersBookings/>
      },
      {
        path: "resort-input-form",
        element: <ResortInputForm/>
      }
    ]
  }
]);
