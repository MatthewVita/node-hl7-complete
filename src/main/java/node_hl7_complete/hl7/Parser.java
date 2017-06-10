package node_hl7_complete.hl7;

import ca.uhn.hl7v2.HL7Exception;
import ca.uhn.hl7v2.model.Message;
import ca.uhn.hl7v2.parser.PipeParser;
import ca.uhn.hl7v2.parser.GenericParser;
import ca.uhn.hl7v2.parser.XMLParser;
import ca.uhn.hl7v2.parser.DefaultXMLParser;

public class Parser {
  private Boolean strictMode = true; // Defaults to strict mode (HL7 validation)

  public Parser() {}
  
  public void setStrictMode(Boolean value) {
    strictMode = value;
  }

  public String hl7ToXml(String hl7String) {
    String responseString = "";

    // Strips out HL7 pipes and transforms data into basic Hapi data structure
    PipeParser pipeParser;
      
    if (!strictMode) {
      pipeParser = PipeParser.getInstanceWithNoValidation();
    } else {
      pipeParser = new PipeParser();
    }

    try {
      Message hl7Message = pipeParser.parse(hl7String);

      // Represents data as XML
      XMLParser xmlParser = new DefaultXMLParser();
      String xmlString = xmlParser.encode(hl7Message);
      
      // Cleans up data so JavaScript literal has just the contents (no xml metadata)
      responseString = xmlString
                                    .replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "")
                                    .replace(" xmlns=\"urn:hl7-org:v2xml\"", "");
    } catch (HL7Exception e) {
      // Unfortunately, the Java NPM module doesn't handle exceptions well... going to prefix "ERROR:"
      // for the consumer to know that an exception has occured.
      responseString = "ERROR:" + e.getMessage(); 
    }

    return responseString;
  }

  // TODO: remove the validation-less instance in favor of the validated one
  public String xmlToHl7(String xmlString) {
    String responseString = "";

    try {
      // Transforms into basic Hapi data structure
      GenericParser genericParser = GenericParser.getInstanceWithNoValidation();
      Message hl7Message = genericParser.parse(xmlString);

      // Applies all necessary HL7 pipes to the basic structure
      PipeParser pipeParser = new PipeParser();
      responseString = pipeParser.encode(hl7Message);
    } catch (HL7Exception e) {
      // Unfortunately, the Java NPM module doesn't handle exceptions well... going to prefix "ERROR:"
      // for the consumer to know that an exception has occured.
      responseString = "ERROR:" + e.getMessage(); 
    }
    
    return responseString;
  }
}
