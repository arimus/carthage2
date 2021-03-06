// Generated by CoffeeScript 1.9.3
(function() {
  Template.channels.helpers({
    tRoomMembers: function() {
      return t('Members_placeholder');
    },
    rooms: function() {
      return ChatSubscription.find({
        t: {
          $in: ['c']
        },
        f: {
          $ne: true
        }
      }, {
        sort: {
          't': 1,
          'name': 1
        }
      });
    }
  });

  Template.channels.events({
    'click .add-room': function(e, instance) {
      SideNav.setFlex("createChannelFlex");
      return SideNav.openFlex();
    },
    'click .more-channels': function() {
      SideNav.setFlex("listChannelsFlex");
      return SideNav.openFlex();
    }
  });

}).call(this);
