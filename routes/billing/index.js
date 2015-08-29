var routes = {
  execute: require('./execute'),
  cancel: require('./cancel')
}

module.exports.routes = routes

module.exports.mount = function (app) {
  routes.execute(app);
  routes.cancel(app);
}
