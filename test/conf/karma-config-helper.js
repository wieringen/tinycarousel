module.exports = {
  getBrowsers: function() {
    var browserNames = this.getEnvVar('KARMA_BROWSERS');
    return (browserNames) ? browserNames.split(',') : null;
  },

  getEnvVar: function(envVarName) {
    return process.env[envVarName];
  }
};