(function() {
  // Set connection type
  if (env.CF_SSL_ENABLED) {
    var connectionPrefix = "https://";
  } else {
    var connectionPrefix = "http://";
  }

  window.serverUrl = connectionPrefix + env.BE_DOMAIN + "/";

  if (env.CF_ANGULAR_PRODUCTION) {
    window.production = true; //set to true to enable angular production mode
  } else {
    window.production = false;
  }

  if (env.CF_PRODUCTION_LOGGING) {
    window.productionLogging = true; //set to true to include user details in logs
    // TODO: ssl

    (function() {
      logger = window.Rollbar;
      window.RollbarLogger = window.Rollbar;

      var LOG_LEVELS = {
        trace: 0,
        debug: 1,
        info: 2,
        warning: 3,
        warn: 3,
        error: 4,
        critical: 5,
        fatal: 5
      };

      try {
        logger.setCurrentLevel = function(level_or_key) {
          var level;

          if (typeof level_or_key === "string") {
            level = LOG_LEVELS[level_or_key];
          } else if (typeof level_or_key === "number") {
            level = level_or_key;
          } else {
            throw "Invalid type for level_or_key";
          }

          this.currentLevel = level;

          return this;
        };

        logger.setCurrentLevel(LOG_LEVELS.info);

        logger.trace = function(msg, cb) {
          this.debug("TRACE -> " + msg, cb);

          return this;
        };

        logger.fatal = function(msg, cb) {
          this.critical(msg, cb);

          return this;
        };

        logger.warn = function() {
          return this.warning.apply(this, arguments);
        };

        for (var level in LOG_LEVELS) {
          setLogAtLevel(level);
        }

        function setLogAtLevel(level) {
          var this_log = logger[level];
          logger[level] = function() {
            var l_val = LOG_LEVELS[level];
            if (this.currentLevel > l_val) {
              return this;
            }

            return this_log.apply(this, arguments);
          };
        }
      } catch (error) {
        window.productionLogging = false;
        logger = dummyLogger;
      }
    })();
  } else if (env.CF_DEV_LOGGING === false) {
    //Development, testing environment
    console.log("Disabled dev logging");

    window.productionLogging = false;

    logger = dummyLogger;
  } else {
    logger = log4javascript.getLogger();

    window.productionLogging = false; //set to true to include user details in logs

    //Add popup logger
    window.popUpAppender = new log4javascript.PopUpAppender();
    window.popUpLayout = new log4javascript.PatternLayout(
      "%d{HH:mm:ss} %-5p - %m%n"
    );
    window.popUpAppender.setLayout(popUpLayout);
    logger.addAppender(popUpAppender);

    //Setup logging to server
    window.logUrl = serverUrl + "log";
    window.ajaxAppender = new log4javascript.AjaxAppender(logUrl);
    logger.addAppender(ajaxAppender);
  }
})();
