module.exports = {
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
};
