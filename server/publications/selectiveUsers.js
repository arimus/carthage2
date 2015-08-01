// Generated by CoffeeScript 1.9.3
(function() {
  Meteor.publish('selectiveUsers', function(usernames) {
    var cursor, observer, options, query, self;
    if (!this.userId) {
      return this.ready();
    }
    console.log('[publish] selectiveUsers -> '.green, 'userIds:', userIds);
    self = this;
    query = {
      username: {
        $exists: true
      }
    };
    options = {
      fields: {
        name: 1,
        username: 1,
        status: 1
      }
    };
    cursor = Meteor.users.find(query, options);
    observer = cursor.observeChanges({
      added: function(id, record) {
        if (usernames[record.username] != null) {
          return self.added('users', id, record);
        }
      },
      changed: function(id, record) {
        if (usernames[record.username] != null) {
          return self.changed('users', id, record);
        }
      },
      removed: function(id) {
        if (usernames[record.username] != null) {
          return self.removed('users', id);
        }
      }
    });
    this.ready();
    return this.onStop(function() {
      return observer.stop();
    });
  });

}).call(this);
