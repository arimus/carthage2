// Generated by CoffeeScript 1.9.3
(function() {
  Meteor.startup(function() {
    return Migrations.add({
      version: 2,
      up: function() {
        return Meteor.users.find({
          avatarOrigin: {
            $exists: false
          },
          username: {
            $exists: true
          }
        }).forEach(function(user) {
          var avatars, contentType, dataURI, image, ref, rs, service, services, ws;
          avatars = getAvatarSuggestionForUser(user);
          services = Object.keys(avatars);
          if (services.length === 0) {
            return;
          }
          service = services[0];
          console.log(user.username, '->', service);
          dataURI = avatars[service].blob;
          ref = RocketChatFile.dataURIParse(dataURI), image = ref.image, contentType = ref.contentType;
          rs = RocketChatFile.bufferToStream(new Buffer(image, 'base64'));
          ws = RocketChatFileAvatarInstance.createWriteStream(user.username + ".jpg", contentType);
          ws.on('end', Meteor.bindEnvironment(function() {
            return Meteor.users.update({
              _id: user._id
            }, {
              $set: {
                avatarOrigin: service
              }
            });
          }));
          return rs.pipe(ws);
        });
      }
    });
  });

}).call(this);