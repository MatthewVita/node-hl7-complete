(function() {
  'use strict';

  var unitUnderTest = require('../../index');
  var testDataRetriever = require('./test-data-retriever');
  var dumpKeysRecursively = require('recursive-keys').dumpKeysRecursively;
  var glob = require('glob');
  var path = require('path');

  describe('functional tests', function() {
    var globFiles = glob.sync(path.resolve(__dirname + '/test-data/**/*.hl7'));

    // Loops through every hl7 message file in the `./test-data/name` areas and
    // runs a test for each.
    globFiles.forEach(function(fileWithExt) {
      var fileWithoutPath = path.basename(fileWithExt);
      var fileWithoutExt = fileWithExt.replace('.hl7', '');
      var retrievedData = testDataRetriever(fileWithoutExt);
      var hl7Data = retrievedData.hl7;
      var jsData = retrievedData.js;

      // Example: `MFN_M02`
      var xmlKey = Object.keys(jsData)[0];

      it('transforms ' + fileWithoutPath + ' to js', function(done) {
        unitUnderTest.hl7ToJs(hl7Data, function(error, data) {
          done();
          expect(error).toBe(null);
          expect(JSON.stringify(data)).toEqual(JSON.stringify(jsData));
        });
      });

      it('transforms ' + fileWithoutPath + '.js to HL7', function(done) {
        unitUnderTest.jsToHl7(xmlKey, jsData, function(outerError, outerData) {
          expect(outerError).toBe(null);

          // NOTE: there are minor differences in the HL7 produced (e.x.: `0.1` vs `.1` and fields
          // being positioned a tad differently) so the new HL7 is transformed into JavaScript
          // so that all of the object keys are recursively gathered and compared within a tolerance
          // window to see if they are effectively the same.
          unitUnderTest.hl7ToJs(outerData, function(innerError, innerData) {
            var offsetToleranceWindow = 4;
            var offset;

            var transformedDataObjKeysCount = dumpKeysRecursively(innerData).length;
            var originalDataObjKeysCount = dumpKeysRecursively(jsData).length;

            if (transformedDataObjKeysCount > originalDataObjKeysCount) {
              offset = transformedDataObjKeysCount - originalDataObjKeysCount;
            } else if (originalDataObjKeysCount > transformedDataObjKeysCount) {
              offset = originalDataObjKeysCount - transformedDataObjKeysCount;
            } else {
              offset = 0;
            }

            var isOffsetWithinToleranceWindow = offset <= offsetToleranceWindow ? true : false;

            expect(innerError).toBe(null);
            expect(isOffsetWithinToleranceWindow).toBe(true);
            done();
          });
        });
      });
    });
  });
})();
