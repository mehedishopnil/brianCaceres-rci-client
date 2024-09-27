


const Reviews = ({reviews_amount, rating}) => {
     return (
          <div className='p-4'>
               <h1 className='text-xl font-semibold'>TripAdvisor Traveler Rating</h1>
               <div className='mt-4'>
                    <img className='w-32 -ml-2' src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-32772-5.svg" alt="" />
                    <h1><strong>Rating:</strong> {rating}</h1>
                    <h1><strong>Total Reviews:</strong> {reviews_amount}</h1>
               </div>

               <div className="divider"></div>

               <div className="space-y-3">
                    <div className="flex justify-between gap-5 text-xl">
                         <h1 className=" font-semibold">Rooms</h1>
                         <img className="w-24" src="https://static.tacdn.com/img2/ratings/traveler/ss4.0.svg" alt="" />
                    </div>

                    <div className="flex justify-between gap-5 text-xl">
                         <h1 className=" font-semibold">Service</h1>
                         <img className="w-24" src="https://static.tacdn.com/img2/ratings/traveler/ss4.0.svg" alt="" />
                    </div>

                    <div className="flex justify-between gap-5 text-xl">
                         <h1 className=" font-semibold">Value</h1>
                         <img className="w-24" src="https://static.tacdn.com/img2/ratings/traveler/ss4.0.svg" alt="" />
                    </div>

                    <div className="flex justify-between gap-5 text-xl">
                         <h1 className=" font-semibold">Cleanliness</h1>
                         <img className="w-24" src="https://static.tacdn.com/img2/ratings/traveler/ss4.0.svg" alt="" />
                    </div>
               </div>
               
          </div>
     );
};

export default Reviews;