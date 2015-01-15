var configHelper = require('./karma-config-helper.js'),
    devConfig = require('./karma-common.js');

module.exports = function (config) {
    devConfig.browsers = configHelper.getBrowsers() || [
      'Firefox'
    ];
    devConfig.singleRun = false;
    devConfig.logLevel = config.LOG_INFO;
    config.set(devConfig);
};