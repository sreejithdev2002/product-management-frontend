// src/components/SignupForm.jsx
import React from "react";

const SignupForm = () => {
  return (
    <form className="w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>
      <input type="text" placeholder="Name" className="mb-3 w-full p-2 border rounded" />
      <input type="email" placeholder="Email" className="mb-3 w-full p-2 border rounded" />
      <input type="password" placeholder="Password" className="mb-3 w-full p-2 border rounded" />
      <button className="w-full bg-green-600 text-white py-2 rounded">Sign Up</button>
    </form>
  );
};

export default SignupForm;
