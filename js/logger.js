var dummyLogger = (function() {
  var logLevels = ["trace", "debug", "info", "warn"];

  var errorLevels = ["error", "fatal"];

  function Logger() {}

  for (var i = 0; i < logLevels.length; ++i) {
    var level = logLevels[i];

    (function(level) {
      Logger.prototype[level] = function() {};
    })(level);
  }

  for (var i = 0; i < errorLevels.length; ++i) {
    var level = errorLevels[i];

    (function(level) {
      Logger.prototype[level] = function() {
        console.error(arguments);
      };
    })(level);
  }

  return new Logger();
})();

// Set default as dummy logger
window.logger = dummyLogger;
