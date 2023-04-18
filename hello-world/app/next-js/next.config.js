/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: require.resolve("browserify-fs"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      querystring: require.resolve("querystring-es3"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
    };

    return config;
  },
};

module.exports = nextConfig;
