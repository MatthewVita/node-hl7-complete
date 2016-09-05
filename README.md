![img](https://travis-ci.org/MatthewVita/node-hl7-complete.svg?branch=master)

# Node HL7 Complete

Node module that is bridged with the Java Hapi HL7 library.

With this library, you can:
- Transform plain JavaScript objects into HL7 messages.
- Transform HL7 messages into plain JavaScript objects.
- Benefit from Java Hapi HL7 being used under the hood, which is the gold-standard of HL7 parsing (e.x.: ADT, BAR, DFT, MDM, MFN, ORM, ORU, QRY, RAS, RDE, RGV, SIU, etc...)

## Overview
There are no production ready Node HL7 libraries out there at this time. I figured instead of writing one or improving on one by hand, why not just have Java Hapi do all of the hard work? Hapi is the gold-standard implementation of HL7 parsing, so there's no need to reinvent the wheel. Please note that there _is_ a tad more overhead with this approach, but it's not too bad :).

_Example of Node HL7 Complete:_

```javascript
var NodeHL7Complete = require('node-hl7-complete');

// Stolen from http://www.dt7.com/cdc/sampmsgs.html
var hl7Message = '';
hl7Message += 'MSH|^~\\&|||||||VXU^V04|19970522MA53|P|2.3.1|||AL\r';
hl7Message += 'PID|||221345671^^^^SS||KENNEDY^JOHN^FITZGERALD^JR|BOUVIER^^^^^^M|19900607|M|||^^^^MA^^^BLD\r';
hl7Message += 'NK1|1|KENNEDY^JACQUELINE^LEE|32^MOTHER^HL70063\r';
hl7Message += 'RXA|0|1|19900607|19900607|08^HEPB-PEDIATRIC/ADOLESCENT^CVX|.5|ML^^ISO+||||||||MRK12345||MSD^MERCK^MVX\r';

NodeHL7Complete.hl7ToJs(hl7Message, function(error, data) {
  if (error) { console.error(error); return; }

  console.log(data);
});

var jsData = {
  'VXU_V04': {
    'MSH': {
      'MSH.1': '|',
      'MSH.2': '^~\\&',
      'MSH.9': {
        'MSG.1': 'VXU',
        'MSG.2': 'V04'
      },
      'MSH.10': '19970522MA53',
      'MSH.11': {
        'PT.1': 'P'
      },
      'MSH.12': {
        'VID.1': '2.3.1'
      },
      'MSH.15': 'AL'
    },
    'PID': {
      'PID.3': {
        'CX.1': 221345671,
        'CX.5': 'SS'
      },
      'PID.5': {
        'XPN.1': {
          'FN.1': 'KENNEDY'
        },
        'XPN.2': 'JOHN',
        'XPN.3': 'FITZGERALD',
        'XPN.4': 'JR'
      },
      'PID.6': {
        'XPN.1': {
          'FN.1': 'BOUVIER'
        },
        'XPN.7': 'M'
      },
      'PID.7': {
        'TS.1': 19900607
      },
      'PID.8': 'M',
      'PID.11': {
        'XAD.5': 'MA',
        'XAD.8': 'BLD'
      }
    },
    'NK1': {
      'NK1.1': 1,
      'NK1.2': {
        'XPN.1': {
          'FN.1': 'KENNEDY'
        },
        'XPN.2': 'JACQUELINE',
        'XPN.3': 'LEE'
      },
      'NK1.3': {
        'CE.1': 32,
        'CE.2': 'MOTHER',
        'CE.3': 'HL70063'
      }
    },
    'VXU_V04.ORCRXARXROBXNTE': {
      'RXA': {
        'RXA.1': 0,
        'RXA.2': 1,
        'RXA.3': {
          'TS.1': 19900607
        },
        'RXA.4': {
          'TS.1': 19900607
        },
        'RXA.5': {
          'CE.1': 08,
          'CE.2': 'HEPB-PEDIATRIC/ADOLESCENT',
          'CE.3': 'CVX'
        },
        'RXA.6': 0.5,
        'RXA.7': {
          'CE.1': 'ML',
          'CE.3': 'ISO+'
        },
        'RXA.15': 'MRK12345',
        'RXA.17': {
          'CE.1': 'MSD',
          'CE.2': 'MERCK',
          'CE.3': 'MVX'
        }
      }
    }
  }
};

NodeHL7Complete.jsToHl7('VXU_V04', jsData, function(error, data) {
  if (error) { console.error(error); return; }

  console.log(data.split('\r').join('\n'));
});

```

... these two `console.log`s yield the following:

```text
MSH|^~\&|||||||VXU^V04|19970522MA53|P|2.3.1|||AL
PID|||221345671^^^^SS||KENNEDY^JOHN^FITZGERALD^JR|BOUVIER^^^^^^M|19900607|M|||^^^^MA^^^BLD
NK1|1|KENNEDY^JACQUELINE^LEE|32^MOTHER^HL70063
RXA|0|1|19900607|19900607|8^HEPB-PEDIATRIC/ADOLESCENT^CVX|0.5|ML^^ISO+||||||||MRK12345||MSD^MERCK^MVX

{ VXU_V04:
   { MSH: [ [Object] ],
     PID: [ [Object] ],
     NK1: [ [Object] ],
     'VXU_V04.ORCRXARXROBXNTE': [ [Object] ] } }
```

As far as data-integrity goes, see the following graphic to see what the original HL7 message looked like and what the transformed JS->HL7 message looks like (very small diff):

![img](diff.png)

## Notes
 - JavaScript keys _must_ be in quotes because 'PID.3', for example, cannot be used in dot-notation.
 - The first argument to `NodeHL7Complete.jsToHl7` must be the root XML node name. For example `VXU_V04`.
 - `MSH` segment must be escaped like so `^~\\&`
 - The Java layer is strictly speaking HL7 and XML... XML is converted to JavaScript objects in the `index.js` file. Was getting a ton of exceptions when trying to bring in `GSON`. It appears that Hapi is really best used with plain XML for now.
 - Segments must have `\r` at the end of them.
 - If an `error` is returned, it will be the Java exception.
 - The `node-java` module is what embeds Java and does the bridge work. Really cool.
 - Functional test HL7 data was found by Googling around. Credit is applied by the name of the folder holding the test data files. Cerner/NIST/Realm test data was provided by https://github.com/ruby-hl7/ruby-hl7/tree/master/test_data.

## Setup
- Most folks will be able to use this module out-of-the-box due to having developer setups. If things aren't quite right, please follow the steps here: https://github.com/joeferner/node-java#installation
- To build the Java, simply install maven/Java 8 and run `mvn install` at the root of the project. Should place a `jar` somewhere in the `target` directory.
- To install the Node dependencies, simply run `npm install`.

## Tests
- `> npm run unit_tests`
- `> npm run functional_tests`

...unit test coverage reports live in `coverage/`.

## TODOs
- Test on Windows.
- Add `.gitignore` for all of the Spring Tool Suite/Eclipse/Intellij files as well as NPM files.
- Quiet down the warnings on the Java side (logging stuff).
- Implicitly determine the root XML node name instead of passing it in as the first argument to `NodeHL7Complete.jsToHl7`.
- Look into ways to get around the `^~\\&` escaping.
- Figure out how to make Travis CI run the functional tests even though it is specified to be a node environment and doesn't have Java installed at the moment.

## License
MIT
