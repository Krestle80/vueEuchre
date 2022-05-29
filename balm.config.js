const config = require('./config/balmrc');
const api = (mix) => {
  if (mix.env.isDev) {
    mix.copy('node_modules/balm-ui/fonts/*', 'app/fonts');
  }
};

module.exports = () => {
  return {
    publicPath: process.env.NODE_ENV === "production" ? "/vueEuchre/" : "/",
    config,
    api
  };
};
