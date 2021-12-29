import fs from 'fs';
import path from 'path';
import { hackletterPosts } from './utils';

const HL_CACHE_PATH = path.resolve('.hl-rss');

export default async function getHLPostsFromRSS() {
  let cachedData;

  try {
    cachedData = JSON.parse(fs.readFileSync(path.join(__dirname, HL_CACHE_PATH), 'utf8'));
  } catch (error) {
    console.log('HL cache not initialized');
  }

  if (!cachedData) {
    const data = await hackletterPosts();

    try {
      fs.writeFileSync(path.join(__dirname, HL_CACHE_PATH), JSON.stringify(data), 'utf8');
      console.log('Wrote to HL cache');
    } catch (error) {
      console.log('ERROR WRITING HL CACHE TO FILE');
      console.log(error);
    }

    cachedData = data;
  }

  return cachedData;
}
