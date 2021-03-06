var fs = require('fs');
var path = require('path');

var impregex = /@import ['"](.*)['"];/g

module.exports = {
  compile: function(files, cb) {
    var result = '';
    files.forEach(function(f) {
      var file = fs.readFileSync(f, 'utf8');
      result += file.replace(impregex, function(match, fn) {
        return fs.readFileSync(path.join(path.dirname(f), fn), 'utf8');
      });
      cb(result);
    });
  }
};
