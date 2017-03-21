'use strict';

exports.logError = function (errorMessage) {
  var d = new Date();

  console.log(d.toISOString() + ' [package-cache] [ERROR] ' + errorMessage);
};

exports.logInfo = function (message) {
  var d = new Date();

  console.log(d.toISOString() + ' [package-cache] [INFO] ' + message);
};
