import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#edebef] mt-10 p-10">
      <div className="lg:flex lg:justify-between lg:items-center space-y-5 lg:space-y-0">
        <div className="text-center lg:text-left lg:flex lg:gap-5 font-bold text-lg">
          <Link to="/about"><h1>About RCI</h1></Link>
          <Link to="/directory"><h1>Resort Directory</h1></Link>
          <Link to="/tv"><h1>RCI TV</h1></Link>
          <Link to="/privacy"><h1>Privacy Policy</h1></Link>
          <Link to="/contact"><h1>Contact Us</h1></Link>
        </div>

        <div className="text-center">
          <h1 className="text-xl">JOIN OUR COMMUNITY</h1>
          <div className="flex justify-center gap-5 text-2xl mt-2">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaPinterest /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-5">
        
        <p className="ml-2">Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;