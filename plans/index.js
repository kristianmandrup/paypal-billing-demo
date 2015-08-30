module.exports = function(config) {
  return {
    premium: require('./premium')(config),
    regular: require('./regular')(config)
  }
}
