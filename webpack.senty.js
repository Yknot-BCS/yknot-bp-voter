import * as SentryWebpackPlugin from '@sentry/webpack-plugin';

module.exports = {
  // other webpack configuration
  devtool: 'source-map',
  plugins: [
    new SentryWebpackPlugin({
      // sentry-cli configuration - can also be done directly through sentry-cli
      // see https://docs.sentry.io/product/cli/configuration/ for details
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'yknot-bcs',
      project: 'rec-marketplace-ui',

      // other SentryWebpackPlugin configuration
      include: '.',
      ignore: ['node_modules', 'webpack.config.js']
    })
  ]
};
