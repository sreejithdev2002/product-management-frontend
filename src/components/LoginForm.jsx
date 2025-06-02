// src/components/LoginForm.jsx
import React from "react";

const LoginForm = () => {
  return (
    <form className="w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>
      <input type="email" placeholder="Email" className="mb-3 w-full p-2 border rounded" />
      <input type="password" placeholder="Password" className="mb-3 w-full p-2 border rounded" />
      <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
    </form>
  );
};

export default LoginForm;
