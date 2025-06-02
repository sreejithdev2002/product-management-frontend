// import { useState } from "react";
// import { FiUser, FiLock, FiMail } from "react-icons/fi";

// export default function AuthPage() {
//   const [isSignUp, setIsSignUp] = useState(true);

//   const [signInEmail, setSignInEmail] = useState("");
//   const [signInPassword, setSignInPassword] = useState("");

//   const [signUpName, setSignUpName] = useState("");
//   const [signUpEmail, setSignUpEmail] = useState("");
//   const [signUpPassword, setSignUpPassword] = useState("");

//   return (
//     <div className="w-full h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
//       <div className="relative h-full w-full bg-white overflow-hidden flex">
//         {/* Sign In Form */}
//         <div
//           className={`w-[60%] h-full flex flex-col justify-center items-center bg-white px-10 transition-opacity duration-500 ${
//             isSignUp ? "opacity-100" : "opacity-0 pointer-events-none"
//           }`}
//         >
//           <h2 className="text-5xl font-bold text-[#EDA415] mb-6 w-[45%] text-center">
//             Sign In to Your Account
//           </h2>
//           <form className="space-y-4 w-3/4">
//             <div className="flex items-center bg-gray-100 px-4 py-3 rounded">
//               <FiMail size={20} className="text-gray-400 mr-3" />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={signInEmail}
//                 onChange={(e) => setSignInEmail(e.target.value)}
//                 className="outline-none w-full"
//               />
//             </div>
//             <div className="flex items-center bg-gray-100 px-4 py-3 rounded">
//               <FiLock size={20} className="text-gray-400 mr-3" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={signInPassword}
//                 onChange={(e) => setSignInPassword(e.target.value)}
//                 className="outline-none w-full"
//               />
//             </div>
//             <h3 className="text-center underline font-semibold cursor-pointer">
//               forgot password?
//             </h3>
//             <button
//               type="submit"
//               className="bg-[#EDA415] text-white font-medium py-3 rounded-full w-1/2 mx-30 hover:bg-[#d7920a] transition"
//             >
//               SIGN IN
//             </button>
//           </form>
//         </div>

//         {/* Sign Up Form */}
//         <div
//           className={`w-[60%] h-full flex flex-col justify-center items-center bg-white px-10 transition-opacity duration-500 ${
//             isSignUp ? "opacity-0 pointer-events-none" : "opacity-100"
//           }`}
//         >
//           <h2 className="text-5xl font-bold text-[#EDA415] mb-6 text-center">
//             Create Account
//           </h2>
//           <form className="space-y-4 w-3/4">
//             <div className="flex items-center  bg-gray-100 px-4 py-3 rounded">
//               <FiUser size={20} className="text-gray-400 mr-3" />
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={signUpName}
//                 onChange={(e) => setSignUpName(e.target.value)}
//                 className="bg-transparent outline-none w-full"
//               />
//             </div>
//             <div className="flex items-center bg-gray-100 px-4 py-3 rounded">
//               <FiMail size={20} className="text-gray-400 mr-3" />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={signUpEmail}
//                 onChange={(e) => setSignUpEmail(e.target.value)}
//                 className="outline-none w-full"
//               />
//             </div>
//             <div className="flex items-center bg-gray-100 px-4 py-3 rounded">
//               <FiLock size={20} className="text-gray-400 mr-3" />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={signUpPassword}
//                 onChange={(e) => setSignUpPassword(e.target.value)}
//                 className="outline-none w-full"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-[#EDA415] text-white font-medium py-3 rounded-full w-1/2 mx-30 hover:bg-[#d7920a] transition"
//             >
//               SIGN UP
//             </button>
//           </form>
//         </div>

//         {/* Sliding Prompt Panel (1/4 width) */}
//         <div
//           className={`absolute top-0 w-[40%] h-full flex flex-col justify-center items-center text-white px-6 transition-transform duration-700 ease-in-out bg-[#003F62] ${
//             isSignUp ? "translate-x-[150%]" : "translate-x-0"
//           }`}
//         >
//           {isSignUp ? (
//             <>
//               <h2 className="text-5xl font-bold mb-4 text-center">
//                 Hello, Friend!
//               </h2>
//               <p className="mb-6 text-center text-lg font-light w-2/4">
//                 Enter your personal details and start your journey with us
//               </p>
//               <button
//                 onClick={() => setIsSignUp(false)}
//                 className="border-2 border-white px-20 py-4 mt-5 rounded-full hover:bg-white hover:text-[#003F62] transition text-sm"
//               >
//                 SIGN UP
//               </button>
//             </>
//           ) : (
//             <>
//               <h2 className="text-5xl font-bold mb-4 text-center">
//                 Welcome Back!
//               </h2>
//               <p className="mb-6 text-center text-lg font-light w-2/4">
//                 To keep connected with us plase login with your personal info
//               </p>
//               <button
//                 onClick={() => setIsSignUp(true)}
//                 className="border-2 border-white px-20 py-4 mt-5 rounded-full hover:bg-white hover:text-[#003F62] transition text-sm"
//               >
//                 SIGN IN
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import { useNavigate } from "react-router"; // If you want to redirect after login
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
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
      <div className="relative h-full w-full bg-white overflow-hidden flex">

        {/* Sign In Form */}
        <div className={`w-[60%] h-full flex flex-col justify-center items-center bg-white px-10 transition-opacity duration-500 ${
          isSignUp ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
          <h2 className="text-5xl font-bold text-[#EDA415] mb-6 w-[45%] text-center">
            Sign In to Your Account
          </h2>
          <form className="space-y-4 w-3/4" onSubmit={handleSignIn}>
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded">
              <FiMail size={20} className="text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="Email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="outline-none w-full"
              />
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded">
              <FiLock size={20} className="text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="outline-none w-full"
              />
            </div>
            <h3 className="text-center underline font-semibold cursor-pointer">
              forgot password?
            </h3>
            <button
              type="submit"
              className="bg-[#EDA415] text-white font-medium py-3 rounded-full w-1/2 mx-30 hover:bg-[#d7920a] transition"
            >
              SIGN IN
            </button>
          </form>
        </div>

        {/* Sign Up Form */}
        <div className={`w-[60%] h-full flex flex-col justify-center items-center bg-white px-10 transition-opacity duration-500 ${
          isSignUp ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}>
          <h2 className="text-5xl font-bold text-[#EDA415] mb-6 text-center">
            Create Account
          </h2>
          <form className="space-y-4 w-3/4" onSubmit={handleSignUp}>
            <div className="flex items-center  bg-gray-100 px-4 py-3 rounded">
              <FiUser size={20} className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Name"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                className="bg-transparent outline-none w-full"
              />
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded">
              <FiMail size={20} className="text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="outline-none w-full"
              />
            </div>
            <div className="flex items-center bg-gray-100 px-4 py-3 rounded">
              <FiLock size={20} className="text-gray-400 mr-3" />
              <input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="outline-none w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-[#EDA415] text-white font-medium py-3 rounded-full w-1/2 mx-30 hover:bg-[#d7920a] transition"
            >
              SIGN UP
            </button>
          </form>
        </div>

        {/* Sliding Panel */}
        <div className={`absolute top-0 w-[40%] h-full flex flex-col justify-center items-center text-white px-6 transition-transform duration-700 ease-in-out bg-[#003F62] ${
          isSignUp ? "translate-x-[150%]" : "translate-x-0"
        }`}>
          {isSignUp ? (
            <>
              <h2 className="text-5xl font-bold mb-4 text-center">
                Hello, Friend!
              </h2>
              <p className="mb-6 text-center text-lg font-light w-2/4">
                Enter your personal details and start your journey with us
              </p>
              <button
                onClick={() => setIsSignUp(false)}
                className="border-2 border-white px-20 py-4 mt-5 rounded-full hover:bg-white hover:text-[#003F62] transition text-sm"
              >
                SIGN UP
              </button>
            </>
          ) : (
            <>
              <h2 className="text-5xl font-bold mb-4 text-center">
                Welcome Back!
              </h2>
              <p className="mb-6 text-center text-lg font-light w-2/4">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => setIsSignUp(true)}
                className="border-2 border-white px-20 py-4 mt-5 rounded-full hover:bg-white hover:text-[#003F62] transition text-sm"
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
