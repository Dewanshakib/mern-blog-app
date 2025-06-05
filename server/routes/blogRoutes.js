import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getAllBlogs,
  getBlogById,
} from "../controllers/blogControllers.js";
import uploadFile from "../middleware/multer.js";
import { authValidate } from "../middleware/auth.js";

const router = Router();
// create blog
router.post("/create", uploadFile, authValidate, createBlog);
// get all blogs
router.get("/all", getAllBlogs);
// get blog by id
router.get("/:id", authValidate, getBlogById);
// edit blog
router.put("/edit/:id", uploadFile, authValidate,editBlog);
// delete blog
router.delete("/delete/:id", authValidate,deleteBlog);

export { router as blogRoutes };
