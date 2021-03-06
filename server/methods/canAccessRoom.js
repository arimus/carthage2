// Generated by CoffeeScript 1.9.3
(function() {
  Meteor.methods({
    canAccessRoom: function(rid, userId) {
      var canAccess, room, user;
      console.log('[methods] canAccessRoom -> '.green, 'userId:', userId, 'rid:', rid);
      user = Meteor.users.findOne(userId, {
        fields: {
          username: 1
        }
      });
      if (!(user != null ? user.username : void 0)) {
        throw new Meteor.Error('not-logged-user', "[methods] canAccessRoom -> User doesn't have enough permissions");
      }
      if (!rid) {
        throw new Meteor.Error('invalid-room', '[methods] canAccessRoom -> Cannot access empty room');
      }
      room = ChatRoom.findOne(rid, {
        fields: {
          usernames: 1,
          t: 1,
          name: 1
        }
      });
      if (room.t === 'c') {
        canAccess = true;
      } else if (room.usernames.indexOf(user.username) !== -1) {
        canAccess = true;
      }
      if (canAccess !== true) {
        return false;
      } else {
        return _.pick(room, ['_id', 't', 'name']);
      }
    }
  });

}).call(this);
