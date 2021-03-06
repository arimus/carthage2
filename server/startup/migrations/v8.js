// Generated by CoffeeScript 1.9.3
(function() {
  Meteor.startup(function() {
    return Migrations.add({
      version: 8,
      up: function() {
        var ref, ref1, ref2, ref3, ref4, ref5, ref6, settings;
        console.log('Load old settings record');
        settings = Settings.findOne({
          _id: 'settings'
        });
        if (settings) {
          if (settings.CDN_PREFIX != null) {
            Settings.insert({
              _id: 'CDN_PREFIX',
              value: settings.CDN_PREFIX,
              type: 'string',
              group: 'General'
            });
          }
          if (((ref = settings.ENV) != null ? ref.MAIL_URL : void 0) != null) {
            Settings.insert({
              _id: 'MAIL_URL',
              value: settings.ENV.MAIL_URL,
              type: 'string',
              group: 'SMTP'
            });
          }
          if (settings.denyUnverifiedEmails != null) {
            Settings.insert({
              _id: 'Accounts_denyUnverifiedEmails',
              value: settings.denyUnverifiedEmails,
              type: 'boolean',
              group: 'Accounts'
            });
          }
          if (((ref1 = settings.kadira) != null ? ref1.appId : void 0) != null) {
            Settings.insert({
              _id: 'KADIRA_APP_ID',
              value: settings.kadira.appId,
              type: 'string',
              group: 'API'
            });
          }
          if (((ref2 = settings.kadira) != null ? ref2.appSecret : void 0) != null) {
            Settings.insert({
              _id: 'KADIRA_APP_SECRET',
              value: settings.kadira.appSecret,
              type: 'string',
              group: 'API'
            });
          }
          if (((ref3 = settings["public"]) != null ? (ref4 = ref3.avatarStore) != null ? ref4.type : void 0 : void 0) != null) {
            Settings.insert({
              _id: 'avatarStore_type',
              value: settings["public"].avatarStore.type,
              type: 'string',
              group: 'API'
            });
          }
          if (((ref5 = settings["public"]) != null ? (ref6 = ref5.avatarStore) != null ? ref6.path : void 0 : void 0) != null) {
            Settings.insert({
              _id: 'avatarStore_path',
              value: settings["public"].avatarStore.path,
              type: 'string',
              group: 'API'
            });
          }
          return Settings.remove({
            _id: 'settings'
          });
        }
      }
    });
  });

}).call(this);
