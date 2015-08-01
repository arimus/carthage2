// Generated by CoffeeScript 1.9.3
(function() {
  var flat;

  flat = function(obj, newObj, path) {
    var key, value;
    if (newObj == null) {
      newObj = {};
    }
    if (path == null) {
      path = '';
    }
    for (key in obj) {
      value = obj[key];
      if (_.isObject(value)) {
        flat(value, newObj, key + '.');
      } else {
        newObj[path + key] = value;
      }
    }
    return newObj;
  };

  Meteor.startup(function() {
    var error, errors, i, key, keys, l, lang, langs, len, len1, present, ref, ref1, value;
    l = {};
    keys = {};
    errors = [];
    langs = Object.keys(TAPi18next.options.resStore);
    ref = TAPi18next.options.resStore;
    for (lang in ref) {
      value = ref[lang];
      l[lang] = flat(value);
      ref1 = l[lang];
      for (key in ref1) {
        value = ref1[key];
        if (keys[key] == null) {
          keys[key] = [];
        }
        keys[key].push(lang);
      }
    }
    len = 0;
    for (key in keys) {
      present = keys[key];
      if (!(present.length !== langs.length)) {
        continue;
      }
      error = ((_.difference(langs, present).join(',')) + ": missing translation for ").red + key.white + (". Present in [" + (present.join(',')) + "]").red;
      errors.push(error);
      if (error.length > len) {
        len = error.length;
      }
    }
    if (errors.length > 0) {
      console.log("+".red + s.rpad('', len - 28, '-').red + "+".red);
      for (i = 0, len1 = errors.length; i < len1; i++) {
        error = errors[i];
        console.log("|".red, s.rpad("" + error, len).red, "|".red);
      }
      return console.log("+".red + s.rpad('', len - 28, '-').red + "+".red);
    }
  });

}).call(this);
