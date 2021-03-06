// Generated by CoffeeScript 1.9.3
(function() {
  Meteor.methods({
    createPrivateGroup: function(name, members) {
      var i, len, me, member, now, rid, subscription, username;
      if (!Meteor.userId()) {
        throw new Meteor.Error('invalid-user', "[methods] createPrivateGroup -> Invalid user");
      }
      console.log('[methods] createPrivateGroup -> '.green, 'userId:', Meteor.userId(), 'arguments:', arguments);
      if (!/^[0-9a-z-_]+$/i.test(name)) {
        throw new Meteor.Error('name-invalid');
      }
      now = new Date();
      me = Meteor.user();
      members.push(me.username);
      name = s.slugify(name);
      if (ChatRoom.findOne({
        name: name
      })) {
        throw new Meteor.Error('duplicate-name');
      }
      rid = ChatRoom.insert({
        usernames: members,
        ts: now,
        t: 'p',
        u: {
          _id: me._id,
          username: me.username
        },
        name: name,
        msgs: 0
      });
      for (i = 0, len = members.length; i < len; i++) {
        username = members[i];
        member = Meteor.users.findOne({
          username: username
        }, {
          fields: {
            username: 1
          }
        });
        if (member == null) {
          continue;
        }
        subscription = {
          rid: rid,
          ts: now,
          name: name,
          t: 'p',
          open: true,
          u: {
            _id: member._id,
            username: member.username
          }
        };
        if (username === me.username) {
          subscription.ls = now;
        } else {
          subscription.alert = true;
        }
        ChatSubscription.insert(subscription);
      }
      return {
        rid: rid
      };
    }
  });

}).call(this);
