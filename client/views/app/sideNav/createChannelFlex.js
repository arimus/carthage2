// Generated by CoffeeScript 1.9.3
(function() {
  Template.createChannelFlex.helpers({
    selectedUsers: function() {
      return Template.instance().selectedUsers.get();
    },
    name: function() {
      return Template.instance().selectedUserNames[this.valueOf()];
    },
    error: function() {
      return Template.instance().error.get();
    },
    roomName: function() {
      return Template.instance().roomName.get();
    },
    autocompleteSettings: function() {
      return {
        limit: 10,
        rules: [
          {
            collection: 'UserAndRoom',
            subscription: 'roomSearch',
            field: 'username',
            template: Template.userSearch,
            noMatchTemplate: Template.userSearchEmpty,
            matchAll: true,
            filter: {
              type: 'u',
              $and: [
                {
                  _id: {
                    $ne: Meteor.userId()
                  }
                }, {
                  username: {
                    $nin: Template.instance().selectedUsers.get()
                  }
                }
              ]
            },
            sort: 'username'
          }
        ]
      };
    }
  });

  Template.createChannelFlex.events({
    'autocompleteselect #channel-members': function(event, instance, doc) {
      instance.selectedUsers.set(instance.selectedUsers.get().concat(doc.username));
      instance.selectedUserNames[doc.username] = doc.name;
      event.currentTarget.value = '';
      return event.currentTarget.focus();
    },
    'click .remove-room-member': function(e, instance) {
      var self, users;
      self = this;
      users = Template.instance().selectedUsers.get();
      users = _.reject(Template.instance().selectedUsers.get(), function(_id) {
        return _id === self.valueOf();
      });
      Template.instance().selectedUsers.set(users);
      return $('#channel-members').focus();
    },
    'click header': function(e, instance) {
      return SideNav.closeFlex(function() {
        return instance.clearForm();
      });
    },
    'click .cancel-channel': function(e, instance) {
      return SideNav.closeFlex(function() {
        return instance.clearForm();
      });
    },
    'mouseenter header': function() {
      return SideNav.overArrow();
    },
    'mouseleave header': function() {
      return SideNav.leaveArrow();
    },
    'click footer .all': function() {
      return SideNav.setFlex("listChannelsFlex");
    },
    'keydown input[type="text"]': function(e, instance) {
      return Template.instance().error.set([]);
    },
    'click .save-channel': function(e, instance) {
      var err;
      err = SideNav.validate();
      instance.roomName.set(instance.find('#channel-name').value);
      console.log(err);
      if (!err) {
        return Meteor.call('createChannel', instance.find('#channel-name').value, instance.selectedUsers.get(), function(err, result) {
          if (err) {
            console.log(err);
            if (err.error === 'name-invalid') {
              instance.error.set({
                invalid: true
              });
              return;
            }
            if (err.error === 'duplicate-name') {
              instance.error.set({
                duplicate: true
              });
              return;
            } else {
              return toastr.error(err.reason);
            }
          }
          SideNav.closeFlex(function() {
            return instance.clearForm();
          });
          return FlowRouter.go('room', {
            _id: result.rid
          });
        });
      } else {
        return instance.error.set({
          fields: err
        });
      }
    }
  });

  Template.createChannelFlex.onCreated(function() {
    var instance;
    instance = this;
    instance.selectedUsers = new ReactiveVar([]);
    instance.selectedUserNames = {};
    instance.error = new ReactiveVar([]);
    instance.roomName = new ReactiveVar('');
    return instance.clearForm = function() {
      instance.error.set([]);
      instance.roomName.set('');
      instance.selectedUsers.set([]);
      instance.find('#channel-name').value = '';
      return instance.find('#channel-members').value = '';
    };
  });

}).call(this);