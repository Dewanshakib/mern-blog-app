import React, { useState } from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom"

const RegisterForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
       return toast.error(data.message);
      } else {
        toast.success(data.message);
        return navigate("/login")
      }
      
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-sm w-full border border-gray-200 rounded-lg py-10 px-6 flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Register</h1>
        <div className="flex flex-col gap-4">
          <div className="">
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              // required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="border border-gray-200 rounded-lg p-2 w-full mt-2"
            />
          </div>
          <div className="">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              // required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="border border-gray-200 rounded-lg p-2 w-full mt-2"
            />
          </div>
          <div className="">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              // required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="border border-gray-200 rounded-lg p-2 w-full mt-2"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
