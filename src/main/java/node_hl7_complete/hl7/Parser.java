package node_hl7_complete.hl7;

import ca.uhn.hl7v2.HL7Exception;
import ca.uhn.hl7v2.model.Message;
import ca.uhn.hl7v2.parser.PipeParser;
import ca.uhn.hl7v2.parser.GenericParser;
import ca.uhn.hl7v2.parser.XMLParser;
import ca.uhn.hl7v2.parser.DefaultXMLParser;

public class Parser {
  public Parser() {}

  public String hl7ToXml(String hl7String) throws HL7Exception {
    // Strips out HL7 pipes and transforms data into basic Hapi data structure
    PipeParser pipeParser = new PipeParser();
    Message hl7Message = pipeParser.parse(hl7String);

    // Represents data as XML
    XMLParser xmlParser = new DefaultXMLParser();
    String xmlString = xmlParser.encode(hl7Message);
    
    // Cleans up data so JavaScript literal has just the contents (no xml metadata)
    String sanitizedXmlString = xmlString
                                  .replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "")
                                  .replace(" xmlns=\"urn:hl7-org:v2xml\"", "");

    return sanitizedXmlString;
  }

  // TODO: remove the validation-less instance in favor of the validated one
  public String xmlToHl7(String xmlString) throws HL7Exception {
    // Transforms into basic Hapi data structure
    GenericParser genericParser = GenericParser.getInstanceWithNoValidation();
    Message hl7Message = genericParser.parse(xmlString);

    // Applies all necessary HL7 pipes to the basic structure
    PipeParser pipeParser = new PipeParser();
    String hl7String = pipeParser.encode(hl7Message);

    return hl7String;
  }
}
