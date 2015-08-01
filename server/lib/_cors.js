// Generated by CoffeeScript 1.9.3
(function() {
  var _staticFilesMiddleware;

  WebApp.rawConnectHandlers.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("X-Rocket-Chat-Version", VERSION);
    return next();
  });

  _staticFilesMiddleware = WebAppInternals.staticFilesMiddleware;

  WebAppInternals._staticFilesMiddleware = function(staticFiles, req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("X-Rocket-Chat-Version", VERSION);
    return _staticFilesMiddleware(staticFiles, req, res, next);
  };

}).call(this);
