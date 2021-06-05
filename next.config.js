module.exports = {
  images: {
    domains: [
      'images-na.ssl-images-amazon.com',
      'm.media-amazon.com',
      'readwise-assets.s3.amazonaws.com',
    ],
  },
  trailingSlash: true,
  webpack: (config, { isServer, defaultLoaders }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
        child_process: 'empty',
      };
    }

    // fixes error in console -> Module parse failed: Assigning to rvalue
    config.module.rules.push({
      test: /\.(md|mdx)/,
      use: [
        defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
        },
      ],
    });

    return config;
  },
  headers() {
    return [
      {
        source: '/rss.xml',
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
        source: '/api/event/',
        destination: 'https://plausible.io/api/event',
      },
    ];
  },
};
