// Generated by CoffeeScript 1.9.3
(function() {
  Accounts.onEmailVerificationLink(function(token, done) {
    return Accounts.verifyEmail(token, function(error) {
      if (error == null) {
        alert(t('Email_verified'));
      }
      return done();
    });
  });

  Accounts.onResetPasswordLink(function(token, done) {
    var newPassword;
    newPassword = prompt(t('New_password'));
    return Accounts.resetPassword(token, newPassword, function(error) {
      if (error != null) {
        console.log(error);
        alert(t('Error_changing_password'));
      } else {
        alert('Password_changed');
      }
      return done();
    });
  });

}).call(this);
