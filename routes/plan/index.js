var routes = {
  create: require('./create'),
  initiate: require('./initiate')
}

module.exports.routes = routes

module.exports.mount = function (app) {
  routes.create(app);
  routes.initiate(app);
}
