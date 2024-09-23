import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/"; // Redirect to the previous page or default to homepage

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    try {
      const result = await login(email, password);
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "Successfully Logged In",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      setIsLoggedIn(true);
      navigate(from, { replace: true }); // Redirect to the previous page
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong Email or Password",
        footer: "Please enter correct Email or Password",
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
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      setIsLoggedIn(true);
      navigate(from, { replace: true }); // Redirect to the previous page
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
    <div className="flex justify-center items-center h-full bg-base-100">
      <div className="hero w-full h-auto p-10 rounded bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-center text-2xl font-bold pt-4">LogIn</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
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
                    placeholder="password"
                    name="password"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <a
                      href="#"
                      className="label-text-alt link link-hover text-[#D1A054]"
                    >
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <input
                    type="submit"
                    value="Login"
                    disabled={isLoggedIn}
                    className="btn bg-[#D1A054] text-white hover:bg-[#b18441]"
                  />
                </div>
                <p>
                  Do not have Account? Please{" "}
                  <Link
                    to={"/signup"}
                    className="font-bold text-[#D1A054]"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>

            <div className="divider">OR</div> {/* Divider between login methods */}

            {/* Google Login */}
            <div className="flex items-center form-control mb-4">
              <button
                onClick={handleGoogleLogin}
                className="btn bg-[#4285F4] text-white hover:bg-[#357ae8] flex items-center justify-center"
              >
                <FcGoogle className="mr-2 text-2xl" /> {/* Google icon */}
                Login with Google
              </button>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;