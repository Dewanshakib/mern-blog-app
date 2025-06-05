import React from "react";
import {formatISO9075} from "date-fns"
import { Link } from "react-router-dom";

const Blogs = ({_id,title,summery,image,author,createdAt}) => {
  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start border border-gray-200 rounded p-2 bg-white">
      <div className=" h-80 w-full">
        <Link to={`blog/${_id}`}>
            <img
        src={`${image.url}`}
        alt="blog-post-cover"
        className="w-full h-full bg-cover rounded"
      />
        </Link>
      </div>
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">
          <Link to={`blog/${_id}`}>
          {title}
          </Link>
        </h1>

        <div className="flex items-center gap-3 text-xs text-gray-600 my-3 font-semibold">
          <h2 className="font-bold text-gray-900">{author.username}</h2>
          <p>{formatISO9075(new Date(createdAt))}</p>
        </div>

        <p className="font-medium text-gray-900 text-sm">
          {summery}
        </p>
      </div>
    </div>
  );
};

export default Blogs;
