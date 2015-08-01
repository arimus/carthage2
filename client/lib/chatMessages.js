// Generated by CoffeeScript 1.9.3
(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  this.ChatMessages = (function() {
    var bindEvents, clearEditing, deleteMsg, edit, editing, getEditingIndex, init, input, keydown, keyup, resize, self, send, startTyping, stopTyping, toNextMessage, toPrevMessage, update, wrapper;
    self = {};
    wrapper = {};
    input = {};
    editing = {};
    init = function() {
      wrapper = $(".messages-container").find(".wrapper");
      input = $(".input-message").get(0);
      bindEvents();
    };
    resize = function() {
      var dif;
      dif = 60 + $(".messages-container").find("footer").outerHeight();
      return $(".messages-box").css({
        height: "calc(100% - " + dif + "px)"
      });
    };
    toPrevMessage = function() {
      var msgs;
      msgs = wrapper.get(0).querySelectorAll(".own:not(.system)");
      if (msgs.length) {
        if (editing.element) {
          if (msgs[editing.index - 1]) {
            return edit(msgs[editing.index - 1], editing.index - 1);
          }
        } else {
          return edit(msgs[msgs.length - 1], msgs.length - 1);
        }
      }
    };
    toNextMessage = function() {
      var msgs;
      if (editing.element) {
        msgs = wrapper.get(0).querySelectorAll(".own:not(.system)");
        if (msgs[editing.index + 1]) {
          return edit(msgs[editing.index + 1], editing.index + 1);
        } else {
          return clearEditing();
        }
      }
    };
    getEditingIndex = function(element) {
      var index, j, len, msg, msgs;
      msgs = wrapper.get(0).querySelectorAll(".own:not(.system)");
      index = 0;
      for (j = 0, len = msgs.length; j < len; j++) {
        msg = msgs[j];
        if (msg === element) {
          return index;
        }
        index++;
      }
      return -1;
    };
    edit = function(element, index) {
      var id, message;
      if (element.classList.contains("system")) {
        return;
      }
      clearEditing();
      id = element.getAttribute("id");
      message = ChatMessageHistory.findOne({
        _id: id,
        'u._id': Meteor.userId()
      });
      input.value = message.msg;
      editing.element = element;
      editing.index = index || getEditingIndex(element);
      editing.id = id;
      element.classList.add("editing");
      input.classList.add("editing");
      return setTimeout(function() {
        return input.focus();
      }, 5);
    };
    clearEditing = function() {
      if (editing.element) {
        editing.element.classList.remove("editing");
        input.classList.remove("editing");
        editing.id = null;
        editing.element = null;
        editing.index = null;
        return input.value = editing.saved || "";
      } else {
        return editing.saved = input.value;
      }
    };
    send = function(rid, input) {
      var command, match, msg, msgObject, param;
      if (_.trim(input.value) !== '') {
        KonchatNotification.removeRoomNotification(rid);
        msg = input.value;
        input.value = '';
        msgObject = {
          _id: Random.id(),
          rid: rid,
          msg: msg
        };
        stopTyping(rid);
        if (msg[0] === '/') {
          match = msg.match(/^\/([^\s]+)(?:\s+(.*))?$/m);
          if ((match != null)) {
            command = match[1];
            param = match[2];
            return Meteor.call('slashCommand', {
              cmd: command,
              params: param,
              msg: msgObject
            });
          }
        } else {
          return Meteor.call('sendMessage', msgObject);
        }
      }
    };
    deleteMsg = function(element) {
      var id;
      id = element.getAttribute("id");
      return Meteor.call('deleteMessage', {
        id: id
      }, function(error, result) {
        if (error) {
          return Errors["throw"](error.reason);
        }
      });
    };
    update = function(id, rid, input) {
      var msg;
      if (_.trim(input.value) !== '') {
        msg = input.value;
        Meteor.call('updateMessage', {
          id: id,
          msg: msg
        });
        clearEditing();
        return stopTyping(rid);
      }
    };
    startTyping = function(rid, input) {
      if (_.trim(input.value) !== '') {
        return MsgTyping.start(rid);
      } else {
        return MsgTyping.stop(rid);
      }
    };
    stopTyping = function(rid) {
      return MsgTyping.stop(rid);
    };
    bindEvents = function() {
      if (wrapper != null ? wrapper.length : void 0) {
        return $(".input-message").autogrow({
          postGrowCallback: function() {
            return resize();
          }
        });
      }
    };
    keyup = function(rid, event) {
      var i, j, k, keyCodes, l;
      input = event.currentTarget;
      k = event.which;
      keyCodes = [13, 20, 16, 9, 27, 17, 91, 19, 18, 93, 45, 34, 35, 144, 145];
      for (i = j = 35; j <= 40; i = ++j) {
        keyCodes.push(i);
      }
      for (i = l = 112; l <= 123; i = ++l) {
        keyCodes.push(i);
      }
      if (indexOf.call(keyCodes, k) < 0) {
        return startTyping(rid, input);
      }
    };
    keydown = function(rid, event) {
      var k, ref, ref1;
      input = event.currentTarget;
      k = event.which;
      resize(input);
      if (k === 13 && !event.shiftKey) {
        event.preventDefault();
        event.stopPropagation();
        if (editing.id) {
          update(editing.id, rid, input);
        } else {
          send(rid, input);
        }
        return;
      }
      if (k === 27) {
        if (editing.id) {
          event.preventDefault();
          event.stopPropagation();
          clearEditing();
        }
      } else if (k === 38 || k === 40) {
        if (k === 38) {
          if (input.value.slice(0, input.selectionStart).match(/[\n]/) !== null) {
            return;
          }
          toPrevMessage();
        } else {
          if (input.value.slice(input.selectionEnd, input.value.length).match(/[\n]/) !== null) {
            return;
          }
          toNextMessage();
        }
        event.preventDefault();
        return event.stopPropagation();
      } else if (k === 75 && (((typeof navigator !== "undefined" && navigator !== null ? (ref = navigator.platform) != null ? ref.indexOf('Mac') : void 0 : void 0) !== -1 && event.metaKey && event.shiftKey) || ((typeof navigator !== "undefined" && navigator !== null ? (ref1 = navigator.platform) != null ? ref1.indexOf('Mac') : void 0 : void 0) === -1 && event.ctrlKey && event.shiftKey))) {
        return RoomHistoryManager.clear(rid);
      }
    };
    return {
      keydown: keydown,
      keyup: keyup,
      deleteMsg: deleteMsg,
      send: send,
      init: init,
      edit: edit
    };
  })();

}).call(this);
