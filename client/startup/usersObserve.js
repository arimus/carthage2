// Generated by CoffeeScript 1.9.3
(function() {
  Meteor.startup(function() {
    return Meteor.users.find({}, {
      fields: {
        name: 1,
        username: 1,
        pictures: 1,
        status: 1,
        emails: 1,
        phone: 1,
        services: 1
      }
    }).observe({
      added: function(user) {
        return Session.set('user_' + user.username + '_status', user.status);
      },
      changed: function(user) {
        return Session.set('user_' + user.username + '_status', user.status);
      },
      removed: function(user) {
        return Session.set('user_' + user.username + '_status', null);
      }
    });
  });

}).call(this);
