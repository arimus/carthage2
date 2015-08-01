// Generated by CoffeeScript 1.9.3
(function() {
  Meteor.startup(function() {
    return Migrations.add({
      version: 4,
      up: function() {
        try {
          ChatMessage._dropIndex('rid_1');
        } catch (_error) {}
        try {
          ChatSubscription._dropIndex('u._id_1');
        } catch (_error) {}
        console.log('Rename rn to name');
        ChatSubscription.update({
          rn: {
            $exists: true
          }
        }, {
          $rename: {
            rn: 'name'
          }
        }, {
          multi: true
        });
        console.log('Adding names to rooms without name');
        ChatRoom.find({
          name: ''
        }).forEach(function(item) {
          var name;
          name = Random.id().toLowerCase();
          ChatRoom.update(item._id, {
            $set: {
              name: name
            }
          });
          return ChatSubscription.update({
            rid: item._id
          }, {
            $set: {
              name: name
            }
          }, {
            multi: true
          });
        });
        console.log('Making room names unique');
        ChatRoom.find().forEach(function(room) {
          return ChatRoom.find({
            name: room.name,
            _id: {
              $ne: room._id
            }
          }).forEach(function(item) {
            var name;
            name = room.name + '-' + Random.id(2).toLowerCase();
            ChatRoom.update(item._id, {
              $set: {
                name: name
              }
            });
            return ChatSubscription.update({
              rid: item._id
            }, {
              $set: {
                name: name
              }
            }, {
              multi: true
            });
          });
        });
        return console.log('End');
      }
    });
  });

}).call(this);