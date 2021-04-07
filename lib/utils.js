import { glob } from "glob";
import path from "path";

export const POSTS_PATH = path.join(process.cwd(), "content/writings");

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = () =>
  glob.sync("**/*.{md,mdx}", { cwd: POSTS_PATH });
