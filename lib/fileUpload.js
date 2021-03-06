// Generated by CoffeeScript 1.9.3
(function() {
  if (typeof FS !== "undefined" && FS !== null) {
    this.fileStore = new FS.Store.GridFS('files');
    this.Files = new FS.Collection('Files', {
      stores: [fileStore],
      filter: {
        maxSize: 1048576,
        allow: {
          contentTypes: ['image/*']
        },
        onInvalid: function(message) {
          if (Meteor.isClient) {
            toastr.error(message);
          } else {
            console.log(message);
          }
        }
      }
    });
    Files.allow({
      insert: function() {
        return true;
      },
      update: function() {
        return false;
      },
      download: function() {
        return true;
      },
      remove: function() {
        return false;
      }
    });
    Files.deny({
      insert: function() {
        return false;
      },
      update: function() {
        return true;
      },
      remove: function() {
        return true;
      },
      download: function() {
        return false;
      }
    });
  }

}).call(this);
