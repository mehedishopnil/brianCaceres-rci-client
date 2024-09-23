import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

const Registration = () => {
  const [membership, setMembership] = useState(''); 
  const location = useLocation();
  const navigate = useNavigate();
  const { createUser, googleLogin } = useContext(AuthContext);

  const from = location.state?.from?.pathname || "/";

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const membership = form.membership.value;
  
    try {
      const result = await createUser(name, email, password, membership);
      const loggedUser = result.user;
      console.log(loggedUser);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error during registration:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Error during registration",
        footer: "Please try again later",
      });
    }
  };
  

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "Successfully Logged In with Google",
        showClass: {
          popup: "animate__animated animate__fadeInUp animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutDown animate__faster",
        },
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error logging in with Google",
        footer: "Please try again later",
      });
    }
  };

  return (
    <div className="hero w-full h-auto p-10 shadow-2xl rounded bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h1 className="text-center text-2xl font-bold pt-4">
            Register Now
          </h1>

          <form onSubmit={handleSignUp} className="card-body">
            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Input your name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Membership</span>
                </label>
                <select
                  name="membership"
                  className="select select-bordered"
                  value={membership}
                  onChange={(e) => setMembership(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select membership
                  </option>
                  <option value="Member">Wyndham Member</option>
                </select>
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Register"
                  className="btn bg-[#D1A054] text-white hover:bg-[#b18441]"
                />
              </div>
              <p className="text-center">
                Already have an account? Please{" "}
                <Link to={"/login"} className="font-bold text-[#D1A054]">
                  Login
                </Link>
              </p>
            </div>
          </form>

          <div className="divider">OR</div>

          <div className="flex items-center form-control mb-4">
            <button
              onClick={handleGoogleLogin}
              className="btn bg-[#4285F4] text-white hover:bg-[#357ae8] flex items-center justify-center"
            >
              <FcGoogle className="mr-2 text-2xl" />
              Register with Google
            </button>
          </div>
        </div>

        <div className="text-center lg:text-left">
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Registration;