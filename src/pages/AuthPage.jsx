import { useState } from "react";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // If you want to redirect after login
import serviceApi from "../axios/axios";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await serviceApi.post("/auth/register", {
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword,
      });
      alert(res.data.message);
      setIsSignUp(true); // switch to login
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await serviceApi.post("/auth/login", {
        email: signInEmail,
        password: signInPassword,
      });
      // Save token and user info in localStorage (or Redux)
      localStorage.setItem("product-management-token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      navigate("/"); // Redirect to home or dashboard
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center font-sans p-4 lg:p-0 lg:overflow-hidden">
      {/* Mobile Layout */}
      <div className="block lg:hidden w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          {/* Toggle Buttons */}
          <div className="flex bg-gray-200 rounded-full p-1 mb-8">
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                isSignUp
                  ? "bg-[#EDA415] text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                !isSignUp
                  ? "bg-[#EDA415] text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Sign In Form - Mobile */}
          {isSignUp && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#EDA415] mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600">Welcome back!</p>
              </div>

              <form className="space-y-4" onSubmit={handleSignIn}>
                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg">
                  <FiMail size={20} className="text-gray-400 mr-3" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="outline-none w-full bg-transparent"
                    required
                  />
                </div>
                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg">
                  <FiLock size={20} className="text-gray-400 mr-3" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="outline-none w-full bg-transparent"
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-[#EDA415] underline font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#EDA415] text-white font-medium py-3 rounded-full hover:bg-[#d7920a] transition"
                >
                  SIGN IN
                </button>
              </form>
            </div>
          )}

          {/* Sign Up Form - Mobile */}
          {!isSignUp && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#EDA415] mb-2">
                  Create Account
                </h2>
                <p className="text-gray-600">Join us today!</p>
              </div>

              <form className="space-y-4" onSubmit={handleSignUp}>
                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg">
                  <FiUser size={20} className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Name"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    className="bg-transparent outline-none w-full"
                    required
                  />
                </div>
                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg">
                  <FiMail size={20} className="text-gray-400 mr-3" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="outline-none w-full bg-transparent"
                    required
                  />
                </div>
                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg">
                  <FiLock size={20} className="text-gray-400 mr-3" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="outline-none w-full bg-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#EDA415] text-white font-medium py-3 rounded-full hover:bg-[#d7920a] transition"
                >
                  SIGN UP
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block relative h-screen w-full bg-white overflow-hidden">
        {/* Sign In Form - Desktop */}
        <div
          className={`w-[60%] h-full flex flex-col justify-center items-center bg-white px-10 transition-opacity duration-500 ${
            isSignUp ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <h2 className="text-3xl xl:text-5xl font-bold text-[#EDA415] mb-6 w-full max-w-md text-center">
            Sign In to Your Account
          </h2>
          <form className="space-y-4 w-full max-w-md" onSubmit={handleSignIn}>
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded">
              <FiMail size={20} className="text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="Email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="outline-none w-full bg-transparent"
                required
              />
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded">
              <FiLock size={20} className="text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="outline-none w-full bg-transparent"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                className="text-center underline font-semibold cursor-pointer text-[#EDA415] hover:text-[#d7920a] transition"
              >
                Forgot password?
              </button>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#EDA415] text-white font-medium py-3 px-12 rounded-full hover:bg-[#d7920a] transition"
              >
                SIGN IN
              </button>
            </div>
          </form>
        </div>

        {/* Sign Up Form - Desktop */}
        <div
          className={`absolute top-0 left-0 w-[60%] h-full flex flex-col justify-center items-center bg-white px-10 transition-opacity duration-500 ${
            isSignUp ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <h2 className="text-3xl xl:text-5xl font-bold text-[#EDA415] mb-6 text-center">
            Create Account
          </h2>
          <form className="space-y-4 w-full max-w-md" onSubmit={handleSignUp}>
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded">
              <FiUser size={20} className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Name"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                className="bg-transparent outline-none w-full"
                required
              />
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded">
              <FiMail size={20} className="text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="outline-none w-full bg-transparent"
                required
              />
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded">
              <FiLock size={20} className="text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="outline-none w-full bg-transparent"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#EDA415] text-white font-medium py-3 px-12 rounded-full hover:bg-[#d7920a] transition"
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>

        {/* Sliding Panel - Desktop */}
        <div
          className={`absolute top-0 w-[40%] h-full flex flex-col justify-center items-center text-white px-6 transition-transform duration-700 ease-in-out bg-[#003F62] ${
            isSignUp ? "translate-x-[150%]" : "translate-x-0"
          }`}
        >
          {isSignUp ? (
            <>
              <h2 className="text-3xl xl:text-5xl font-bold mb-4 text-center">
                Hello, Friend!
              </h2>
              <p className="mb-6 text-center text-base xl:text-lg font-light max-w-xs xl:max-w-sm">
                Enter your personal details and start your journey with us
              </p>
              <button
                onClick={() => setIsSignUp(false)}
                className="border-2 border-white px-8 xl:px-12 py-3 xl:py-4 mt-5 rounded-full hover:bg-white hover:text-[#003F62] transition text-sm xl:text-base"
              >
                SIGN UP
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl xl:text-5xl font-bold mb-4 text-center">
                Welcome Back!
              </h2>
              <p className="mb-6 text-center text-base xl:text-lg font-light max-w-xs xl:max-w-sm">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => setIsSignUp(true)}
                className="border-2 border-white px-8 xl:px-12 py-3 xl:py-4 mt-5 rounded-full hover:bg-white hover:text-[#003F62] transition text-sm xl:text-base"
              >
                SIGN IN
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
