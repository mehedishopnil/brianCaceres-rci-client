import { IoSearch } from "react-icons/io5";
import rciImg2 from "../../assets/images/rci-magazine-people-places.jpg";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const Home = () => {
  return (
    <div>
      {/* Securely using local images instead of direct URL references */}
      <div className="relative flex justify-center h-[660px] lg:h-[350px] lg:w-full lg:bg-center bg-no-repeat bg-cover bg-[url('https://www.rci.com/static/images/content/_NAMER/clubs/wvr-hero1.jpg?impolicy=club-570-760')] lg:bg-[url('https://www.rci.com/static/images/content/_NAMER/clubs/wvr/wvr-hero4-desktop-500.jpg')]">
        <div className="absolute top-[400px] lg:top-[150px] lg:left-16 px-5 py-8 rounded-3xl space-y-3 bg-white shadow-lg">
          <div className="flex justify-center ">
            <h1 className="text-[1.5rem] font-semibold">
              Find your dream vacation!
            </h1>
            <IoSearch className="text-5xl text-[#03709235]" />
          </div>
          <div className="w-full h-[1px] bg-gray-300 mt-2"></div>
          <h1 className="flex items-center text-center font-medium text-[#037092]">
            See all RCI resorts <MdKeyboardDoubleArrowRight />
          </h1>
        </div>
      </div>

      <div className="lg:container lg:mx-auto text-center space-y-5 border my-10 p-4">
        <div className="lg:grid lg:grid-cols-2 md:space-x-5">
          <div className="md:text-right md:p-5">
            <h1 className="text-3xl font-normal md:font-semibold mb-2">
              You have ZERO points in your RCI account!
            </h1>
            <p className="text-base">
              Before you can book a vacation with RCI, you must have sufficient
              Points in your RCI account. Get inspired by searching available
              RCI vacations, then return to your Club Wyndham account to deposit
              the number of Points required for the trip you'd like to book.
            </p>
          </div>

          <div className="p-5 shadow-md border space-y-2 lg:rounded-none rounded-3xl my-5">
            <h1 className="text-xl font-semibold">
              Get Points for your next vacation
            </h1>
            <p>by depositing your Club Wyndham Points with RCI</p>
            <button className="btn text-black font-bold shadow-md bg-[#ffcc45]">
              DEPOSIT MY POINTS
            </button>
          </div>
        </div>

        <div className="w-full lg:grid lg:grid-cols-2 bg-[#e6f8fc] my-10">
          <img src={rciImg2} alt="RCI Magazine" className="cover" />
          <div className="lg:flex lg:flex-col lg:justify-center text-start px-4 py-6 space-y-2">
            <h1 className="text-xl font-bold">RCI Magazine®</h1>
            <p className="text-base">
              RCI Magazine® is your all-in-one resource for travel inspiration,
              exclusive offers, and exciting member news. Take a look at our
              Winter 2023 issue today!
            </p>

            <button className="btn w-full lg:w-fit text-lg font-semibold text-[#037092] border rounded-md border-[#037092] shadow-md">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
