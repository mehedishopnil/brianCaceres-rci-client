import { useContext } from "react";
import { FaLock, FaRegEdit, FaUser } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdEmail, MdLogout, MdOutlineSupportAgent } from "react-icons/md";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, signOut } = useContext(AuthContext);
  const { name, email, photoURL } = user;

  return (
    <div className=" my-5">
      <h1 className="text-xl text-center font-semibold ">My Profile</h1>

      <div className="flex justify-center items-center gap-5 mt-10">
        <img className="w-24 rounded-full" src={photoURL} alt="" />
        <div>
          <h1 className="text-lg font-semibold">{name}</h1>
          <p>Position </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center lg:my-10  lg:grid lg:grid-cols-2 lg:items-center lg:justify-center lg:gap-5 lg:px-5">
        <div className="w-10/12 lg:w-full flex justify-between items-center gap-5 mt-10 lg:mt-5 py-4 px-5 rounded-3xl bg-slate-100 border">
          <h1 className="text-base flex items-center gap-3 ">
            <span className="font-semibold">
              <FaUser />
            </span>{" "}
            {name}
          </h1>
          <FaRegEdit />
        </div>

        <div className="w-10/12 lg:w-full flex justify-between items-center gap-5 mt-5 py-4 px-5 rounded-3xl bg-slate-100 border">
          <h1 className="text-base flex items-center gap-3 ">
            <span className="font-semibold">
              <MdEmail />
            </span>{" "}
            {email}
          </h1>
          <FaRegEdit />
        </div>

        <div className="w-10/12 lg:w-full flex justify-between items-center gap-5 mt-5 py-4 px-5 rounded-3xl bg-slate-100 border">
          <h1 className="text-base flex items-center gap-3 font-bold">
            <span className="font-semibold">
              <FaLock />
            </span>{" "}
            *********
          </h1>
          <FaRegEdit />
        </div>

        <div className="w-10/12 lg:w-full flex justify-between items-center gap-5 mt-5 py-4 px-5 rounded-3xl bg-slate-100 border">
          <h1 className="text-base flex items-center gap-3 ">
            <span className="text-lg font-semibold">
              <IoLocation />
            </span>{" "}
            USA
          </h1>
          <FaRegEdit />
        </div>

        <div className="w-10/12 lg:w-full flex justify-between items-center gap-5 mt-5 py-4 px-5 rounded-3xl bg-slate-100 border">
          <h1 className="text-base flex items-center gap-3 ">
            <span className="text-xl font-semibold">
              <MdOutlineSupportAgent />
            </span>{" "}
            Support
          </h1>
          <FaRegEdit />
        </div>

        
          <div className="w-10/12 lg:w-full flex justify-between items-center gap-5 mt-5 py-4 px-5 rounded-3xl bg-slate-100 border">
          <Link to={signOut}>
            <h1 className="text-base flex items-center gap-3 ">
              <span className="text-lg font-semibold">
                <MdLogout />
              </span>{" "}
              Log Out
            </h1>
            </Link>
          </div>
        
      </div>
    </div>
  );
};

export default Profile;
