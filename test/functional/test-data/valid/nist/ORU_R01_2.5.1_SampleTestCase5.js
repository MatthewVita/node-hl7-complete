{
  "ORU_R01": {
    "MSH": [{
      "MSH.1": ["|"],
      "MSH.2": ["^~\\&"],
      "MSH.3": [{
        "HD.1": ["EHR Application"],
        "HD.2": ["2.16.840.1.113883.3.72.7.1"],
        "HD.3": ["HL7"]
      }],
      "MSH.4": [{
        "HD.1": ["EHR Facility"],
        "HD.2": ["2.16.840.1.113883.3.72.7.2"],
        "HD.3": ["HL7"]
      }],
      "MSH.5": [{
        "HD.1": ["PH Application"],
        "HD.2": ["2.16.840.1.113883.3.72.7.3"],
        "HD.3": ["HL7"]
      }],
      "MSH.6": [{
        "HD.1": ["PH Facility"],
        "HD.2": ["2.16.840.1.113883.3.72.7.4"],
        "HD.3": ["HL7"]
      }],
      "MSH.7": [{
        "TS.1": ["20100929110939"]
      }],
      "MSH.9": [{
        "MSG.1": ["ORU"],
        "MSG.2": ["R01"],
        "MSG.3": ["ORU_R01"]
      }],
      "MSH.10": ["NIST-100929110939497"],
      "MSH.11": [{
        "PT.1": ["P"]
      }],
      "MSH.12": [{
        "VID.1": ["2.5.1"]
      }],
      "MSH.21": [{
        "EI.1": ["PHLabReport-NoAck"],
        "EI.3": ["2.16.840.1.114222.4.10.3"],
        "EI.4": ["ISO"]
      }]
    }],
    "SFT": [{
      "SFT.1": [{
        "XON.1": ["NIST Lab, Inc."]
      }],
      "SFT.2": ["3.6.23"],
      "SFT.3": ["A-1 Lab System"],
      "SFT.4": ["6742873-12"],
      "SFT.6": [{
        "TS.1": ["20080303"]
      }]
    }],
    "ORU_R01.PATIENT_RESULT": [{
      "ORU_R01.PATIENT": [{
        "PID": [{
          "PID.3": [{
            "CX.1": ["686774009"],
            "CX.4": [{
              "HD.1": ["MPI"],
              "HD.2": ["2.16.840.1.113883.19.3.2.1"],
              "HD.3": ["ISO"]
            }],
            "CX.5": ["MR"]
          }],
          "PID.5": [{
            "XPN.1": [{
              "FN.1": ["Takamura"]
            }],
            "XPN.2": ["Michael"]
          }],
          "PID.7": [{
            "TS.1": ["19820815"]
          }],
          "PID.8": ["M"],
          "PID.10": [{
            "CE.1": ["2028-9"],
            "CE.2": ["Asian"],
            "CE.3": ["HL70005"]
          }],
          "PID.11": [{
            "XAD.1": [{
              "SAD.1": ["3567 Maple Street"]
            }],
            "XAD.3": ["Oakland"],
            "XAD.4": ["CA"],
            "XAD.5": ["94605"],
            "XAD.6": ["USA"],
            "XAD.7": ["M"]
          }],
          "PID.13": [{
            "XTN.2": ["PRN"],
            "XTN.6": ["510"],
            "XTN.7": ["6658876"]
          }],
          "PID.22": [{
            "CE.1": ["N"],
            "CE.2": ["Not Hispanic or Latino"],
            "CE.3": ["HL70189"]
          }]
        }]
      }],
      "ORU_R01.ORDER_OBSERVATION": [{
        "OBR": [{
          "OBR.1": ["1"],
          "OBR.3": [{
            "EI.1": ["7564832"],
            "EI.2": ["Lab"],
            "EI.3": ["2.16.840.1.113883.19.3.1.6"],
            "EI.4": ["ISO"]
          }],
          "OBR.4": [{
            "CE.1": ["10676-5"],
            "CE.2": ["Hepatitis C Virus RNA"],
            "CE.3": ["LN"],
            "CE.4": ["1198112"],
            "CE.5": ["Hepatitis C Test"],
            "CE.6": ["99USI"]
          }],
          "OBR.7": [{
            "TS.1": ["201007281400"]
          }],
          "OBR.13": ["\"Nausea, vomiting, abdominal pain \""],
          "OBR.16": [{
            "XCN.1": ["1234"],
            "XCN.2": [{
              "FN.1": ["Admit"]
            }],
            "XCN.3": ["Alan"],
            "XCN.9": [{
              "HD.1": ["ABC Medical Center"],
              "HD.2": ["2.16.840.1.113883.19.4.6"],
              "HD.3": ["ISO"]
            }]
          }],
          "OBR.22": [{
            "TS.1": ["201007301500"]
          }],
          "OBR.25": ["F"],
          "OBR.31": [{
            "CE.1": ["787.01"],
            "CE.2": ["Nausea and vomiting"],
            "CE.3": ["I9CDX"]
          }, {
            "CE.1": ["789.0"],
            "CE.2": ["Abdominal pain"],
            "CE.3": ["I9CDX"]
          }]
        }],
        "ORU_R01.OBSERVATION": [{
          "OBX": [{
            "OBX.1": ["1"],
            "OBX.2": ["NM"],
            "OBX.3": [{
              "CE.1": ["10676-5"],
              "CE.2": ["Hepatitis C Virus RNA"],
              "CE.3": ["LN"]
            }],
            "OBX.4": ["1"],
            "OBX.5": ["850000"],
            "OBX.6": [{
              "CE.1": ["iU/mL"],
              "CE.2": ["international units per mililiter"],
              "CE.3": ["UCUM"]
            }],
            "OBX.7": ["High Viral Load > or = 850000iU/mL"],
            "OBX.8": ["H"],
            "OBX.11": ["F"],
            "OBX.14": [{
              "TS.1": ["201007281400"]
            }],
            "OBX.19": [{
              "TS.1": ["200807301500"]
            }],
            "OBX.23": [{
              "XON.1": ["Lab"],
              "XON.2": ["L"],
              "XON.6": [{
                "HD.1": ["CLIA"],
                "HD.2": ["2.16.840.1.113883.19.4.6"],
                "HD.3": ["ISO"]
              }],
              "XON.7": ["XX"],
              "XON.10": ["1236"]
            }],
            "OBX.24": [{
              "XAD.1": [{
                "SAD.1": ["3434 Industrial Lane"]
              }],
              "XAD.3": ["Ann Arbor"],
              "XAD.4": ["MI"],
              "XAD.5": ["48103"],
              "XAD.7": ["B"]
            }]
          }]
        }],
        "ORU_R01.SPECIMEN": [{
          "SPM": [{
            "SPM.4": [{
              "CWE.1": ["122555007"],
              "CWE.2": ["Venous blood specimen"],
              "CWE.3": ["SCT"],
              "CWE.4": ["BLDV"],
              "CWE.5": ["Blood venous"],
              "CWE.6": ["HL70070"],
              "CWE.7": ["20080131"],
              "CWE.8": ["2.5.1"]
            }]
          }]
        }]
      }]
    }]
  }
}
