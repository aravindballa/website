import { glob } from 'glob';
import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), 'content/writings');
export const HACKLETTER_PATH = path.join(process.cwd(), 'content/hackletter');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = () => glob.sync('**/*.{md,mdx}', { cwd: POSTS_PATH });

export const hlFilePaths = () => glob.sync('*.{md,mdx}', { cwd: HACKLETTER_PATH });
