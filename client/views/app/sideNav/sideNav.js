// Generated by CoffeeScript 1.9.3
(function() {
  Template.sideNav.helpers({
    isAdmin: function() {
      var ref;
      return ((ref = Meteor.user()) != null ? ref.admin : void 0) === true;
    },
    flexTemplate: function() {
      return SideNav.getFlex().template;
    },
    flexData: function() {
      return SideNav.getFlex().data;
    }
  });

  Template.sideNav.events({
    'click .close-flex': function() {
      return SideNav.closeFlex();
    },
    'click .arrow': function() {
      return SideNav.toggleCurrent();
    },
    'mouseenter .header': function() {
      return SideNav.overArrow();
    },
    'mouseleave .header': function() {
      return SideNav.leaveArrow();
    },
    'click .open-settings': function() {
      SideNav.setFlex("settingsFlex");
      return SideNav.openFlex();
    }
  });

  Template.sideNav.onRendered(function() {
    return SideNav.init();
  });

}).call(this);
