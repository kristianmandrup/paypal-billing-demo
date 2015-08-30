var routes = {
  create: require('./create'),
  initiate: require('./initiate')
}

module.exports.routes = routes

module.exports.mount = function (app) {
  module.exports.mount = function (app, actionMap) {
    routes.create(app, actionMap.create);
    routes.initiate(app, actionMap.initiate);
  }
}
