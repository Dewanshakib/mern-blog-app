// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = ({ user, setUser }) => {
  
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="sticky top-0 z-50 bg-white/75 backdrop-blur-sm px-4 rounded-b-lg mb-10">
      <div className="flex items-center justify-between h-16 ">
        <Link className="text-2xl font-bold" to="/">
          Blogs
        </Link>

        <div className="flex items-center gap-3">
          {!user?.username && (
            <>
              <Link className="font-semibold underline p-2" to="/login">
                Login
              </Link>
              <Link className="font-semibold underline p-2" to="/register">
                Register
              </Link>
            </>
          )}
          {user?.username && (
            <>
              <Link className="font-semibold underline p-2" to="/create">
                Create Post
              </Link>
              <button
                onClick={handleLogout}
                className="font-semibold cursor-pointer p-2"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
