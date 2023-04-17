/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      querystring: require.resolve("querystring-es3"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
    };

    return config;
  },
};

module.exports = nextConfig;
