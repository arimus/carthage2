// Generated by CoffeeScript 1.9.3
(function() {
  Meteor.publish('privateHistory', function() {
    if (!this.userId) {
      return this.ready();
    }
    console.log('[publish] privateHistory'.green);
    return ChatRoom.find({
      usernames: Meteor.users.findOne(this.userId).username
    }, {
      fields: {
        t: 1,
        name: 1,
        msgs: 1,
        ts: 1,
        lm: 1,
        cl: 1
      }
    });
  });

}).call(this);