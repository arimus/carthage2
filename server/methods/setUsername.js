// Generated by CoffeeScript 1.9.3
(function() {
  var slug, usernameIsAvaliable;

  Meteor.methods({
    setUsername: function(username) {
      var user;
      if (!Meteor.userId()) {
        throw new Meteor.Error('invalid-user', "[methods] setUsername -> Invalid user");
      }
      console.log('[methods] setUsername -> '.green, 'userId:', Meteor.userId(), 'arguments:', arguments);
      user = Meteor.user();
      if (user.username != null) {
        throw new Meteor.Error('username-already-setted');
      }
      if (!usernameIsAvaliable(username)) {
        throw new Meteor.Error('username-unavaliable');
      }
      if (!/^[0-9a-zA-Z-_.]+$/.test(username)) {
        throw new Meteor.Error('username-invalid');
      }
      if (user.username == null) {
        ChatRoom.update('GENERAL', {
          $push: {
            usernames: {
              $each: [username],
              $sort: 1
            }
          }
        });
        if (ChatSubscription.findOne({
          rid: 'GENERAL',
          'u._id': user._id
        }) == null) {
          ChatSubscription.insert({
            rid: 'GENERAL',
            name: 'general',
            ts: new Date(),
            t: 'c',
            f: true,
            open: true,
            alert: true,
            unread: 1,
            u: {
              _id: user._id,
              username: username
            }
          });
          ChatMessage.insert({
            rid: 'GENERAL',
            ts: new Date(),
            t: 'uj',
            msg: '',
            u: {
              _id: user._id,
              username: username
            }
          });
        }
      }
      Meteor.users.update({
        _id: user._id
      }, {
        $set: {
          username: username
        }
      });
      return username;
    }
  });

  slug = function(text) {
    text = slugify(text, '.');
    return text.replace(/[^0-9a-z-_.]/g, '');
  };

  usernameIsAvaliable = function(username) {
    if (username.length < 1) {
      return false;
    }
    return !Meteor.users.findOne({
      username: {
        $regex: new RegExp(username, "i")
      }
    });
  };

}).call(this);