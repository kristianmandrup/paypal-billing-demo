var routes = {
  start: require('./start'),
  cancel: require('./cancel')
}

module.exports.routes = routes

module.exports.mount = function (app, actionMap) {
  routes.start(app, actionMap.start);
  routes.cancel(app, actionMap.cancel);
}
