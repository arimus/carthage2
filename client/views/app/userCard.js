// Generated by CoffeeScript 1.9.3
(function() {
  Template.userCard.helpers({
    userData: function() {
      var userData, username;
      username = Session.get('userProfileActive');
      userData = {
        username: username
      };
      return userData;
    },
    canManageRoom: function() {
      var ref, roomData;
      if (FlowRouter.getParam('_id') == null) {
        return false;
      }
      roomData = Session.get('roomData' + FlowRouter.getParam('_id'));
      if (roomData == null) {
        return false;
      }
      return ((ref = roomData.u) != null ? ref._id : void 0) === Meteor.userId() && !Session.equals('userProfileActive', Meteor.user().username);
    }
  });

  Template.userCard.events({
    'click .private-chat': function(event) {
      return Meteor.call('createDirectMessage', Session.get('userProfileActive'), function(error, result) {
        if (error) {
          return Errors["throw"](error.reason);
        }
        if (result.rid != null) {
          return FlowRouter.go('room', {
            _id: result.rid
          });
        }
      });
    },
    'click .remove-user': function(event) {
      return Meteor.call('removeUserFromRoom', {
        rid: FlowRouter.getParam('_id'),
        username: Session.get('userProfileActive')
      }, function(error, result) {
        if (error) {
          return Errors["throw"](error.reason);
        }
      });
    }
  });

}).call(this);
