// import applyRateLimit from 'lib/rate-limit';
import { NextRequest } from 'next/server';

const API = 'https://askbrain.balla.dev/api';

export default async function booksBunny(req: NextRequest, res) {
  // try {
  //   await applyRateLimit(req, res);
  // } catch {
  //   return res.status(429).send('Too Many Requests');
  // }

  if (req.method === 'POST') {
    // @ts-ignore
    const query = req.body.query;
    const response = await fetch(`${API}?q=${encodeURI(query)}`);
    const data = await response.json();
  } else {
    res.status(404).send();
  }
}
