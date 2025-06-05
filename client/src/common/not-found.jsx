import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className=" flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-9xl font-bold text-indigo-600">404</h1>
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">
        Page Not Found
      </h2>
      <p className="mt-2 text-gray-600 text-lg">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to='/'
        className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow hover:bg-indigo-700 transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound