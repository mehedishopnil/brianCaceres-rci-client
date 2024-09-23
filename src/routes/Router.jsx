import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import LastCallVacations from "../pages/LastCallVacations/LastCallVacations";
import Home from "../pages/Home/Home";


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
               }
          ]
     }
])