import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { useBlog } from "../context/blogContext";
import Loading from "../common/Loading";
import { useAuth } from "../context/userContext";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const BlogPage = () => {
  const { id } = useParams();
  const { blog, fetchBlog, deleteBlog } = useBlog();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog(id);
  }, [id]);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirm) {
      deleteBlog(id);
      navigate("/");
    }
  };

  if (!blog)
    return (
      <div className="text-center flex items-center">
        <Loading />
      </div>
    );

  return (
    <div className="px-4 pb-5">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">{blog.title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-sm text-gray-700 font-bold">
              By @{blog?.author?.username}
            </h1>
            •
            {blog?.createdAt && (
              <p className="text-xs">
                {formatISO9075(new Date(blog.createdAt))}
              </p>
            )}
          </div>
          <div className="">
            {user?._id === blog?.author?._id && (
              <div className="flex items-center gap-2">
                <Link
                  className="underline text-gray-700 hover:text-blue-500"
                  to={`/blog/edit/${blog?._id}`}
                >
                  <FiEdit size={22} />
                </Link>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-gray-900 hover:text-red-600"
                >
                  {" "}
                  <MdDeleteOutline size={26} />{" "}
                </button>
              </div>
            )}
          </div>
        </div>
        <img
          src={`${blog?.image?.url}`}
          className="rounded"
        />
        <h2 className=" font-semibold text-base/8">{blog?.summery}</h2>
        <div
          className=" font-semibold text-base/8"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />
      </div>
    </div>
  );
};

export default BlogPage;
