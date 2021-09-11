curl -X POST \
  'localhost:8000/jsonToHl7/SIU_S14' \
  -H 'Accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "SIU_S14": {
    "MSH": [
      {
        "MSH.1": [
          "|"
        ],
        "MSH.2": [
          "^~\\&"
        ],
        "MSH.3": [
          {
            "HD.1": [
              "GPMS"
            ]
          }
        ],
        "MSH.4": [
          {
            "HD.1": [
              "CTX"
            ]
          }
        ],
        "MSH.6": [
          {
            "HD.1": [
              "MED2000"
            ]
          }
        ],
        "MSH.7": [
          {
            "TS.1": [
              "200803060953"
            ]
          }
        ],
        "MSH.9": [
          {
            "CM_MSG.1": [
              "SIU"
            ],
            "CM_MSG.2": [
              "S14"
            ]
          }
        ],
        "MSH.10": [
          "20080306953450"
        ],
        "MSH.11": [
          {
            "PT.1": [
              "P"
            ]
          }
        ],
        "MSH.12": [
          "2.3"
        ],
        "MSH.20": [
          " SCH"
        ],
        "MSH.21": [
          "00331839401"
        ],
        "MSH.26": [
          "58"
        ],
        "MSH.28": [
          {
            "UNKNOWN.1": [
              "HLCK"
            ],
            "UNKNOWN.2": [
              "HEALTHCHECK ANY AGE"
            ]
          }
        ],
        "MSH.29": [
          "20"
        ],
        "MSH.30": [
          "MIN"
        ],
        "MSH.31": [
          {
            "UNKNOWN.4": [
              "200803061000 "
            ]
          }
        ],
        "MSH.36": [
          "JOHN"
        ],
        "MSH.40": [
          "VALERIE"
        ],
        "MSH.45": [
          "ARRIVED"
        ],
        "MSH.46": [
          " PID"
        ],
        "MSH.47": [
          "1"
        ],
        "MSH.49": [
          "489671"
        ],
        "MSH.50": [
          "0"
        ],
        "MSH.51": [
          {
            "UNKNOWN.1": [
              "SMITH"
            ],
            "UNKNOWN.2": [
              "MICHAEL"
            ]
          }
        ],
        "MSH.53": [
          "20080205"
        ],
        "MSH.54": [
          "F"
        ],
        "MSH.57": [
          {
            "UNKNOWN.1": [
              "176215TH STREET"
            ],
            "UNKNOWN.2": [
              "HOUSTON"
            ],
            "UNKNOWN.3": [
              "TX"
            ],
            "UNKNOWN.4": [
              "77306"
            ]
          }
        ],
        "MSH.59": [
          "(832)795-8259"
        ],
        "MSH.62": [
          "S"
        ],
        "MSH.65": [
          "999999999"
        ],
        "MSH.77": [
          " PV1"
        ],
        "MSH.78": [
          "1"
        ],
        "MSH.79": [
          "O"
        ],
        "MSH.84": [
          {
            "UNKNOWN.1": [
              "HHR"
            ],
            "UNKNOWN.2": [
              "NGUYENSUSAN MD"
            ]
          }
        ],
        "MSH.120": [
          ""
        ],
        "MSH.130": [
          " RGS"
        ],
        "MSH.131": [
          "1"
        ],
        "MSH.134": [
          " AIL"
        ],
        "MSH.135": [
          "1"
        ],
        "MSH.137": [
          {
            "UNKNOWN.1": [
              "HHR"
            ],
            "UNKNOWN.2": [
              "FPCS NGUYEN, MD"
            ]
          }
        ],
        "MSH.147": [
          " NTE"
        ],
        "MSH.148": [
          "1"
        ],
        "MSH.150": [
          "1MONTH HLCK"
        ],
        "MSH.151": [
          " AIP"
        ],
        "MSH.152": [
          "1"
        ],
        "MSH.154": [
          {
            "UNKNOWN.1": [
              "PBN"
            ],
            "UNKNOWN.2": [
              "LISAPORTER"
            ]
          }
        ],
        "MSH.155": [
          "50"
        ]
      }
    ]
  }
}'