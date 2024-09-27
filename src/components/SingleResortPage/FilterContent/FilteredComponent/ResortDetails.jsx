import React from 'react';

const ResortDetails = ({resort_details, check_in_time, check_out_time
}) => {
     return (
          <div className='p-4'>
               <p>{resort_details}</p>

               <div className="divider"></div>

               <div className='space-y-2'>
                    <h1 className='text-xl font-bold'>Property info</h1>
                    <h1 className='font-semibold'>Check-in time: </h1>
                    <p className='text-gray-600 pb-4'>{check_in_time}</p>

                    <h1 className='font-semibold'>Check-out time: </h1>
                    <p className='text-gray-600 pb-4'>{check_out_time}</p>

                    <h1 className='font-semibold'>Weeks Resort check-in days</h1>
                    <h1 className=''>Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday</h1>
               </div>
                <div className='divider'></div>
                <div>
                    <h1 className='text-2xl font-semibold'>Amenities</h1>
                    <h1 className='text-xl font-semibold'>Onsite</h1>
                    <ul className=''>
                         <li>Bar/lounge</li>
                         <li>Restaurant</li>
                         <li>Fitness Center</li>
                    </ul>
                </div>
               
          </div>
     );
};

export default ResortDetails;