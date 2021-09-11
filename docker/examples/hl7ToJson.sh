curl -X POST \
  'localhost:8000/hl7ToJson' \
  -H 'Accept: */*' \
  -H 'Content-Type: text/plain' \
  -d 'MSH|^~\&|HealthSentry^HealthSentry^L|Baseline West MC^33D1234567^L|VISN_OUT^VISN_OUT^L|VISN_OUT^VISN_OUT^L|201010010913||ORU^R01^ORU_R01|201010010913000772|P|2.5.1|||||||||PHLabReport-NoAck^^2.16.840.1.114222.4.10.3^ISO\n
SFT|Cerner Corporation|20101001|HealthSentry|HealthSentry|HealthSentry|20101001\n
PID|1||9339683996^^^Baseline West MC&33D1234567&L^MR^Baseline West MC&33D1234567&L|7903^^^Cerner Corp|Miller^Paul^One^^^^L||20050715050000|M||White^Caucasian^HL70005|555 Flower Street^^Aurora^CO^80011^USA^C||^PRN^PH^^^303^5549936||||||765894312|||N^Non Hispanic^HL70189
ORC|RE|||||||||||Harrison , Kyle^Harrison^Kyle^^^^^^Baseline West MC&33D1234567&L|||||||||Baseline West MC^L^^^^Baseline West MC&33D1234567&L^XX^Baseline West MC&33D1234567&L^^123|2800 Rockcreek Parkway^^Kansas City^MO^64117^^B|^^PH^^^816^2211024|2800 Rockcreek Parkway^^Kansas City^MO^64117^^B
OBR|1||2010273000015^EHR^33D1234567^L|10368-9^Lead Level^LN^1138^Lead Level^99zzz or L|||201011041640||||||None|201011041640||Harrison , Kyle^Harrison^Kyle^^^^^^Baseline West MC&33D1234567&L|^^PH^^^816^2211024|||||20101001132700||LAB|F||||||787.91^DIARRHEA^I9~789.0^ABDOMINAL PAIN^I9~780.79^OTHER MALAISE AND FATIGUE^I9
SPM|1|||122555007^Blood Venous^SCT^BLDV^Blood Venous^HL70070^20080131^2.5.1
OBX|1|NM|10368-9^Lead Level^LN^1138^Lead Level^99zzz or L|1|50|ug/dL^Micrograms per Deciliter^UCUM|^^10.000000|H|||F|||201011041640|||||20101001132700||||Baseline West MC^L^^^^Baseline West MC&33D1234567&L^XX^Baseline West MC&33D1234567&L^^123|2800 Rockcreek Parkway^^Kansas City^MO^64117^^B'