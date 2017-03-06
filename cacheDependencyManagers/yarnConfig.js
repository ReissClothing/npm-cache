'use strict';

var path = require('path');
var shell = require('shelljs');
var fs = require('fs');
var md5 = require('md5');
var logger = require('../util/logger');
var isUsingYarnLock = null;

/**
 * Returns path to configuration file for yarn.
 * Uses yarn.lock
 *
 * @returns {string}
 */
function getConfigPath() {
  var yarnLockPath = path.resolve(process.cwd(), 'yarn.lock');
  var packageJsonPath = path.resolve(process.cwd(), 'package.json');

  if (isUsingYarnLock === null) {
      if (fs.existsSync(yarnLockPath)) {
          logger.logInfo('[yarn] using yarn.lock instead of package.json');
          isUsingYarnLock = true;
      } else {
          isUsingYarnLock = false;
      }
  }

  return isUsingYarnLock ? yarnLockPath : packageJsonPath;
}

/**
 * @param {string} filePath
 *
 * @returns {string} MD5 Hash
 */
function getConfigHash(filePath) {
  if (isUsingYarnLock) {
      return md5(fs.readFileSync(filePath));
  }

  var config = JSON.parse(fs.readFileSync(filePath));

  return md5(JSON.stringify({
      dependencies: config.dependencies,
      devDependencies: config.devDependencies
  }));
}

/**
 *
 * @returns {string}
 */
function getYarnVersion() {
    return shell.exec('yarn --version', {silent: true}).output.trim();
}

module.exports = {
  cliName: 'yarn',
  getCliVersion: getYarnVersion,
  configPath: getConfigPath(),
  installDirectory: 'node_modules',
  installCommand: 'yarn',
  getFileHash: getConfigHash
};
