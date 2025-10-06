import { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const { data } = await axios.post(backendUrl + "api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
      onClick={()=>console.log("clicked")}
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl w-[90%] max-w-md"
      >
        <img
          src={assets.cross_icon}
          alt="Close"
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowLogin(false)}
        />

        <h1 className="text-center text-2xl text-neutral-700 font-semibold mb-2">
          {isLogin ? "Login" : "Sign Up"}
        </h1>
        <p className="text-sm text-center text-gray-500 mb-6">
          {isLogin
            ? "Welcome back! Please sign in to continue"
            : "Create your account to get started"}
        </p>

        {!isLogin && (
          <div
            style={{ opacity: 0.8 }}
            className="border px-5 py-2 flex items-center gap-2 rounded-full mb-4"
          >
            <img src={assets.profile_icon} alt="" width={25} />
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              className="outline-none text-sm w-full"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}
        <div className="border border-neutral-500 px-6 py-2 flex items-center gap-2 rounded-full mb-4">
          <img src={assets.email_icon} alt="" width={20} />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="outline-none text-sm w-full"
            type="email"
            placeholder="Email Id"
            required
          />
        </div>

        <div className="border border-neutral-500 px-6 py-2 flex items-center gap-2 rounded-full mb-4">
          <img src={assets.lock_icon} alt="" width={20} />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="outline-none text-sm w-full"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {isLogin && (
          <p className="text-sm text-blue-600 mb-4 cursor-pointer text-right">
            Forgot Password?
          </p>
        )}

        <button className="bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer hover:bg-black transition">
          {isLogin ? "Login" : "Create Account"}
        </button>
        <p className="mt-5 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer font-medium"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
