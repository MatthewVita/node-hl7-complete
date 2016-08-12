var js2xmlparser = require("js2xmlparser");
var java         = require('java');
var xml2js       = require('xml2js');

var NodeHL7Complete = function() {
  var javaClassDependencies = [
    './java_dependencies/node-hl7-complete-0.0.1-SNAPSHOT.jar',
    './java_dependencies/hapi-base-2.2.jar',
    './java_dependencies/slf4j-api-1.7.16.jar',
    './java_dependencies/hapi-osgi-base-2.2.jar'
  ];

  var javaBridgeParser = null;

  var construct = function() {
    wireUpJavaDependencies();
    javaBridgeParser = java.newInstanceSync('node_hl7_complete.hl7.Parser');
  };

  var wireUpJavaDependencies = function() {
    javaClassDependencies.forEach(function(dependency) {
      java.classpath.push(dependency);
    });
  };

  var hl7ToJs = function(hl7String, callback) {
    javaBridgeParser.hl7ToXml(hl7String, function(javaBridgeParserError, xmlString) {
      if (javaBridgeParserError) {
        callback(javaBridgeParserError, null);
      } else {
        xml2js.parseString(xmlString, function(xml2jsError, jsObject) {
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

    javaBridgeParser.xmlToHl7(nameSpacedXmlMessage, function(xml2Hl7Error, hl7String) {
      if (xml2Hl7Error) {
        callback(xml2Hl7Error, null);
      } else {
        callback(null, hl7String);
      }
    });
  };

  construct();

  // public API
  return {
    hl7ToJs: hl7ToJs,
    jsToHl7: jsToHl7
  };
}();

module.exports = NodeHL7Complete;
