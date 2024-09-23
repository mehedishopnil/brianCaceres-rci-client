import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import LastCallVacations from "../pages/LastCallVacations/LastCallVacations";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";


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
                    path: "/lastCallVacation",
                    element: <LastCallVacations/>
               },
               {
                    path: "login",
                    element: <Login/>
               },
               {
                    path: "registration",
                    element: <Registration/>
               }
          ]
     }
])