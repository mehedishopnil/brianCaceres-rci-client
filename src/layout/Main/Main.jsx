import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../shared/Header/Header';
import Footer from '../../shared/Footer/Footer';
import LastCallFooter from '../../shared/LastCallFooter/LastCallFooter';

const Main = () => {
     const location = useLocation();

    // Check if the current page is the "LastCallVacation" page
    const isLastCallVacationPage = location.pathname === "/lastCallVacation";

     return (
          <div>
               <Header/>
               <Outlet/>
                {/* Conditionally render the footer based on the current page */}
            {isLastCallVacationPage ? <LastCallFooter /> : <Footer />}
          </div>
     );
};

export default Main;