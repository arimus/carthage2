// Generated by CoffeeScript 1.9.3
(function() {
  Meteor.methods({
    migrateTo: function(version) {
      var user;
      user = Meteor.user();
      if ((user == null) || user.admin !== true) {
        return;
      }
      this.unblock();
      Migrations.migrateTo(version);
      return version;
    },
    getMigrationVersion: function() {
      return Migrations.getVersion();
    }
  });

}).call(this);