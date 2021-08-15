(function() {
  'use strict';

  var proxyquire = require('proxyquire');
  var unitUnderTest;
  var javaMock;
  var js2xmlparserMock;
  var xml2jsMock;
  var pathMock;
  var javaBridgeParser;
  var javaClassPathPush;
  var newInstanceSync;
  var sep = require('path').sep;

  beforeEach(function() {
    javaBridgeParser  = jasmine.createSpyObj('javaBridgeParser', ['hl7ToXml',
                                                                  'xmlToHl7',
                                                                  'setStrictMode']);
    javaClassPathPush = jasmine.createSpyObj('javaClassPathPush', ['concat']);
    newInstanceSync = jasmine.createSpy('newInstanceSync').andReturn(javaBridgeParser);
    xml2jsMock = jasmine.createSpyObj('xml2jsMock', ['parseString']);
    js2xmlparserMock = jasmine.createSpyObj('js2xmlparserMock', ['parse']);
    pathMock = jasmine.createSpyObj('path', ['join']);

    pathMock.join.andCallFake(function(dirName, javaDepsDir, jar) {
      return javaDepsDir + sep + jar;
    });

    javaMock = {
      newInstanceSync: newInstanceSync,
      classpath: javaClassPathPush
    };

    var __ = proxyquire('../../index', {
      'java': javaMock,
      'js2xmlparser': js2xmlparserMock,
      'xml2js': xml2jsMock,
      'path': pathMock
    });

    unitUnderTest = new __();
  });

  describe('construct', function() {
    it('constructs a custom Java Parser object', function() {
      expect(javaMock.newInstanceSync)
        .toHaveBeenCalledWith('node_hl7_complete.hl7.Parser');
    });
  });

  describe('wireUpJavaDependencies', function() {
    var concatArgsForCall;

    beforeEach(function() {
      // Convenience variable because the structure is deep.
      concatArgsForCall = javaClassPathPush.concat.argsForCall[0][0];
    });

    it('adds the custom parser to the java classpath', function() {
      expect(concatArgsForCall[0])
        .toBe('java_dependencies' + sep + 'node-hl7-complete-4.0.0-SNAPSHOT.jar');
    });

    it('adds the HL7 parser engine to the java classpath', function() {
      expect(concatArgsForCall[1])
        .toBe('java_dependencies' + sep + 'hapi-base-2.3.jar');
    });

    it('adds the logger dependency to the java classpath', function() {
      expect(concatArgsForCall[2])
        .toBe('java_dependencies' + sep + 'slf4j-api-1.7.16.jar');
    });

    it('adds the HL7 parser engine dependency bundle to the java classpath', function() {
      expect(concatArgsForCall[3])
        .toBe('java_dependencies' + sep + 'hapi-osgi-base-2.3.jar');
    });
  });

  describe('setStrictMode', function() {
    describe('non-strict mode', function() {
      beforeEach(function() {
        unitUnderTest.setStrictMode(false);
      });

      it('informs the Java instance not to validate HL7', function() {
        expect(javaBridgeParser.setStrictMode)
          .toHaveBeenCalledWith(false);
      });
    });

    describe('strict mode', function() {
      beforeEach(function() {
        unitUnderTest.setStrictMode(true);
      });

      it('informs the Java instance to validate HL7', function() {
        expect(javaBridgeParser.setStrictMode)
          .toHaveBeenCalledWith(true);
      });
    });

    // Note: the effects of strict mode can't be tested meaningfully in this unit test because
    //       Java handles this value.
  });

  describe('hl7ToJs', function() {
    var callbackSpy;

    describe('valid hl7 data input', function() {
      beforeEach(function() {
        javaBridgeParser.hl7ToXml.andCallFake(function(hl7String, callback) {
          callback(null, 'some-hl7-data');
        });

        callbackSpy = jasmine.createSpy('callbackSpy');
        xml2jsMock.parseString.andCallFake(function(string, callback) {
          callback(null, {
            some: 'js-data'
          });
        });
        unitUnderTest.hl7ToJs('some-hl7-data', callbackSpy);
      });

      it('invokes the callback with transformed js data', function() {
        expect(callbackSpy).toHaveBeenCalledWith(null, { some: 'js-data' });
      });
    });

    describe('java bridge error', function() {
      beforeEach(function() {
        javaBridgeParser.hl7ToXml.andCallFake(function(hl7String, callback) {
          callback('java bridge error', null);
        });

        unitUnderTest.hl7ToJs('some-hl7-data', callbackSpy);
      });

      it('invokes the callback with an error response', function() {
        expect(callbackSpy).toHaveBeenCalledWith('java bridge error', null);
      });
    });

    describe('HL7 implementation code "throws" an error via the response string', function() {
      beforeEach(function() {
        javaBridgeParser.hl7ToXml.andCallFake(function(hl7String, callback) {
          callback(null, 'ERROR: Some HL7-specific ValidationError ...');
        });

        unitUnderTest.hl7ToJs('some-hl7-data', callbackSpy);
      });

      it('invokes the callback with an error response', function() {
        expect(callbackSpy).toHaveBeenCalledWith('ERROR: Some HL7-specific ValidationError ...', null);
      });
    });

    describe('xml2js error', function() {
      beforeEach(function() {
        javaBridgeParser.hl7ToXml.andCallFake(function(hl7String, callback) {
          callback(null, 'some-hl7-data');
        });

        callbackSpy = jasmine.createSpy('callbackSpy');
        xml2jsMock.parseString.andCallFake(function(string, callback) {
          callback('xml2js error', null);
        });
        unitUnderTest.hl7ToJs('some-hl7-data', callbackSpy);
      });

      it('invokes the callback with an error response', function() {
        expect(callbackSpy).toHaveBeenCalledWith('xml2js error', null);
      });
    });
  });

  describe('jsToHl7', function() {
    var callbackSpy;

    describe('intermediate xml', function() {
      beforeEach(function() {
        js2xmlparserMock.parse.andCallFake(function() {
          return '<intermediate></intermediate>';
        });

        unitUnderTest.jsToHl7(
          'intermediate', { 'some': 'js-data' }, callbackSpy);
      });

      it('passes in intermediate xml to the bridge', function() {
        expect(javaBridgeParser.xmlToHl7)
          .toHaveBeenCalledWith('<intermediate xmlns="urn:hl7-org:v2xml"></intermediate>',
                                jasmine.any(Function));
      });
    });

    describe('valid js input', function() {
      beforeEach(function() {
        js2xmlparserMock.parse.andCallFake(function() {
          return '<intermediate></intermediate>';
        });

        callbackSpy = jasmine.createSpy('callbackSpy');
        javaBridgeParser.xmlToHl7.andCallFake(function(string, callback) {
          callback(null, 'some-hl7-data');
        });

        unitUnderTest.jsToHl7('intermediate', { 'some': 'js-data' }, callbackSpy);
      });

      it('invokes the callback with transformed hl7 data', function() {
        expect(callbackSpy).toHaveBeenCalledWith(null, 'some-hl7-data');
      });
    });

    describe('xmlToHl7 error', function() {
      beforeEach(function() {
        js2xmlparserMock.parse.andCallFake(function() {
          return '<intermediate></intermediate>';
        });

        callbackSpy = jasmine.createSpy('callbackSpy');
        javaBridgeParser.xmlToHl7.andCallFake(function(string, callback) {
          callback('error', null);
        });

        unitUnderTest.jsToHl7('intermediate', { 'some': 'bad-js-data' }, callbackSpy);
      });

      it('invokes the callback with an error response', function() {
        expect(callbackSpy).toHaveBeenCalledWith('error', null);
      });
    });

    describe('implementation code "throws" an error via the response string', function() {
      beforeEach(function() {
        js2xmlparserMock.parse.andCallFake(function() {
          return '<intermediate></intermediate>';
        });

        callbackSpy = jasmine.createSpy('callbackSpy');
        javaBridgeParser.xmlToHl7.andCallFake(function(string, callback) {
          callback(null, 'ERROR: Some xml exception ...');
        });

        unitUnderTest.jsToHl7('intermediate', { 'some': 'bad-js-data' }, callbackSpy);
      });

      it('invokes the callback with an error response', function() {
        expect(callbackSpy).toHaveBeenCalledWith('ERROR: Some xml exception ...', null);
      });
    });
  });
})();
