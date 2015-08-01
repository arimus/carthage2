// Generated by CoffeeScript 1.9.3
(function() {
  Template.chatRoomItem.helpers({
    alert: function() {
      if ((!FlowRouter.getParam('_id')) || FlowRouter.getParam('_id') !== this.rid) {
        return this.alert;
      }
    },
    unread: function() {
      if ((!FlowRouter.getParam('_id')) || FlowRouter.getParam('_id') !== this.rid) {
        return this.unread;
      }
    },
    isDirectRoom: function() {
      return this.t === 'd';
    },
    userStatus: function() {
      if (this.t === 'd') {
        return 'status-' + Session.get('user_' + this.name + '_status');
      }
      return '';
    },
    name: function() {
      return this.name;
    },
    roomIcon: function() {
      switch (this.t) {
        case 'd':
          return 'icon-at';
        case 'c':
          return 'icon-hash';
        case 'p':
          return 'icon-lock';
      }
    },
    active: function() {
      if ((FlowRouter.getParam('_id') != null) && FlowRouter.getParam('_id') === this.rid) {
        if (this.alert || this.unread > 0) {
          Meteor.call('readMessages', this.rid);
        }
        return 'active';
      }
    },
    canLeave: function() {
      var ref, ref1, roomData;
      roomData = Session.get('roomData' + this.rid);
      if (!roomData) {
        return false;
      }
      if (((roomData.cl != null) && !roomData.cl) || roomData.t === 'd' || (((ref = roomData.usernames) != null ? ref.indexOf(Meteor.user().username) : void 0) !== -1 && ((ref1 = roomData.usernames) != null ? ref1.length : void 0) === 1)) {
        return false;
      } else {
        return true;
      }
    }
  });

  Template.chatRoomItem.rendered = function() {
    if (!((FlowRouter.getParam('_id') != null) && FlowRouter.getParam('_id') === this.data.rid) && !this.data.ls) {
      return KonchatNotification.newRoom(this.data.rid);
    }
  };

  Template.chatRoomItem.events({
    'click .hide-room': function(e) {
      e.stopPropagation();
      e.preventDefault();
      if (FlowRouter.getRouteName() === 'room' && FlowRouter.getParam('_id') === this.rid) {
        FlowRouter.go('index');
      }
      return Meteor.call('hideRoom', this.rid);
    },
    'click .leave-room': function(e) {
      e.stopPropagation();
      e.preventDefault();
      if (FlowRouter.getRouteName() === 'room' && FlowRouter.getParam('_id') === this.rid) {
        FlowRouter.go('index');
      }
      RoomManager.close(this.rid);
      return Meteor.call('leaveRoom', this.rid);
    }
  });

}).call(this);
