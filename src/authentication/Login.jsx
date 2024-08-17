import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { signIn, googleSignIn, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);
    try {
      signIn(email, password)
        .then(async (result) => {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/login`,
            { email: result?.user?.email }
          );
          console.log(data);
          localStorage.setItem("token", data?.token);
          console.log(result);
          navigate(location?.state ? location.state : "/");
          toast.success("login successfull");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGooglSignin = () => {
    try {
      googleSignIn()
        .then(async (result) => {
          console.log(result);
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/signup`,
            {
              name: result?.user?.displayName,
              email: result?.user?.email,
              photoURL: result?.user?.photoURL,
            }
          );
          localStorage.setItem("token", data.token);
          toast.success("Registration successfull");
          navigate(location?.state ? location.state : "/");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="hero min-h-[calc(100vh-100px)]"
      style={{
        backgroundImage:
          "url(https://cdn.cmsfly.com/647c7ae51dedbc00122fa4b3/dall%C2%B7e-2023-12-21-09.23.42-a-creative-and-engaging-cover-image-for-a-product-management-blog-article.-the-image-features-a-mosaic-of-various-elements-related-to-market-analysis,-LqjrGZ.png)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>

      <div className="card bg-transparent text-white w-full max-w-sm shrink-0 shadow-2xl m-6">
        <h4 className="text-2xl font-bold text-center mt-10">Please login</h4>
        <form onSubmit={handleSignIn} className="card-body">
          <div className="form-control">
            <label className="label">
              <span>Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="abdullah@gmail.com"
              className="input input-bordered text-gray-600"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span>Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="aaaaaa"
              className="input input-bordered text-gray-600"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        <button
          onClick={handleGooglSignin}
          aria-label="Login with Google"
          type="button"
          className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-4 h-4 fill-current"
          >
            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
          </svg>
          <p>Login with Google</p>
        </button>
        <Link to="/register">dont have an account?Register</Link>
      </div>
    </div>
  );
};

export default Login;
