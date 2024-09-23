import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import LastCallVacations from "../pages/LastCallVacations/LastCallVacations";


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