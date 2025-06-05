import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(null);
  const [blog, setBlog] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs/all");

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        setBlogs(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlog = async (id) => {
    try {
      const res = await fetch(`/api/blogs/${id}`);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        setBlog(data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchBlogs();
  }, []);


  const deleteBlog = async (id) => {
    try {
      const res = await fetch(`/api/blogs/delete/${id}`,{
        method:"DELETE"
      })
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        fetchBlogs()
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <BlogContext.Provider value={{ blogs, blog, fetchBlog,deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;

export const useBlog = () => useContext(BlogContext);
