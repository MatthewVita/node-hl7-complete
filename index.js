var js2xmlparser = require('js2xmlparser');
var java = require('java');
var xml2js = require('xml2js');
var path = require('path');

var javaClassDependencies = [
  path.join(__dirname, 'java_dependencies', 'node-hl7-complete-4.0.0-SNAPSHOT.jar'),
  path.join(__dirname, 'java_dependencies', 'hapi-base-2.3.jar'),
  path.join(__dirname, 'java_dependencies', 'slf4j-api-1.7.16.jar'),
  path.join(__dirname, 'java_dependencies', 'hapi-osgi-base-2.3.jar')
];

java.classpath = java.classpath.concat(javaClassDependencies);

var NodeHL7Complete = function(options) {
  var javaBridgeParser = java.newInstanceSync('node_hl7_complete.hl7.Parser');

  // This will set HL7 validation off/on. It is true by default in the Java impl.
  var setStrictMode = function(trueOrFalse) {
    javaBridgeParser.setStrictMode(trueOrFalse);
  }

  var hl7ToJs = function(hl7String, callback) {
    javaBridgeParser.hl7ToXml(hl7String, function(javaBridgeParserError, responseString) {
      if (javaBridgeParserError) {
        callback(javaBridgeParserError, null);

      // Unfortunately, the Java NPM module doesn't handle exceptions well... HL7 implementation
      // code prefixes "ERROR:" for the String response if there was an exception.
      } else if (responseString.indexOf('ERROR:') > -1) {
        callback(responseString, null);
      } else {
        xml2js.parseString(responseString, function(xml2jsError, jsObject) {
          if (xml2jsError) {
            callback(xml2jsError, null);
          } else {
            callback(null, jsObject);
          }
        });
      }
    });
  };

  var jsToHl7 = function(dataType, jsData, callback) {
    var xmlMessage = js2xmlparser(dataType, jsData[dataType]);

    var nameSpacedXmlMessage = xmlMessage
      .replace('<' + dataType + '>', '<' + dataType + ' xmlns=\"urn:hl7-org:v2xml\">')
      .replace(/[^\x20-\x7E]/gmi, '');

    javaBridgeParser.xmlToHl7(nameSpacedXmlMessage, function(xml2Hl7Error, responseString) {
      if (xml2Hl7Error) {
        callback(xml2Hl7Error, null);

      // Unfortunately, the Java NPM module doesn't handle exceptions well... HL7 implementation
      // code prefixes "ERROR:" for the String response if there was an exception.
      } else if (responseString.indexOf('ERROR:') > -1) {
        callback(responseString, null);
      } else {
        callback(null, responseString);
      }
    });
  };

  // public API
  return {
    hl7ToJs:       hl7ToJs,
    jsToHl7:       jsToHl7,
    setStrictMode: setStrictMode
  };
};

module.exports = NodeHL7Complete;
