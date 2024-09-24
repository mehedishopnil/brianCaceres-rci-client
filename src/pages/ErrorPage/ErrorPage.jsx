import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="text-center">
        
        <div className="">
          <img
            src="https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found.png"
            alt="Not Found Illustration"
            className="mx-auto w-full h-64 object-contain"
          />
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