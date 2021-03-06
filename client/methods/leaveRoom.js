// Generated by CoffeeScript 1.9.3
(function() {
  Meteor.methods({
    leaveRoom: function(rid) {
      if (!Meteor.userId()) {
        throw new Meteor.Error(203, t('User_logged_out'));
      }
      ChatSubscription.remove({
        rid: rid,
        'u._id': Meteor.userId()
      });
      return ChatRoom.update(rid, {
        $pull: {
          usernames: Meteor.user().username
        }
      });
    }
  });

}).call(this);
