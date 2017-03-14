package-cache
=========

`package-cache` is a command line utility that caches dependencies installed via `yarn`, `npm`, `bower`, `jspm`
and `composer`.

It is useful for build processes that run `[yarn|npm|bower|composer|jspm] install` every time as part of their
build process. Since dependencies don't change often, this often means slower build times. `package-cache`
helps alleviate this problem by caching previously installed dependencies on the build machine. 
`package-cache` can be a drop-in replacement for any build script that runs `[yarn|npm|bower|composer|jspm] install`.

## How it Works
When you run `package-cache install [yarn|npm|bower|jspm|composer]`, it first looks for `package.json`, `bower.json`,
or `composer.json` in the current working directory depending on which dependency manager is requested.
It then calculates the MD5 hash of the configuration file and looks for a filed named 
<MD5 of config.json>.tar.gz in the cache directory ($HOME/.package_cache by default). If the file does not
exist, `package-cache` uses the system's installed dependency manager to install the dependencies. Once the
dependencies are installed, `package-cache` tars the newly downloaded dependencies and stores them in the
cache directory. The next time `package-cache` runs and sees the same config file, it will find the tarball
in the cache directory and untar the dependencies in the current working directory.


## Installation
```
npm install -g package-cache
```

## Usage
```
package-cache install
```

To specify arguments to each dependency manager, add the arguments after listing the dependency manager. 

For example, to install bower components with the `--allow-root` option, and composer with the `--dry-run` option:
```
package-cache install bower --allow-root composer --dry-run
```

## Examples
```bash
package-cache install	# try to install npm, bower, and composer components
package-cache install bower	# install only bower components
package-cache install bower npm	# install bower and npm components
package-cache install bower --allow-root composer --dry-run  # install bower with allow-root, and composer with --dry-run
package-cache install --cacheDirectory /home/cache/  bower   # install components using /home/cache as cache directory
package-cache install --forceRefresh  bower                  # force installing dependencies from package manager without cache
package-cache install --noArchive  npm                       # installs dependencies and caches them without compressing
package-cache install --keep-items=5 yarn                    # installs dependencies and caches while limiting the number of items in cache
package-cache clean	# cleans out all cached files in cache directory
```
