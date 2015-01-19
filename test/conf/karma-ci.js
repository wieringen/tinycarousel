var ciConfig = require('./karma-common.js');

module.exports = function (config) {
    ciConfig.browsers = [
        'Firefox',
        'Chrome'
        //'IE9 - Win7',
        //'IE10 - Win7',
        //'IE11 - Win7'
    ];
    ciConfig.singleRun = true;
    ciConfig.reporters.push('junit');
    ciConfig.junitReporter = {
        outputFile: 'dist/reports/test-report.xml'
    };
    ciConfig.coverageReporter.type = 'cobertura';
    ciConfig.logLevel = config.LOG_INFO;
    config.set(ciConfig);
};