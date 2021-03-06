// Generated by CoffeeScript 1.9.3
(function() {
  this.UserManager = new ((function() {
    var addUser, dep, init, subscribe, subscribeFn, users;

    function _Class() {}

    users = {};

    dep = new Tracker.Dependency;

    addUser = function(usernames) {
      var i, len, results, username;
      usernames = [].concat(usernames);
      results = [];
      for (i = 0, len = usernames.length; i < len; i++) {
        username = usernames[i];
        if (!users[username]) {
          users[username] = 1;
          results.push(dep.changed());
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    subscribeFn = function() {
      return true;
    };

    subscribe = new DelayedTask(subscribeFn, 100, 1000);

    init = function() {
      return Tracker.autorun(function() {
        dep.depend();
        return subscribe.run();
      });
    };

    _Class.prototype.addUser = addUser;

    _Class.prototype.users = users;

    return _Class;

  })());

}).call(this);
