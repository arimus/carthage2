// Generated by CoffeeScript 1.9.3
(function() {
  Meteor.methods({
    sendConfirmationEmail: function(email) {
      var user;
      user = Meteor.users.findOne({
        'emails.address': email
      });
      if (user != null) {
        Accounts.sendVerificationEmail(user._id, email);
        return true;
      }
      return false;
    }
  });

}).call(this);
