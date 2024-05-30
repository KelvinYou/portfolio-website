import blogs from "@/data/blogs";
import { join } from "path";

export const getBlogs = () => {
  return blogs;
}

export const blogsPath = join(process.cwd(), '/src/data/blogs');
