var fs = require('fs');
var path = require('path');

var _fileRetrievalStrategies = {
  'JS': function(filePath) {
    var fileData = fs.readFileSync(filePath + '.js', 'utf8');
    var serializedJavaScript = JSON.parse(fileData);
    return serializedJavaScript;
  },
  'HL7': function(filePath) {
    var fileData = fs.readFileSync(filePath + '.hl7', 'utf8');
    return fileData;
  }
};

function _get(fileName) {
  var file = fileName;
  var filePath = path.resolve(__dirname + '/test-data', file);

  var result = {
    js: _fileRetrievalStrategies['JS'](filePath),
    hl7: _fileRetrievalStrategies['HL7'](filePath)
  };

  return result;
}

module.exports = _get;
