import { Link } from "react-router-dom";
import errorImg from "../../assets/images/404_error_img.jpg"

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="text-center">
        
        <div className="">
          <img
            src={errorImg}
            alt="Not Found Illustration"
            className="mx-auto w-full h-64 object-contain"
          />
          <h1 className="text-xl font-semibold my-4">The Page Not Found!</h1>
        </div>

        <Link to="/">
          <button className="mt-5 px-6 py-3 bg-[#257ce1] text-white font-semibold rounded-lg hover:bg-primary-focus transition-all duration-300">
            Go Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;