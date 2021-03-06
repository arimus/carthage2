// Generated by CoffeeScript 1.9.3
(function() {
  Template.userStatus.helpers({
    myUserInfo: function() {
      var ref, username, visualStatus;
      visualStatus = "online";
      username = (ref = Meteor.user()) != null ? ref.username : void 0;
      switch (Session.get('user_' + username + '_status')) {
        case "away":
          visualStatus = t("away");
          break;
        case "busy":
          visualStatus = t("busy");
          break;
        case "offline":
          visualStatus = t("invisible");
      }
      return {
        name: Session.get('user_' + username + '_name'),
        status: Session.get('user_' + username + '_status'),
        visualStatus: visualStatus,
        _id: Meteor.userId(),
        username: username
      };
    }
  });

  Template.userStatus.events({
    'click .options .status': function(event) {
      event.preventDefault();
      return AccountBox.setStatus(event.currentTarget.dataset.status);
    },
    'click .account-box': function(event) {
      return AccountBox.toggle();
    },
    'click #logout': function(event) {
      var user;
      event.preventDefault();
      user = Meteor.user();
      return Meteor.logout(function() {
        FlowRouter.go('home');
        return Meteor.call('logoutCleanUp', user);
      });
    },
    'click #avatar': function(event) {
      return Meteor.call('resetAvatar');
    },
    'click #settings': function(event) {
      SideNav.setFlex("userSettingsFlex");
      return setTimeout(function() {
        return SideNav.openFlex();
      }, 125);
    }
  });

  Template.userStatus.rendered = function() {
    return AccountBox.init();
  };

}).call(this);
