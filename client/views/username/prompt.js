// Generated by CoffeeScript 1.9.3
(function() {
  Template.usernamePrompt.onCreated(function() {
    var self;
    self = this;
    self.username = new ReactiveVar;
    return Meteor.call('getUsernameSuggestion', function(error, username) {
      self.username.set({
        ready: true,
        username: username
      });
      return Meteor.defer(function() {
        return self.find('input').focus();
      });
    });
  });

  Template.usernamePrompt.helpers({
    username: function() {
      return Template.instance().username.get();
    }
  });

  Template.usernamePrompt.events({
    'submit #login-card': function(event, instance) {
      var button, username, value;
      event.preventDefault();
      username = instance.username.get();
      username.empty = false;
      username.error = false;
      username.invalid = false;
      instance.username.set(username);
      button = $(event.target).find('button.login');
      RocketChat.Button.loading(button);
      value = $("input").val().trim();
      if (value === '') {
        username.empty = true;
        instance.username.set(username);
        RocketChat.Button.reset(button);
        return;
      }
      return Meteor.call('setUsername', value, function(err, result) {
        if (err != null) {
          if (err.error === 'username-invalid') {
            username.invalid = true;
          } else {
            username.error = true;
          }
          username.username = value;
        }
        RocketChat.Button.reset(button);
        return instance.username.set(username);
      });
    }
  });

}).call(this);
