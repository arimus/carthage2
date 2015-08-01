// Generated by CoffeeScript 1.9.3
(function() {
  Template.settingsFlex.helpers({
    groups: function() {
      return Settings.find({
        type: 'group'
      }).fetch();
    },
    label: function() {
      return TAPi18next.t(this.i18nLabel);
    }
  });

  Template.settingsFlex.events({
    'mouseenter header': function() {
      return SideNav.overArrow();
    },
    'mouseleave header': function() {
      return SideNav.leaveArrow();
    },
    'click header': function() {
      return SideNav.closeFlex();
    },
    'click .cancel-settings': function() {
      return SideNav.closeFlex();
    }
  });

}).call(this);
