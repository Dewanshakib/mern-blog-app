import cloudinary from "cloudinary";
import { Blog } from "../models/blog.model.js";
import { generateUrl } from "../utils/generateUrl.js";

// create blog
export const createBlog = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Please upload an image" });
  }

  const image = generateUrl(file);

  const cloud = await cloudinary.v2.uploader.upload(image.content);

  const { title, summery, content } = req.body;

  if (!title || !summery || !content) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  if (!req.user) {
    return res
      .status(401)
      .json({ message: "To create a blog, you need to be logged in" });
  }

  try {
    const blog = await Blog.create({
      title,
      summery,
      content,
      image: {
        _id: cloud.public_id,
        url: cloud.secure_url,
      },
      author: req.user._id,
    });

    return res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    return res.status(500).json({ message: "Error creating blog" });
  }
};

// get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate({
        path: "author",
        select: "-password",
      })
      .sort({ createdAt: "desc" })
      .limit(20);
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching blogs" });
  }
};

// get blog by id
export const getBlogById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Please provide a valid id" });
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  try {
    const blogData = await Blog.findById(id).populate({
      path: "author",
      select: "-password",
    });
    return res.status(200).json(blogData);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching blog" });
  }
};

// edit blog
export const editBlog = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Please provide a valid id" });
  }

  const { title, summery, content } = req.body;

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (req.user._id.toString() !== blog.author._id.toString()) {
    return res
      .status(401)
      .json({ message: "You are not authorized to update this blog" });
  }

  const file = req.file;
  if (file) {
    if (blog.image._id) {
      await cloudinary.v2.uploader.destroy(blog.image._id);
    }
  }

  try {
    const newImg = generateUrl(file);

    if (newImg) {
      const cloud = await cloudinary.v2.uploader.upload(newImg.content);

      await Blog.findByIdAndUpdate(id, {
        title: title,
        summery: summery,
        content: content,
        image: {
          _id: cloud.public_id,
          url: cloud.secure_url,
        },
      });
    } else {
       await Blog.findByIdAndUpdate(id, {
        title: title,
        summery: summery,
        content: content,
      });
    }

    return res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error while updating blog" });
  }
};

// delete blog
export const deleteBlog = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "Please provide a valid id" });
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (req.user._id.toString() !== blog.author._id.toString()) {
    return res
      .status(401)
      .json({ message: "You are not authorized to delete this blog" });
  }

  try {
    // deleting from cloudinary
    await cloudinary.v2.uploader.destroy(blog.image._id);

    // then delete everything from db
    await Blog.findByIdAndDelete(id);
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error while deleting blog" });
  }
};
