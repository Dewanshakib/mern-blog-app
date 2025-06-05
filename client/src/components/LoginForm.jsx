import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";

const LoginForm = () => {

  const {setUser}  = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
       return toast.error(data.message);
      } else {
        toast.success(data.message);
        setUser(data.userInfo)
        return navigate("/")
      }
      
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-sm w-full border border-gray-200 rounded-lg py-10 px-6 flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="flex flex-col gap-4">
          <div className="">
            <label htmlFor="Email">Email</label>
            <input
            type="text"
            placeholder="Enter your email"
            // required
            onChange={(e) => setFormData({...formData,email:e.target.value})}
            className="border border-gray-200 rounded-lg p-2 w-full mt-2"
          />
          </div>
          <div className="">
            <label htmlFor="Password">Password</label>
            <input
            type="password"
            placeholder="Enter your password"
            // required
            onChange={(e) => setFormData({...formData,password:e.target.value})}
            className="border border-gray-200 rounded-lg p-2 w-full mt-2"
          />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
