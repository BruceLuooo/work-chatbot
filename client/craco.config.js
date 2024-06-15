module.exports = {
  plugins: [
    {
      plugin: require("craco-plugin-scoped-css"),
    },
  ],
  devServer: {
    allowedHosts: 'all',
  },
};
