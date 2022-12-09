import rateLimit from 'express-rate-limit';

const applyMiddleware = (middleware) => (request, response) =>
  new Promise((resolve, reject) => {
    middleware(request, response, (result) =>
      result instanceof Error ? reject(result) : resolve(result)
    );
  });

const getIP = (request) =>
  request.ip ||
  request.headers['x-forwarded-for'] ||
  request.headers['x-real-ip'] ||
  request.connection.remoteAddress;

export const getRateLimitMiddlewares = ({ limit = 10, windowMs = 60 * 60 * 1000 } = {}) => [
  rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
];

const middlewares = getRateLimitMiddlewares();

async function applyRateLimit(request, response) {
  return Promise.all(
    middlewares.map(applyMiddleware).map((middleware) => middleware(request, response))
  );
}

export default applyRateLimit;
