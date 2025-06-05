import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../common/Editor";
import { useBlog } from "../context/blogContext";
import { useEffect } from "react";


const EditBlogFrom = () => {
  const {blog,fetchBlog} = useBlog()
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchBlog(id)
  }, [])

  const [formData, setFormData] = useState({
    title: blog?.title,
    summery: blog?.summery,
    content: blog?.content,
    file: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.set("title", formData.title);
    payload.set("summery", formData.summery);
    payload.set("content", formData.content);
    payload.set("file", formData.file);

    try {
      const res = await fetch(`/api/blogs/edit/${id}`, {
        method: "PUT",
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        
      } else {
        toast.success(data.message);
        return navigate(`/blog/${id}`)
      }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };



  return (
    <div className="max-w-2xl h-auto px-6 py-10 border border-gray-200 rounded-lg mx-auto">
          <h1 className="text-3xl font-semibold mb-10">Edit Blog</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
            <div className="">
              <label htmlFor="Email">Title</label>
              <input
                type="text"
                placeholder="Enter blog title"
                className="border border-gray-200 rounded-lg p-2 w-full mt-2"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                }}
              />
            </div>
            <div className="">
              <label htmlFor="Email">Summery</label>
              <textarea
                type="text"
                placeholder="Enter blog summery"
                className="border border-gray-200 rounded-lg p-2 w-full mt-2"
                value={formData.summery}
                onChange={(e) => {
                  setFormData({ ...formData, summery: e.target.value });
                }}
              />
            </div>
            <div className="">
              <label htmlFor="Email">Upload Image</label>
              <input
                type="file"
                onChange={(e) => setFormData({...formData,file:e.target.files[0]})}
                className="border border-gray-200 rounded-lg p-2 w-full mt-2 bg-gray-200 font-medium"
              />
            </div>
            <div className="">
              <Editor
                value={formData.content}
                onChange={(value) => {
                  setFormData({ ...formData, content: value });
                }}
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-500 py-2 text-white hover:opacity-70 rounded "
            >
              Update Blog
            </button>
          </form>
        </div>
  )
}

export default EditBlogFrom