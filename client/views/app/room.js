// Generated by CoffeeScript 1.9.3
(function() {
  var renameRoom, toggleAddUser;

  Template.room.helpers({
    visible: function() {
      if (window.rocketDebug) {
        console.log('room.helpers visible');
      }
      if (this._id === Session.get('openedRoom')) {
        return 'visible';
      }
    },
    tAddUsers: function() {
      if (window.rocketDebug) {
        console.log('room.helpers tAddUsers');
      }
      return t('Add_users');
    },
    tQuickSearch: function() {
      if (window.rocketDebug) {
        console.log('room.helpers tQuickSearch');
      }
      return t('Quick_Search');
    },
    favorite: function() {
      var sub;
      if (window.rocketDebug) {
        console.log('room.helpers favorite');
      }
      sub = ChatSubscription.findOne({
        rid: this._id
      }, {
        fields: {
          f: 1
        }
      });
      if (((sub != null ? sub.f : void 0) != null) && sub.f) {
        return 'icon-star favorite-room';
      }
      return 'icon-star-empty';
    },
    subscribed: function() {
      if (window.rocketDebug) {
        console.log('room.helpers subscribed');
      }
      return ChatSubscription.find({
        rid: this._id
      }).count() > 0;
    },
    messagesHistory: function() {
      if (window.rocketDebug) {
        console.log('room.helpers messagesHistory');
      }
      return ChatMessageHistory.find({
        rid: this._id,
        t: {
          '$ne': 't'
        }
      }, {
        sort: {
          ts: 1
        }
      });
    },
    hasMore: function() {
      if (window.rocketDebug) {
        console.log('room.helpers hasMore');
      }
      return RoomHistoryManager.hasMore(this._id);
    },
    isLoading: function() {
      if (window.rocketDebug) {
        console.log('room.helpers isLoading');
      }
      if (RoomHistoryManager.isLoading(this._id)) {
        return 'btn-loading';
      }
    },
    windowId: function() {
      if (window.rocketDebug) {
        console.log('room.helpers windowId');
      }
      return "chat-window-" + this._id;
    },
    usersTyping: function() {
      var last, usernames, users;
      if (window.rocketDebug) {
        console.log('room.helpers usersTyping');
      }
      users = MsgTyping.get(this._id);
      if (users.length === 0) {
        return;
      }
      if (users.length === 1) {
        return {
          multi: false,
          selfTyping: MsgTyping.selfTyping.get(),
          users: users[0]
        };
      }
      last = users.pop();
      if (users.length > 4) {
        last = t('others');
      }
      usernames = users.join(', ');
      usernames = [usernames, last];
      return {
        multi: true,
        selfTyping: MsgTyping.selfTyping.get(),
        users: usernames.join(" " + (t('and')) + " ")
      };
    },
    roomName: function() {
      var ref, roomData;
      if (window.rocketDebug) {
        console.log('room.helpers roomName');
      }
      roomData = Session.get('roomData' + this._id);
      if (!roomData) {
        return '';
      }
      if (roomData.t === 'd') {
        return (ref = ChatSubscription.findOne({
          rid: this._id
        }, {
          fields: {
            name: 1
          }
        })) != null ? ref.name : void 0;
      } else {
        return roomData.name;
      }
    },
    roomIcon: function() {
      var roomData;
      if (window.rocketDebug) {
        console.log('room.helpers roomIcon');
      }
      roomData = Session.get('roomData' + this._id);
      if (!(roomData != null ? roomData.t : void 0)) {
        return '';
      }
      switch (roomData.t) {
        case 'd':
          return 'icon-at';
        case 'c':
          return 'icon-hash';
        case 'p':
          return 'icon-lock';
      }
    },
    userData: function() {
      var roomData, userData, username;
      if (window.rocketDebug) {
        console.log('room.helpers userData');
      }
      roomData = Session.get('roomData' + this._id);
      if (!roomData) {
        return {};
      }
      if (roomData.t === 'd') {
        username = _.without(roomData.usernames, Meteor.user().username);
        UserManager.addUser(username);
        userData = {
          name: Session.get('user_' + username + '_name'),
          emails: Session.get('user_' + username + '_emails') || [],
          phone: Session.get('user_' + username + '_phone'),
          username: String(username)
        };
        return userData;
      }
    },
    userStatus: function() {
      var roomData, username;
      if (window.rocketDebug) {
        console.log('room.helpers userStatus');
      }
      roomData = Session.get('roomData' + this._id);
      if (!roomData) {
        return {};
      }
      if (roomData.t === 'd') {
        username = _.without(roomData.usernames, Meteor.user().username);
        return Session.get('user_' + username + '_status') || 'offline';
      } else {
        return 'offline';
      }
    },
    autocompleteSettingsAddUser: function() {
      if (window.rocketDebug) {
        console.log('room.helpers autocompleteSettingsAddUser');
      }
      return {
        limit: 10,
        rules: [
          {
            collection: 'UserAndRoom',
            subscription: 'roomSearch',
            field: 'name',
            template: Template.roomSearch,
            noMatchTemplate: Template.roomSearchEmpty,
            matchAll: true,
            filter: {
              type: 'u',
              uid: {
                $ne: Meteor.userId()
              }
            },
            sort: 'name'
          }
        ]
      };
    },
    autocompleteSettingsRoomSearch: function() {
      if (window.rocketDebug) {
        console.log('room.helpers autocompleteSettingsRoomSearch');
      }
      return {
        limit: 10,
        rules: [
          {
            collection: 'UserAndRoom',
            subscription: 'roomSearch',
            field: 'name',
            template: Template.roomSearch,
            noMatchTemplate: Template.roomSearchEmpty,
            matchAll: true,
            filter: {
              uid: {
                $ne: Meteor.userId()
              }
            },
            sort: 'name'
          }
        ]
      };
    },
    isChannel: function() {
      var roomData;
      if (window.rocketDebug) {
        console.log('room.helpers isChannel');
      }
      roomData = Session.get('roomData' + this._id);
      if (!roomData) {
        return '';
      }
      return roomData.t === 'c';
    },
    canAddUser: function() {
      var ref, ref1, roomData;
      if (window.rocketDebug) {
        console.log('room.helpers canAddUser');
      }
      roomData = Session.get('roomData' + this._id);
      if (!roomData) {
        return '';
      }
      return ((ref = roomData.t) === 'p' || ref === 'c') && ((ref1 = roomData.u) != null ? ref1._id : void 0) === Meteor.userId();
    },
    canEditName: function() {
      var ref, ref1, roomData;
      if (window.rocketDebug) {
        console.log('room.helpers canEditName');
      }
      roomData = Session.get('roomData' + this._id);
      if (!roomData) {
        return '';
      }
      return ((ref = roomData.u) != null ? ref._id : void 0) === Meteor.userId() && ((ref1 = roomData.t) === 'c' || ref1 === 'p');
    },
    roomNameEdit: function() {
      var ref;
      if (window.rocketDebug) {
        console.log('room.helpers roomNameEdit');
      }
      return (ref = Session.get('roomData' + this._id)) != null ? ref.name : void 0;
    },
    editingTitle: function() {
      if (window.rocketDebug) {
        console.log('room.helpers editingTitle');
      }
      if (Session.get('editRoomTitle')) {
        return 'hidden';
      }
    },
    showEditingTitle: function() {
      if (window.rocketDebug) {
        console.log('room.helpers showEditingTitle');
      }
      if (!Session.get('editRoomTitle')) {
        return 'hidden';
      }
    },
    flexOpened: function() {
      if (window.rocketDebug) {
        console.log('room.helpers flexOpened');
      }
      if (Session.equals('flexOpened', true)) {
        return 'opened';
      }
    },
    arrowPosition: function() {
      if (window.rocketDebug) {
        console.log('room.helpers arrowPosition');
      }
      if (!Session.equals('flexOpened', true)) {
        return 'left';
      }
    },
    phoneNumber: function() {
      if (window.rocketDebug) {
        console.log('room.helpers phoneNumber');
      }
      if (!this.phoneNumber) {
        return '';
      }
      if (this.phoneNumber.length > 10) {
        return "(" + (this.phoneNumber.substr(0, 2)) + ") " + (this.phoneNumber.substr(2, 5)) + "-" + (this.phoneNumber.substr(7));
      } else {
        return "(" + (this.phoneNumber.substr(0, 2)) + ") " + (this.phoneNumber.substr(2, 4)) + "-" + (this.phoneNumber.substr(6));
      }
    },
    isGroupChat: function() {
      var ref, room;
      if (window.rocketDebug) {
        console.log('room.helpers isGroupChat');
      }
      room = ChatRoom.findOne(this._id, {
        reactive: false
      });
      return (ref = room != null ? room.t : void 0) === 'c' || ref === 'p';
    },
    userActiveByUsername: function(username) {
      var status;
      if (window.rocketDebug) {
        console.log('room.helpers userActiveByUsername');
      }
      status = Session.get('user_' + username + '_status');
      if (status === 'online' || status === 'away' || status === 'busy') {
        return {
          username: username,
          status: status
        };
      }
    },
    roomUsers: function() {
      var ret, room;
      if (window.rocketDebug) {
        console.log('room.helpers roomUsers');
      }
      room = ChatRoom.findOne(this._id, {
        reactive: false
      });
      ret = {
        _id: this._id,
        total: room != null ? room.usernames.length : void 0,
        totalOnline: 0,
        users: room.usernames
      };
      return ret;
    },
    flexUserInfo: function() {
      var userData, username;
      if (window.rocketDebug) {
        console.log('room.helpers flexUserInfo');
      }
      username = Session.get('showUserInfo');
      userData = {
        username: String(username)
      };
      return userData;
    },
    seeAll: function() {
      if (window.rocketDebug) {
        console.log('room.helpers seeAll');
      }
      if (Template.instance().showUsersOffline.get()) {
        return t('See_only_online');
      } else {
        return t('See_all');
      }
    },
    getPupupConfig: function() {
      var template;
      if (window.rocketDebug) {
        console.log('room.helpers getPupupConfig');
      }
      template = Template.instance();
      return {
        getInput: function() {
          return template.find('.input-message');
        }
      };
    },
    remoteVideoUrl: function() {
      return Session.get('remoteVideoUrl');
    },
    selfVideoUrl: function() {
      return Session.get('selfVideoUrl');
    },
    flexOpenedRTC1: function() {
      if (window.rocketDebug) {
        console.log('room.helpers flexOpenedRTC1');
      }
      if (Session.equals('flexOpenedRTC1', true)) {
        return 'layout1';
      }
    },
    flexOpenedRTC2: function() {
      if (window.rocketDebug) {
        console.log('room.helpers flexOpenedRTC2');
      }
      if (Session.equals('flexOpenedRTC2', true)) {
        return 'layout2';
      }
    },
    rtcLayout1: function() {
      var ref;
      return (ref = Session.get('rtcLayoutmode') === 1) != null ? ref : {
        "true": false
      };
    },
    rtcLayout2: function() {
      var ref;
      return (ref = Session.get('rtcLayoutmode') === 2) != null ? ref : {
        "true": false
      };
    },
    rtcLayout3: function() {
      var ref;
      return (ref = Session.get('rtcLayoutmode') === 3) != null ? ref : {
        "true": false
      };
    },
    noRtcLayout: function() {
      var ref;
      return (ref = !Session.get('rtcLayoutmode') || (Session.get('rtcLayoutmode') === 0)) != null ? ref : {
        "true": false
      };
    }
  });

  Template.room.events({
    "click .flex-tab .more": function(event) {
      if (window.rocketDebug) {
        console.log('room click .flex-tab .more');
      }
      if (Session.get('flexOpened')) {
        Session.set('rtcLayoutmode', 0);
        return Session.set('flexOpened', false);
      } else {
        return Session.set('flexOpened', true);
      }
    },
    "click .flex-tab  .video-remote": function(e) {
      var t;
      if (window.rocketDebug) {
        console.log('room click .flex-tab .video-remote');
      }
      if (Session.get('flexOpened')) {
        if (!Session.get('rtcLayoutmode')) {
          return Session.set('rtcLayoutmode', 1);
        } else {
          t = Session.get('rtcLayoutmode');
          t = (t + 1) % 4;
          if (window.rocketDebug) {
            console.log('setting rtcLayoutmode to ' + t);
          }
          return Session.set('rtcLayoutmode', t);
        }
      }
    },
    "click .flex-tab  .video-self": function(e) {
      var i;
      if (window.rocketDebug) {
        console.log('room click .flex-tab .video-self');
      }
      if (Session.get('rtcLayoutmode') === 3) {
        if (window.rocketDebug) {
          console.log('video-self clicked in layout3');
        }
        i = document.getElementById("fullscreendiv");
        if (i.requestFullscreen) {
          return i.requestFullscreen();
        } else {
          if (i.webkitRequestFullscreen) {
            return i.webkitRequestFullscreen();
          } else {
            if (i.mozRequestFullScreen) {
              return i.mozRequestFullScreen();
            } else {
              if (i.msRequestFullscreen) {
                return i.msRequestFullscreen();
              }
            }
          }
        }
      }
    },
    'click .chat-new-messages': function(event) {
      if (window.rocketDebug) {
        console.log('room click .chat-new-messages');
      }
      return $('#chat-window-' + FlowRouter.getParam('_id') + ' .input-message').focus();
    },
    'click .toggle-favorite': function(event) {
      if (window.rocketDebug) {
        console.log('room click .toggle-favorite');
      }
      event.stopPropagation();
      event.preventDefault();
      return Meteor.call('toogleFavorite', FlowRouter.getParam('_id'), !$('i', event.currentTarget).hasClass('favorite-room'));
    },
    'click .join': function(event) {
      if (window.rocketDebug) {
        console.log('room click .join');
      }
      event.stopPropagation();
      event.preventDefault();
      return Meteor.call('joinRoom', FlowRouter.getParam('_id'));
    },
    "click .burger": function() {
      var chatContainer;
      if (window.rocketDebug) {
        console.log('room click .burger');
      }
      chatContainer = $("#rocket-chat");
      if (chatContainer.hasClass("menu-closed")) {
        return chatContainer.removeClass("menu-closed").addClass("menu-opened");
      } else {
        return chatContainer.addClass("menu-closed").removeClass("menu-opened");
      }
    },
    'focus .input-message': function(event) {
      if (window.rocketDebug) {
        console.log('room focus .input-message');
      }
      return KonchatNotification.removeRoomNotification(FlowRouter.getParam('_id'));
    },
    'keyup .input-message': function(event) {
      if (window.rocketDebug) {
        console.log('room keyup .input-message', FlowRouter.getParam('_id'));
      }
      return ChatMessages.keyup(FlowRouter.getParam('_id'), event, Template.instance());
    },
    'keydown .input-message': function(event) {
      if (window.rocketDebug) {
        console.log('room keydown .input-message', FlowRouter.getParam('_id'));
      }
      return ChatMessages.keydown(FlowRouter.getParam('_id'), event, Template.instance());
    },
    'click .message-form .icon-paper-plane': function(event) {
      var input;
      if (window.rocketDebug) {
        console.log('room click .message-form .icon-paper-plane');
      }
      input = $(event.currentTarget).siblings("textarea");
      return ChatMessages.send(FlowRouter.getParam('_id'), input.get(0));
    },
    'click .add-user': function(event) {
      if (window.rocketDebug) {
        console.log('room click click .add-user');
      }
      return toggleAddUser();
    },
    'click .edit-room-title': function(event) {
      if (window.rocketDebug) {
        console.log('room click .edit-room-title');
      }
      event.preventDefault();
      Session.set('editRoomTitle', true);
      $(".fixed-title").addClass("visible");
      return Meteor.setTimeout(function() {
        return $('#room-title-field').focus().select();
      }, 10);
    },
    'keydown #user-add-search': function(event) {
      if (window.rocketDebug) {
        console.log('room keydown #user-add-search');
      }
      if (event.keyCode === 27) {
        return toggleAddUser();
      }
    },
    'keydown #room-title-field': function(event) {
      if (window.rocketDebug) {
        console.log('room keydown #room-title-field');
      }
      if (event.keyCode === 27) {
        return Session.set('editRoomTitle', false);
      } else if (event.keyCode === 13) {
        return renameRoom(FlowRouter.getParam('_id'), $(event.currentTarget).val());
      }
    },
    'blur #room-title-field': function(event) {
      if (window.rocketDebug) {
        console.log('room blur #room-title-field');
      }
      Session.set('editRoomTitle', false);
      return $(".fixed-title").removeClass("visible");
    },
    "click .flex-tab .user-image > a": function(e) {
      if (window.rocketDebug) {
        console.log('room click .flex-tab .user-image > a');
      }
      Session.set('flexOpened', true);
      return Session.set('showUserInfo', $(e.currentTarget).data('username'));
    },
    'click .user-card-message': function(e) {
      var ref, roomData;
      if (window.rocketDebug) {
        console.log('room click .user-card-message');
      }
      roomData = Session.get('roomData' + this._arguments[1].rid);
      if ((ref = roomData.t) === 'c' || ref === 'p') {
        Session.set('flexOpened', true);
        return Session.set('showUserInfo', $(e.currentTarget).data('username'));
      } else {
        return Session.set('flexOpened', true);
      }
    },
    'click .user-view nav .back': function(e) {
      if (window.rocketDebug) {
        console.log('room click .user-view nav .back');
      }
      return Session.set('showUserInfo', null);
    },
    'click .user-view nav .pvt-msg': function(e) {
      if (window.rocketDebug) {
        console.log('room click .user-view nav .pvt-msg');
      }
      return Meteor.call('createDirectMessage', Session.get('showUserInfo'), function(error, result) {
        if (error) {
          return Errors["throw"](error.reason);
        }
        if ((result != null ? result.rid : void 0) != null) {
          return FlowRouter.go('room', {
            _id: result.rid
          });
        }
      });
    },
    'click button.load-more': function(e) {
      if (window.rocketDebug) {
        console.log('room click button.load-more');
      }
      return RoomHistoryManager.getMore(FlowRouter.getParam('_id'));
    },
    'autocompleteselect #user-add-search': function(event, template, doc) {
      var ref, roomData;
      if (window.rocketDebug) {
        console.log('room autocompleteselect #user-add-search');
      }
      roomData = Session.get('roomData' + Session.get('openedRoom'));
      if (roomData.t === 'd') {
        return Meteor.call('createGroupRoom', roomData.usernames, doc.username, function(error, result) {
          if (error) {
            return Errors["throw"](error.reason);
          }
          if ((result != null ? result.rid : void 0) != null) {
            return $('#user-add-search').val('');
          }
        });
      } else if ((ref = roomData.t) === 'c' || ref === 'p') {
        return Meteor.call('addUserToRoom', {
          rid: roomData._id,
          username: doc.username
        }, function(error, result) {
          if (error) {
            return Errors["throw"](error.reason);
          }
          $('#user-add-search').val('');
          return toggleAddUser();
        });
      }
    },
    'autocompleteselect #room-search': function(event, template, doc) {
      if (window.rocketDebug) {
        console.log('room autocompleteselect #room-search');
      }
      if (doc.type === 'u') {
        return Meteor.call('createDirectMessage', doc.uid, function(error, result) {
          if (error) {
            return Errors["throw"](error.reason);
          }
          if ((result != null ? result.rid : void 0) != null) {
            FlowRouter.go('room', {
              _id: result.rid
            });
            return $('#room-search').val('');
          }
        });
      } else {
        FlowRouter.go('room', {
          _id: doc.rid
        });
        return $('#room-search').val('');
      }
    },
    'click .new-message': function(e) {
      if (window.rocketDebug) {
        console.log('room click .new-message');
      }
      Template.instance().atBottom = true;
      return Template.instance().find('.input-message').focus();
    },
    'click .see-all': function(e, instance) {
      if (window.rocketDebug) {
        console.log('room click .see-all');
      }
      return instance.showUsersOffline.set(!instance.showUsersOffline.get());
    },
    "mousedown .edit-message": function(e) {
      return ChatMessages.edit(e.currentTarget.parentNode.parentNode);
    },
    "click .mention-link": function(e) {
      Session.set('flexOpened', true);
      return Session.set('showUserInfo', $(e.currentTarget).data('username'));
    },
    'click .delete-message': function(event) {
      var msg;
      msg = event.currentTarget.parentNode.parentNode;
      if (msg.classList.contains("system")) {
        return;
      }
      return swal({
        title: t('Are_you_sure'),
        text: t('You_will_not_be_able_to_recover'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: t('Yes_delete_it'),
        cancelButtonText: t('Cancel'),
        closeOnConfirm: false,
        html: false
      }, function() {
        swal(t('Deleted'), t('Your_entry_has_been_deleted'), 'success');
        return ChatMessages.deleteMsg(msg);
      });
    },
    'click .start-video': function(event) {
      webrtc.to = FlowRouter.getParam('_id').replace(Meteor.userId(), '');
      webrtc.room = FlowRouter.getParam('_id');
      return webrtc.start(true);
    },
    'click .stop-video': function(event) {
      return webrtc.stop();
    },
    'dragenter #dropzone': function(e) {
      return console.log('DRAG ENTER');
    },
    'dragleave #dropzone': function(e) {
      return console.log('DRAG OUT');
    },
    'dropped #dropzone': function(e) {
      var ref;
      if (window.rocketDebug) {
        console.log('room dropped #dropzone');
      }
      return typeof FS !== "undefined" && FS !== null ? (ref = FS.Utility) != null ? ref.eachFile(e, function(file) {
        var newFile;
        newFile = new FS.File(file);
        newFile.rid = Session.get('openedRoom');
        return Files.insert(newFile, function(error, fileObj) {
          if (!error) {
            toastr.success('Upload succeeded!');
            if (window.rocketDebug) {
              console.log('room fileObj', fileObj);
            }
            return Meteor.call('sendMessage', {
              _id: Random.id(),
              rid: fileObj.rid,
              msg: 'File Uploaded: *' + fileObj.original.name + '* \n' + document.location.origin + '/cfs/files/Files/' + fileObj._id,
              file: {
                _id: fileObj._id
              }
            });
          }
        });
      }) : void 0 : void 0;
    }
  });

  Template.room.onCreated(function() {
    if (window.rocketDebug) {
      console.log('room.onCreated');
    }
    this.showUsersOffline = new ReactiveVar(false);
    return this.atBottom = true;
  });

  Template.room.onRendered(function() {
    var newMessage, onscroll, template, wrapper;
    if (window.rocketDebug) {
      console.log('room.onRendered');
    }
    FlexTab.check();
    ChatMessages.init();
    wrapper = this.find('.wrapper');
    newMessage = this.find(".new-message");
    template = this;
    onscroll = function() {
      return template.atBottom = wrapper.scrollTop === wrapper.scrollHeight - wrapper.clientHeight;
    };
    Meteor.setInterval(function() {
      if (template.atBottom) {
        wrapper.scrollTop = wrapper.scrollHeight - wrapper.clientHeight;
        return newMessage.className = "new-message not";
      }
    }, 100);
    wrapper.addEventListener('mousewheel', function() {
      template.atBottom = false;
      return onscroll();
    });
    wrapper.addEventListener('wheel', function() {
      template.atBottom = false;
      return onscroll();
    });
    if (window.rocketDebug) {
      console.log('room.rendered');
    }
    $.data(this.firstNode, 'renderedAt', new Date);
    webrtc.onRemoteUrl = function(url) {
      Session.set('flexOpened', true);
      return Session.set('remoteVideoUrl', url);
    };
    webrtc.onSelfUrl = function(url) {
      Session.set('flexOpened', true);
      return Session.set('selfVideoUrl', url);
    };
    return RoomHistoryManager.getMoreIfIsEmpty(this.data._id);
  });

  renameRoom = function(rid, name) {
    if (window.rocketDebug) {
      console.log('room renameRoom');
    }
    if (Session.get('roomData' + rid).name === name) {
      Session.set('editRoomTitle', false);
      return false;
    }
    return Meteor.call('saveRoomName', rid, name, function(error, result) {
      if (result) {
        Session.set('editRoomTitle', false);
        toastr.success(t('Room_name_changed_successfully'));
      }
      if (error) {
        return toastr.error(error.reason);
      }
    });
  };

  toggleAddUser = function() {
    var btn;
    if (window.rocketDebug) {
      console.log('room toggleAddUser');
    }
    btn = $('.add-user');
    $('.add-user-search').toggleClass('show-search');
    if ($('i', btn).hasClass('icon-plus')) {
      $('#user-add-search').focus();
      return $('i', btn).removeClass('icon-plus').addClass('icon-cancel');
    } else {
      $('#user-add-search').val('');
      return $('i', btn).removeClass('icon-cancel').addClass('icon-plus');
    }
  };

}).call(this);
