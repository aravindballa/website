const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer({
  images: {
    domains: [
      'images-na.ssl-images-amazon.com',
      'm.media-amazon.com',
      'readwise-assets.s3.amazonaws.com',
      'res.cloudinary.com',
    ],
  },
  trailingSlash: true,
  headers() {
    return [
      {
        source: '/api/rss.xml',
        headers: [
          {
            key: 'content-type',
            value: 'text/xml',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/js/script.js',
        destination: 'https://plausible.io/js/plausible.js',
      },
      {
        source: '/js/script-u.js',
        destination: 'https://analytics.balla.dev/umami.js',
      },
      {
        source: '/api/event/',
        destination: 'https://plausible.io/api/event',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/memos',
        destination: '/writings?filter=memo',
        permanent: true,
      },
    ];
  },
});
