'use strict';

exports.logError = function (errorMessage) {
  console.log('[package-cache] [ERROR] ' + errorMessage);
};

exports.logInfo = function (message) {
  console.log('[package-cache] [INFO] ' + message);
};
