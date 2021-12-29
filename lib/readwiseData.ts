import fs from 'fs';
import path from 'path';
import { hackletterPosts } from './utils';

const READWISE_CACHE_PATH = path.resolve('.readwise');

export default async function getReadwiseBooks() {
  let cachedData;

  try {
    cachedData = JSON.parse(fs.readFileSync(path.join(__dirname, READWISE_CACHE_PATH), 'utf8'));
  } catch (error) {
    console.log('READWISE cache not initialized');
  }

  if (!cachedData) {
    const booksResponse = await fetch(`https://readwise.io/api/v2/books/?category=books`, {
      headers: {
        Authorization: `TOKEN ${process.env.READWISE_TOKEN}`,
      },
    });
    const data = await booksResponse.json();

    try {
      fs.writeFileSync(path.join(__dirname, READWISE_CACHE_PATH), JSON.stringify(data), 'utf8');
      console.log('Wrote to READWISE cache');
    } catch (error) {
      console.log('ERROR WRITING READWISE CACHE TO FILE');
      console.log(error);
    }

    cachedData = data;
  }

  return cachedData;
}
