// Generated by CoffeeScript 1.9.3
(function() {
  Meteor.methods({
    toogleFavorite: function(rid, f) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('invalid-user', "[methods] toogleFavorite -> Invalid user");
      }
      console.log('[methods] toogleFavorite -> '.green, 'userId:', Meteor.userId(), 'arguments:', arguments);
      return ChatSubscription.update({
        rid: rid,
        'u._id': Meteor.userId()
      }, {
        $set: {
          f: f
        }
      });
    }
  });

}).call(this);