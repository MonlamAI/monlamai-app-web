// replaces for the english to tibetan  ->input before sending to server

export function en_bo_english_replaces(text: string) {
  let result = text;
  result += ".";
  result = result.replaceAll("..", ".");
  result = result.replaceAll(/\bAI\b/g, "artificial intelligence ");
  result = result.replaceAll("(AI)", "");
  result = result.replaceAll("AI.)", "artificial intelligence.");
  result = result.replaceAll(/\bCTA\b/g, "Central Tibetan Administration");
  result = result.replaceAll(
    /(\.\s*)\bCTA\b/g,
    "Central Tibetan Administration"
  );
  result = result.replaceAll(/\bEV\b/g, "Electric vehicle");
  result = result.replaceAll(/\bBJP\b/g, "Bharatiya Janata Party");
  result = result.replaceAll(/\bASAP\b/g, "As soon as possible");
  result = result.replaceAll(/\bRSVP\b/g, "Répondez s’il vous plaît");
  result = result.replaceAll(/\bFAQs\b/g, "Frequently asked questions");
  result = result.replaceAll(/\bDIY\b/g, "Do-it-yourself");
  result = result.replaceAll(/\bFIY\b/g, "For your information");
  result = result.replaceAll(/\bAKA\b/g, "Also known as");
  result = result.replaceAll(/\bFKA\b/g, "Formerly known as");
  result = result.replaceAll(/\bETA\b/g, "Estimated time of arrival");
  result = result.replaceAll(
    /\bLGBTQ\b/g,
    "Lesbian, gay, bisexual, trans and queer"
  );
  result = result.replaceAll(/\bQ&A\b/g, "Questions and answers");
  result = result.replaceAll(/\bID\b/g, "Identification");
  result = result.replaceAll(/\bRIP\b/g, "Rest in peace");
  result = result.replaceAll(/\bVIP\b/g, "Very important person");
  result = result.replaceAll(/\bATM\b/g, "Automatic teller machine");
  result = result.replaceAll(/\bi\.e\./g, "In other words");
  result = result.replaceAll(/\bi\.g\./g, "For example");
  result = result.replaceAll(/\bPIN\b/g, "Personal identification number");
  result = result.replaceAll(/\bSOS\b/g, "Save our ship (help)");
  result = result.replaceAll(/\bSO\b/g, "Significant other");
  result = result.replaceAll(/\bTMI\b/g, "Too much information");
  result = result.replaceAll(/\bPOV\b/g, "Point of view");
  result = result.replaceAll(/\bHBD\b/g, "Happy birthday");
  result = result.replaceAll(/\bTIA\b/g, "Thanks in advance");
  result = result.replaceAll(/\bWFH\b/g, "Work from home");
  result = result.replaceAll(/\bCE\b/g, "Common Era");
  result = result.replaceAll(/\bBCE\b/g, "Before Common Era");
  result = result.replaceAll(/\bETA\b/g, "Estimated time of arrival");
  result = result.replaceAll(/\bHour\b/g, "Hour");
  result = result.replaceAll(/\bmin\b/g, "Minute");
  result = result.replaceAll(/\bsec\b/g, "Seconds");
  result = result.replaceAll(/\bN\b/g, "North");
  result = result.replaceAll(/\bS\b/g, "South");
  result = result.replaceAll(/\bE\b/g, "East");
  result = result.replaceAll(/\bW\b/g, "West");
  result = result.replaceAll(/\bNW\b/g, "Northwest");
  result = result.replaceAll(/\bNE\b/g, "Northeast");
  result = result.replaceAll(/\bSW\b/g, "Southwest");
  result = result.replaceAll(/\bSE\b/g, "Southeast");
  result = result.replaceAll(/\bAcct\b/g, "Accountant");
  result = result.replaceAll(/\bAsst\b/g, "Assistant");
  result = result.replaceAll(/\bPA\b/g, "Personal assistant");
  result = result.replaceAll(/\bVA\b/g, "Virtual assistant");
  result = result.replaceAll(/\bCapt\b/g, "Captain");
  result = result.replaceAll(/\bDir\b/g, "Director");
  result = result.replaceAll(/\bExec\b/g, "Executive");
  result = result.replaceAll(/\bCEO\b/g, "Chief Executive Officer");
  result = result.replaceAll(/\bCOO\b/g, "Chief Operation Officer");
  result = result.replaceAll(/\bCFO\b/g, "Chief Financial Officer");
  result = result.replaceAll(/\bCMO\b/g, "Chief Marketing Officer");
  result = result.replaceAll(/\bVP\b/g, "Vice president");
  result = result.replaceAll(/\bUX Designer\b/g, "User interface designer");
  result = result.replaceAll(/\bUI Designer\b/g, "User experience designer");
  result = result.replaceAll(/\bCPA\b/g, "Certified Public Accountant");
  result = result.replaceAll(/\bCFA\b/g, "Chartered Financial Analyst");
  result = result.replaceAll(/\bQA Analyst\b/g, "Quality Assurance Analyst");
  result = result.replaceAll(/\bRN\b/g, "Registered Nurse");
  result = result.replaceAll(/\bProf\b/g, "Professor");
  result = result.replaceAll(/\bEFL\b/g, "English as a foreign language");
  result = result.replaceAll(/\bELT\b/g, "English language teaching");
  result = result.replaceAll(/\bESL\b/g, "English as a second language");
  result = result.replaceAll(/\bBA\b/g, "Bachelor of Arts");
  result = result.replaceAll(/\bBS\b/g, "Bachelor of Science");
  result = result.replaceAll(/\bBFA\b/g, "Bachelor of Fine Arts");
  result = result.replaceAll(/\bMA\b/g, "Master of Arts");
  result = result.replaceAll(/\bMS\b/g, "Master of Science");
  result = result.replaceAll(/\bMBA\b/g, "Master of Business Administration");
  result = result.replaceAll(/\bMPhil\b/g, "Master of Philosophy");
  result = result.replaceAll(/\bMFA\b/g, "Master of Fine Arts");
  result = result.replaceAll(/\bLLM\b/g, "Master of Laws");
  result = result.replaceAll(/\bMSW\b/g, "Master of Social Work");
  result = result.replaceAll(/\bPhD\b/g, "Doctor of Philosophy");
  result = result.replaceAll(/\bEdD\b/g, "Doctor of Education");
  result = result.replaceAll(/\bJD\b/g, "Juris Doctor");
  result = result.replaceAll(/\bMD\b/g, "Doctor of Medicine");
  result = result.replaceAll(/\bND\b/g, "Doctor of Nursing");
  result = result.replaceAll(
    /\bTOELF\b/g,
    "Test of English as a Foreign Language"
  );
  result = result.replaceAll(
    /\bIELTS\b/g,
    "International English Language Testing System"
  );
  result = result.replaceAll(/\boz\./g, "Ounce");
  result = result.replaceAll(/\bfl\. oz\./g, "Fluid ounce");
  result = result.replaceAll(/\bgal\./g, "Gallon");
  result = result.replaceAll(/\bpt\./g, "Pint");
  result = result.replaceAll(/\bqt\./g, "Quart");
  result = result.replaceAll(/\btbsp\./g, "Tablespoon");
  result = result.replaceAll(/\btsp\./g, "Teaspoon");
  result = result.replaceAll(/\bin\./g, "Inch");
  result = result.replaceAll(/\bft\./g, "Foot");
  result = result.replaceAll(/\bmi\./g, "Mile");
  result = result.replaceAll(/\bmph\b/g, "Miles per hour");
  result = result.replaceAll(/\bn\.m\./g, "Nautical miles");
  result = result.replaceAll(/\bsq\./g, "Square");
  result = result.replaceAll(/\byd\./g, "Yard");
  result = result.replaceAll(/\blb\./g, "Pound");
  result = result.replaceAll(/\bcm\b/g, "Centimeter");
  result = result.replaceAll(/\bm\b/g, "Meter");
  result = result.replaceAll(/\bkm\b/g, "Kilometer");
  result = result.replaceAll(/\bg\b/g, "Gram");
  result = result.replaceAll(/\bkg\b/g, "Kilogram");
  result = result.replaceAll(/\bT\b/g, "Ton");
  result = result.replaceAll(/\bml\b/g, "Milliliter");
  result = result.replaceAll(/\bl\b/g, "Liter");
  result = result.replaceAll(
    /\bOECD\b/g,
    "Organization for Economic Co-operation and Development"
  );
  result = result.replaceAll(
    /\bUNESCO\b/g,
    "The United Nations Educational, Scientific and Cultural Organization"
  );
  result = result.replaceAll(/\bEU\b/g, "European Union");
  result = result.replaceAll(
    /\bFIFA\b/g,
    "International Federation of Football Association"
  );
  result = result.replaceAll(
    /\bNASA\b/g,
    "National Aeronautics and Space Administration"
  );
  result = result.replaceAll(/\bNATO\b/g, "North Atlantic Treaty Organization");
  result = result.replaceAll(
    /\bUSMCA\b/g,
    "United States–Mexico–Canada Agreement"
  );
  result = result.replaceAll(/\bWHO\b/g, "World Health Organization");
  result = result.replaceAll(/\bIRS\b/g, "Internal Revenue Service");
  result = result.replaceAll(/\bDMV\b/g, "Department of Motor Vehicles");
  result = result.replaceAll(/\bJFK\b/g, "John F. Kennedy");
  result = result.replaceAll(/\bMLK\b/g, "Martin Luther King");
  result = result.replaceAll(/\bUSAF\b/g, "United States Air Force");
  result = result.replaceAll(/\bFBI\b/g, "Federal Bureau of Investigations");
  result = result.replaceAll(/\bCIA\b/g, "Central Intelligence Agency");
  result = result.replaceAll(/\bPOTUS\b/g, "President of the United States");
  result = result.replaceAll(
    /\bSCOTUS\b/g,
    "Supreme Court of the United States"
  );
  result = result.replaceAll(/\bLA\b/g, "Los Angeles");
  result = result.replaceAll(/\bNYC\b/g, "New York City");
  result = result.replaceAll(/\bSF\b/g, "San Francisco");
  result = result.replaceAll(/\bSLC\b/g, "Salt Lake City");
  result = result.replaceAll(/\bMIA\b/g, "Miami");
  result = result.replaceAll(/\bDMV Area\b/g, "Delaware-Maryland-Virginia");
  result = result.replaceAll(/\bThe Fed\b/g, "The Federal Reserve Bank");
  result = result.replaceAll(/\bBOFA\b/g, "Bank of America");
  result = result.replaceAll(/\bASL\b/g, "American Sign Language");
  result = result.replaceAll(
    /\bTSA\b/g,
    "Transportation Security Administration"
  );
  result = result.replaceAll(/\bFAA\b/g, "Federal Aviation Administration");
  result = result.replaceAll(
    /\bUSDA\b/g,
    "United States Department of Agriculture"
  );
  result = result.replaceAll(/\bDOD\b/g, "Department of Defense");
  result = result.replaceAll(/\bDHS\b/g, "Department of Homeland Security");
  result = result.replaceAll(/\bDOJ\b/g, "Department of Justice");
  result = result.replaceAll(/\bUSPS\b/g, "United States Postal Service");
  result = result.replaceAll(/\bFDA\b/g, "Food and Drug Administration");
  result = result.replaceAll(/\bEPA\b/g, "Environmental protection Agency");
  result = result.replaceAll(
    /\bCDC\b/g,
    "Centers for Disease Control and Prevention"
  );
  result = result.replaceAll(/\bBBC\b/g, "British Broadcasting Corporation");
  result = result.replaceAll(/\bBA\b/g, "British Airways");
  result = result.replaceAll(/\bBoE\b/g, "Bank of England");
  result = result.replaceAll(/\bBR\b/g, "British Rail");
  result = result.replaceAll(/\bAmbo\b/g, "Ambulance");
  result = result.replaceAll(/\bDOB\b/g, "Date of birth");
  result = result.replaceAll(/\bTBA\b/g, "To be announced");
  result = result.replaceAll(/\bTBD\b/g, "To be determined");
  result = result.replaceAll(/\bTBC\b/g, "To be continued");
  result = result.replaceAll(/\bVAT\b/g, "Value-added Tax");
  result = result.replaceAll(/\bDOA\b/g, "Dead on arrival");
  result = result.replaceAll(/\bGMO\b/g, "Genetically modified organisms");
  result = result.replaceAll(/\bMIA\b/g, "Missing in action");
  result = result.replaceAll(/\bOCD\b/g, "Obsessive Compulsive Disorder");
  result = result.replaceAll(/\bBOGO\b/g, "Buy one, get one");
  result = result.replaceAll(/\bICYMI\b/g, "In case you missed it");
  result = result.replaceAll(/\bFWIW\b/g, "For what it’s worth");
  result = result.replaceAll(/(\.\s*)\bASAP\b/g, "As soon as possible");
  result = result.replaceAll(/(\.\s*)\bRSVP\b/g, "Répondez s’il vous plaît");
  result = result.replaceAll(/(\.\s*)\bFAQs\b/g, "Frequently asked questions");
  result = result.replaceAll(/(\.\s*)\bTGIF\b/g, "Thank god it’s Friday");
  result = result.replaceAll(/(\.\s*)\bIMO\b/g, "In my opinion");
  result = result.replaceAll(/(\.\s*)\bIMHO\b/g, "In my humble opinion");
  result = result.replaceAll(/(\.\s*)\bDIY\b/g, "Do-it-yourself");
  result = result.replaceAll(/(\.\s*)\bFIY\b/g, "For your information");
  result = result.replaceAll(/(\.\s*)\bAKA\b/g, "Also known as");
  result = result.replaceAll(/(\.\s*)\bFKA\b/g, "Formerly known as");
  result = result.replaceAll(/(\.\s*)\bBYOB\b/g, "Bring your own beverage");
  result = result.replaceAll(/(\.\s*)\bBO\b/g, "Body odor");
  result = result.replaceAll(/(\.\s*)\bETA\b/g, "Estimated time of arrival");
  result = result.replaceAll(
    /(\.\s*)\bLGBTQ\b/g,
    "Lesbian, gay, bisexual, trans and queer"
  );
  result = result.replaceAll(/(\.\s*)\bQ&A\b/g, "Questions and answers");
  result = result.replaceAll(/(\.\s*)\bID\b/g, "Identification");
  result = result.replaceAll(/(\.\s*)\bRIP\b/g, "Rest in peace");
  result = result.replaceAll(/(\.\s*)\bVIP\b/g, "Very important person");
  result = result.replaceAll(/(\.\s*)\bATM\b/g, "Automatic teller machine");
  result = result.replaceAll(
    /(\.\s*)\bPIN\b/g,
    "Personal identification number"
  );
  result = result.replaceAll(
    /(\.\s*)\bUX Designer\b/g,
    "User interface designer"
  );
  result = result.replaceAll(
    /(\.\s*)\bUI Designer\b/g,
    "User experience designer"
  );
  result = result.replaceAll(/(\.\s*)\bCPA\b/g, "Certified Public Accountant");
  result = result.replaceAll(/(\.\s*)\bCFA\b/g, "Chartered Financial Analyst");
  result = result.replaceAll(
    /(\.\s*)\bQA Analyst\b/g,
    "Quality Assurance Analyst"
  );
  result = result.replaceAll(/(\.\s*)\bWHO\b/g, "World Health Organization");
  result = result.replaceAll(/(\.\s*)\bIRS\b/g, "Internal Revenue Service");
  result = result.replaceAll(/(\.\s*)\bDMV\b/g, "Department of Motor Vehicles");
  result = result.replaceAll(/(\.\s*)\bJFK\b/g, "John F. Kennedy");
  result = result.replaceAll(/(\.\s*)\bMLK\b/g, "Martin Luther King");
  result = result.replaceAll(/(\.\s*)\bUSAF\b/g, "United States Air Force");
  result = result.replaceAll(
    /(\.\s*)\bFBI\b/g,
    "Federal Bureau of Investigations"
  );
  result = result.replaceAll(/(\.\s*)\bCIA\b/g, "Central Intelligence Agency");
  result = result.replaceAll(
    /(\.\s*)\bPOTUS\b/g,
    "President of the United States"
  );
  result = result.replaceAll(
    /(\.\s*)\bSCOTUS\b/g,
    "Supreme Court of the United States"
  );
  result = result.replaceAll(/(\.\s*)\bLA\b/g, "Los Angeles");
  result = result.replaceAll(/(\.\s*)\bNYC\b/g, "New York City");
  result = result.replaceAll(/(\.\s*)\bSF\b/g, "San Francisco");
  result = result.replaceAll(/(\.\s*)\bSLC\b/g, "Salt Lake City");
  result = result.replaceAll(/(\.\s*)\bMIA\b/g, "Miami");
  result = result.replaceAll(
    /(\.\s*)\bDMV Area\b/g,
    "Delaware-Maryland-Virginia"
  );
  result = result.replaceAll(/(\.\s*)\bThe Fed\b/g, "The Federal Reserve Bank");
  result = result.replaceAll(/(\.\s*)\bBOFA\b/g, "Bank of America");
  result = result.replaceAll(/(\.\s*)\bASL\b/g, "American Sign Language");
  result = result.replaceAll(
    /(\.\s*)\bTSA\b/g,
    "Transportation Security Administration"
  );
  result = result.replaceAll(
    /(\.\s*)\bFAA\b/g,
    "Federal Aviation Administration"
  );
  result = result.replaceAll(
    /(\.\s*)\bUSDA\b/g,
    "United States Department of Agriculture"
  );
  result = result.replaceAll(/(\.\s*)\bDOD\b/g, "Department of Defense");
  result = result.replaceAll(
    /(\.\s*)\bDHS\b/g,
    "Department of Homeland Security"
  );
  result = result.replaceAll(/(\.\s*)\bDOJ\b/g, "Department of Justice");
  result = result.replaceAll(
    /(\.\s*)\bUSPS\b/g,
    "United States Postal Service"
  );
  result = result.replaceAll(/(\.\s*)\bFDA\b/g, "Food and Drug Administration");
  result = result.replaceAll(
    /(\.\s*)\bEPA\b/g,
    "Environmental protection Agency"
  );
  result = result.replaceAll(
    /(\.\s*)\bCDC\b/g,
    "Centers for Disease Control and Prevention"
  );
  result = result.replaceAll(
    /(\.\s*)\bBBC\b/g,
    "British Broadcasting Corporation"
  );
  result = result.replaceAll(/(\.\s*)\bBA\b/g, "British Airways");
  result = result.replaceAll(/(\.\s*)\bBoE\b/g, "Bank of England");
  result = result.replaceAll(/(\.\s*)\bBR\b/g, "British Rail");
  result = result.replaceAll(/(\.\s*)\bAmbo\b/g, "Ambulance");
  result = result.replaceAll(/(\.\s*)\bDOB\b/g, "Date of birth");
  result = result.replaceAll(/(\.\s*)\bTBA\b/g, "To be announced");
  result = result.replaceAll(/(\.\s*)\bTBD\b/g, "To be determined");
  result = result.replaceAll(/(\.\s*)\bTBC\b/g, "To be continued");
  result = result.replaceAll(/(\.\s*)\bVAT\b/g, "Value-added Tax");
  result = result.replaceAll(/(\.\s*)\bDOA\b/g, "Dead on arrival");
  result = result.replaceAll(
    /(\.\s*)\bGMO\b/g,
    "Genetically modified organisms"
  );
  result = result.replaceAll(
    /(\.\s*)\bLGBT\b/g,
    "lesbian gay bisexual transgender"
  );
  // Radio Free Asia
  result = convertToLowerCaseIfAllUppercase(result);

  result = result.replaceAll("CTA ", "Central Tibetan Administration ");
  result = result.replaceAll("SARD ", "Social Development Fund ");
  result = result.replaceAll("TCRC ", "Tibetan Computer Resource Centre ");
  result = result.replaceAll("TPI ", "Tibet Policy Institute ");
  return result;
}
// replaces for the english to tibetan -> output  after getting responce from the api
export function en_bo_tibetan_replaces(text: string) {
  let result = text;
  result = result.replaceAll("མཚན་རྟགས།", "ནང་འཛུལ།");
  let regex = /([༠-༩]{2})([ཀ-ྼ])/g;
  result = result.replaceAll(regex, "$1 $2");

  result = result.replaceAll("འཚོ་བ།", "ཐད་གཏོང་།");
  result = result.replaceAll("ད་དུང་མང་ཙམ་ཐོས་དགོས།", "ད་དུང་དེ་ལས་མང་བ།");
  result = result.replaceAll("དངོས་སུ་བརྙན་འཕྲིན་ལས།", "བརྙན་འཕྲིན་ཐད་གཏོང་།");

  if (result.endsWith("་")) {
    result = result.slice(0, -1) + "།";
  }

  result = result.replaceAll("སྡིངས་ཆ་རྫོད་པ་", "སྤྱི་ཚོགས་དཀྲུགས་པ་");
  result = result.replaceAll("རྫོད་པ", "སྐྱོན་གཏོང་བ");
  result = result.replaceAll("བརྫད་པ", "སྐྱོན་བཏང་བ");
  result = result.replaceAll("སྡིངས་ཆ", "གར་སྟེགས");
  result = result.replaceAll(
    "ཨེམ་ཆི་བློ་བཟང་སངས་རྒྱས",
    "འབུམ་རམས་པ་བློ་བཟང་སེངྒེ"
  );
  result = result.replaceAll(
    "དྲུང་ཡིག་དབྱངས་ཅན་རིན་པོ་ཆེ",
    "དྲུང་ཡིག་ཡང་སྟེང་རིན་པོ་ཆེ"
  );
  result = result.replaceAll("སི་ཟུར", "སྲིད་ཟུར");
  result = result.replaceAll("མགྲོན་གཉེར་ཆེ་མོ", "མགྲོན་གཉེར་ཆེན་མོ");
  //སི་ཟུར་

  // Full sentence replacement
  if (result === "ལྟོས།") {
    return "ལྟ་བ།";
  }
  if (result === "ཉོན་ཅིག་དང་།") {
    return "ཉན་པ།";
  }
  if (result === "ཉན་ཐོས་ཀྱི་སྡེ་སྣོད་ལས་བཏུས།") {
    return "མོས་མཐུན་བྱས་པ།";
  }
  if (result === "གནས་ཚུལ་བསྡུ་རུབ་བྱེད་པ།") {
    return "གནས་ཚུལ་བསྡུ་རུབ།";
  }
  if (result === "རི་མོ་འབྲི་སྟོན།") {
    return "རི་མོ།";
  }
  if (result === "བདག་འཇུག་ཅིག་བཟོ།") {
    return "གསར་དུ་དེབ་སྐྱེལ།";
  }

  result = result.replaceAll("ཀྲུང་གོའི་", "རྒྱ་ནག་གི་");

  result = result.replaceAll("བོད་ལྗོངས་སྲིད་གཞུང་།", "བོད་མིའི་སྒྲིག་འཛུགས།");
  result = result.replaceAll(
    "བོད་དབུས་སྲིད་གཞུང་གི་",
    "བོད་མིའི་སྒྲིག་འཛུགས་ཀྱི་"
  );
  result = result.replaceAll("པ་འི", "པའི");

  result = result.replaceAll("ཏང་གི", "ཚོགས་པའི");
  result = result.replaceAll("ཏང་གིས", "ཚོགས་པས");
  result = result.replaceAll("ཨུ་ཡོན་ལྷན་ཁང་", "ལྷན་ཁང་");
  result = result.replaceAll("སྤྱི་ལོ", "ཕྱི་ལོ");
  result = result.replaceAll("སྤྱི་ཟླ", "ཕྱི་ཟླ");
  result = result.replaceAll("ཧ་རན་སི", "ཧྥ་རན་སི");
  result = result.replaceAll("ཁ་ལི་ཧོར", "ཁ་ལི་ཧྥོར");
  result = result.replaceAll("ལྷོ་ཨ་ཧེ་རི་ཁ", "ལྷོ་ཨ་ཧྥི་རི་ཁ");
  result = result.replaceAll("ཨ་ཧེ་རི་ཁ", "ཨ་ཧྥི་རི་ཁ");
  result = result.replaceAll("༸ཏཱ་ལའི་བླ་མ་དགོངས་པ་རྫོགས", "དགོངས་པ་རྫོགས");
  result = result.replaceAll("༸ཏཱ་ལའི་བླ་མ་གཤེགས", "དགོངས་པ་རྫོགས");
  result = result.replaceAll("༸ཏཱ་ལའི་བླ་མ་སྐུ་གཤེགས", "སྐུ་གཤེགས");
  result = result.replace(/^། /, "");
  result = result.replaceAll("ངེས་ཚིག་མེད་པའི་", "");
  result = result.replaceAll("ངེས་ཚིག་མེད་པ་", "");
  result = result.replaceAll("ལྗོན་ཤིང་རྣམས།", "ལྗོན་ཤིང་།");
  result = result.replaceAll("མེ་ཏོག་རྣམས།", "མེ་ཏོག།");
  result = result.replaceAll("བྱ་བྱིའུ་རྣམས།", "བྱ་བྱིའུ།");
  result = result.replaceAll("ཀྱིས་ངེས་ཚིག་མི་སྟེར་བ་", "");
  result = result.replaceAll("ལ་ངེས་ཚིག་མི་སྟེར་བ", "");
  result = result.replaceAll("<unk>", "");
  result = result.replaceAll("[DONE]", "");
  result = result.replaceAll("༸ཏཱ་ལའི་བླ་མས་", "ཁོང་གིས");
  result = result.replaceAll("སྐེ་རགས་དང་རྒྱ་ལམ", "རྒྱུད་གཅིག་ལམ་གཅིག");
  result = result.replaceAll("སྐེ་རགས་དང་རྒྱ་ལམ་གྱི", "རྒྱུད་གཅིག་ལམ་གཅིག་གི");
  result = result.replaceAll("Beltདང་ལམ་གྱི", "རྒྱུད་གཅིག་ལམ་གཅིག་གི");
  result = result.replaceAll(
    "ལས་འགུལ་མི་གོ་སྒྲིག་བྱེད་",
    "ལས་འགུལ་གོ་སྒྲིག་མི་བྱེད་"
  );
  result = result.replaceAll("དྲུག་ཅུ་གྱ་བརྒྱད", "དྲུག་ཅུ་རེ་བརྒྱད");
  result = result.replaceAll("ཡག་ག", "ཡག་པོ");
  result = result.replaceAll("སེན་ཧ་རན་སེ་སི་ཁོ", "སན་ཧྥན་སི་སུ་ཁོ");
  result = result.replaceAll("མིན་པར་སྤྲོད་བྱས", "མིན་པ་ར་སྤྲོད་བྱས");
  result = result.replaceAll(
    "ཀྲུང་གུང་ཀྲུང་དབྱང་",
    "རྒྱ་ནག་དབུས་དམར་ཤོག་གཞུང་"
  );

  result = result.replaceAll("ཀུང་སིས", "སྤྱི་གཉེར་ཁང་གིས");
  result = result.replaceAll("ཀུང་སི", "སྤྱི་གཉེར་ཁང་");
  result = result.replaceAll("ཀུང་སིའི", "སྤྱི་གཉེར་ཁང་གི");
  result = result.replaceAll("ཀྲུང་གོའི", "རྒྱ་ནག་གི");
  result = result.replaceAll("ཀྲུང་གོས", "རྒྱ་ནག་གིས");
  result = result.replaceAll("ཀྲུང་གོ", "རྒྱ་ནག");
  result = result.replaceAll("ཆ་འཕྲིན", "བརྡ་འཕྲིན");
  result = result.replaceAll("བཅོས་མའི་རྣམ་དཔྱོད", "མིས་བཟོས་རིག་ནུས");

  result = result.replaceAll("རྒྱུད་གཅིག་ལམ་གཅིག་གྱི", "རྒྱུད་གཅིག་ལམ་གཅིག་གི");
  result = result.replaceAll(
    "སྨོན་ལམ་རིག་གནས་ཞིབ་འཇུག་ལྟེ་གནས",
    "སྨོན་ལམ་བརྡ་འཕྲིན་འཇུག་ཁང་"
  );
  result = result.replaceAll("་་", "་");
  result = result.replaceAll(
    "གཅིག་གྱུར་གསང་རྟགས",
    "རྒྱལ་སྤྱིའི་གཅིག་གྱུར་ཨང་རྟགས"
  );
  result = result.replaceAll(
    "བོད་ཀྱི་བརྡ་སྤྲོད་རིག་པའི་ཞིབ་འཇུག་ལྟེ་གནས",
    "སྨོན་ལམ་བོད་ཀྱི་བརྡ་འཕྲིན་ཞིབ་འཇུག་ཁང་"
  );
  result = result.replaceAll(
    "སྨོན་ལམ་རིག་རྩལ་ཞིབ་འཇུག་ལྟེ་གནས་ནི",
    "སྨོན་ལམ་བོད་ཀྱི་བརྡ་འཕྲིན་ཞིབ་འཇུག་ཁང་ནི"
  );
  result = result.replaceAll(
    "སྲིད་སྐྱོང་པཎ་ཆེན་ཚེ་རིང་",
    "སྲིད་སྐྱོང་སྤེན་པ་ཚེ་རིང་"
  );
  result = result.replaceAll("བསོད་ནམས་སི་ཆོས", "བསོད་ནམས་སྲིད་གཅོད་");
  result = result.replaceAll(
    "གོང་མ་སྲོང་བཙན་སྒམ་པོ",
    "བཙན་པོ་སྲོང་བཙན་སྒམ་པོ་"
  );
  result = result.replaceAll("དམངས་གཙོ", "མང་གཙོ");
  result = result.replaceAll(
    "སྨོན་ལམ་རིག་རྩལ་ཞིབ་འཇུག་ལྟེ་གནས",
    "སྨོན་ལམ་བརྡ་འཕྲིན་ཞིབ་འཇུག་ཁང་"
  );
  result = result.replaceAll("སྨོན་ལམ་གྱི་ཨར", "སྨོན་ལམ་རིག་ནུས");
  result = result.replaceAll(
    "སྨོན་ལམ་རིག་རྩལ་ལྟེ་གནས",
    "སྨོན་ལམ་བརྡ་འཕྲིན་ཞིབ་འཇུག་ཁང་"
  );
  result = result.replaceAll(
    "བོད་ཀྱི་བཟོ་བཀོད་རིག་རྩལ་གྱི",
    "བོད་ཀྱི་མིས་བཟོས་རིག་ནུས་ཀྱི"
  );
  result = result.replaceAll(
    "བོད་ཀྱི་བཟོ་བཀོད་རིག་རྩལ",
    "བོད་ཀྱི་མིས་བཟོས་རིག་ནུས"
  );

  result = result.replaceAll("སྨོན་ལམ་གྱི་རིག་རྩལ", "སྨོན་ལམ་རིག་ནུས");
  result = result.replaceAll(
    "ཀུན་སྤྱོད་ལྡན་པའི་ཨ་ལད་པད་ཀོག",
    "ཀུན་སྤྱོད་ལྡན་པའི་མིས་བཟོས་རིག་ནུས"
  );
  result = result.replaceAll(
    "ཨ་ལད་པད་ཀོག་གི་དབང་སྒྱུར",
    "མིས་བཟོས་རིག་ནུས་ཀྱི་དབང་སྒྱུར"
  );
  result = result.replaceAll("མིགཙེ་མ", "དམིགས་བརྩེ་མ");
  result = result.replaceAll(
    "རྒྱ་གྲམ་དམར་པོའི་སྲིད་འཛིན་གྱི",
    "རྒྱ་གྲམ་དམར་པོའི་ཚོགས་གཙོའི"
  );
  result = result.replaceAll("ཤིའི་ཅིན་ཕིན་", "ཞི་ཅིན་ཕིན");
  result = result.replaceAll("ཤཱི་ཡིས་བཤད་", "ཞི་ཡིས་བཤད་");
  result = result.replaceAll(
    "ཟླ་ཚེས་དམར་པོའི་ལས་འགུལ",
    "རྒྱ་གྲམ་དམར་པོ་ཚོགས་པའི་ལས་འགུལ"
  );
  result = result.replaceAll("ཤཱི་ཡི", "ཞི་ཡི");
  result = result.replaceAll("སྐེད་རགས་དང་ལམ", "རྒྱུད་གཅིག་ལམ་གཅིག");
  result = result.replaceAll(
    "རྒྱ་ནག་གི་སྲིད་བློན་ལི་ཁྲང་",
    "རྒྱ་ནག་གི་སྲིད་བློན་ལི་ཆང་"
  );
  result = result.replaceAll("ལི་ལག་པས", "ལི་ཆང་གིས");
  result = result.replaceAll(
    "ཡུ་རོབ་མཉམ་འབྲེལ་རྒྱལ་ཚོགས་ཀྱི",
    "རྒྱ་ནག་རྒྱལ་སྤྱིའི་ཚོང་འབྲེལ་གྱི་སྲི་ཞུའི་ཚོང་འདུས"
  );
  result = result.replaceAll("ཤཱི་ནི", "ཞི་ནི");
  result = result.replaceAll("སྲིད་འཛིན་ཤིའི་ཅིན་ཕིན་", "སྲིད་འཛིན་ཞི་ཅིན་ཕིན");
  result = result.replaceAll("སྐེ་རགས་དང་ལམ", "རྒྱུད་གཅིག་ལམ་གཅིག");
  result = result.replaceAll("ལམ་ཐིག་དང་སྐེ་རགས", "རྒྱུད་གཅིག་ལམ་གཅིག");
  result = result.replaceAll("བཅོས་མའི་རིག་རྩལ", "མིས་བཟོས་རིག་ནུས");
  result = result.replaceAll("སི་ཨེ་ཧི་ཊི་སི", "སི་ཨེ་ཧྥི་ཊི་སི");
  result = result.replaceAll("མཚོ་དམག་དར་གོས་ཀྱི་ལམ", "མཚོ་རྒྱུད་དར་ལམ");
  result = result.replaceAll(
    "དཀའ་ལས་བརྒྱབ་ནས་ཐོབ་པའི་རྒྱལ་ཁབ",
    "དཀའ་ལས་བརྒྱབ་ནས་ཐོབ་པའི་རྒྱལ་ཁ"
  );
  result = result.replaceAll(
    "རྒྱལ་སྤྱིའི་ཚོང་འབྲེལ་ཚོགས་པ",
    "རྒྱ་ནག་རྒྱལ་སྤྱིའི་ཚོང་འབྲེལ་གྱི་སྲི་ཞུའི་ཚོང་འདུས"
  );
  result = result.replaceAll(
    "རྒྱ་ནག་གི་རྒྱལ་སྤྱིའི་ཚོང་འདུས་ཚོགས་པ་ཡུ་རོབ་མཉམ་འབྲེལ་རྒྱལ་ཚོགས་དང་",
    "རྒྱ་ནག་རྒྱལ་སྤྱིའི་ཚོང་འབྲེལ་གྱི་སྲི་ཞུའི་ཚོང་འདུས་དང་"
  );
  result = result.replaceAll("ལག་ཐོགས་ཁ་པར", "ལག་འཁྱེར་ཁ་པར");

  result = result.replaceAll("ཤིན་ཏཱ་ཞིང་ཆེན", "ཧྲན་ཏུང་ཞིང་ཆེན་");
  result = result.replaceAll(
    "བཟོ་ལས་རིག་པས་མིའི་འཕྲུལ་ཆས་ཀྱི",
    "མིས་བཟོས་རིག་ནུས་འཕྲུལ་རིག་གི"
  );
  result = result.replaceAll(
    "རྒྱ་གྲམ་དམར་པོའི་སྲིད་འཛིན་གྱིས",
    "རྒྱ་གྲམ་དམར་པོའི་ཚོགས་གཙོས"
  );
  result = result.replaceAll("བསམ་བློའི་དཔྱད་ཞིབ་ཁང་", "བློ་འདོན་ཁང་");
  result = result.replaceAll("བསམ་བློའི་ཚོགས་ཆུང་གིས", "བློ་འདོན་ཁང་གིས");
  result = result.replaceAll("བསམ་བློའི་ཚོགས་ཆུང་གི", "བློ་འདོན་ཁང་གི");
  result = result.replaceAll(
    "བསམ་བློ་གཏོང་མཁན་གྱི་ཚོགས་པ་དེས",
    "བློ་འདོན་ཁང་གིས"
  );
  result = result.replaceAll(
    "བསམ་བློ་གཏོང་མཁན་གྱི་ཚོགས་པ་དེ",
    "བློ་འདོན་ཁང་གི"
  );
  result = result.replaceAll("དར་གོས་ཀྱི་ལམ", "དར་གོས་ཚོང་ལམ");
  result = result.replaceAll("ཌུན་ཧོང་གི་ཞབས་བྲོ", "ཏུན་ཧོང་གི་ཞབས་བྲོ");
  result = result.replaceAll("ཌུན་ཧོང་གི་སྒྱུ་རྩལ", "ཏུན་ཧོག་གི་སྒྱུ་རྩལ");
  result = result.replaceAll("དར་གོས་ཀྱི", "དར་གོས་ཚོང་ལམ");
  result = result.replaceAll("ཌུན་ཧོང་", "ཏུན་ཧོང་");
  result = result.replaceAll("ཧུ་ཀྲན་ཞིང་ཆེན་", "ཧྥུའུ་ཅན་ཞིང་ཆེན་");
  result = result.replaceAll("ཤིའི་ཅིན་ཕིན", "ཞི་ཅིན་ཕིན");
  result = result.replaceAll("ཤཱི་ཡིས་", "ཞི་ཡིས་");
  result = result.replaceAll("ཤཱི་ཡི་", "ཞི་ཡི་");
  result = result.replaceAll("ཤཱི་ལ་", "ཞི་ལ་");
  result = result.replaceAll("ཞིན་ཧྭ་", "ཤིན་ཧྭ་");
  result = result.replaceAll(
    "མེ་འོན་གཙུག་ལག་སློབ་གྲྭ་ཆེན་མོའི་སློབ་གྲྭའི",
    "མེས་དབོན་གཙུག་ལག་དཔེ་སྟོན་སློབ་གྲྭའི"
  );
  result = result.replaceAll("སོགས་ཀྱིས་རྐྱེན་པས", "སོགས་ཀྱི་རྐྱེན་པས");
  result = result.replaceAll("ཀུན་མཆོག་མིག་དམར", "དཀོན་མཆོག་མིག་དམར");
  result = result.replaceAll(
    "སྨད་གཡོག་དཔེ་སྟོན་སློབ་གྲྭ",
    "མེས་དབོན་གཙུག་ལག་དཔེ་སྟོན་སློབ་གྲྭ"
  );
  result = result.replaceAll(
    "ཤེས་རབ་དགའ་ཚལ་བློ་བཟང་གླིང་",
    "ཤེས་རབ་དགའ་ཚལ་སློབ་གླིང་"
  );
  result = result.replaceAll("སྐྱིད་སྐྱོང་གིས", "སྲིད་སྐྱོང་གིས");
  result = result.replaceAll("རྙིང་སྟོབས་གླིང་", "སྙིང་སྟོབས་གླིང་");
  result = result.replaceAll("རྡ་རམ་ས་ལ", "དྷ་རམ་ས་ལ");
  result = result.replaceAll(
    "རྗེ་རིན་པོ་ཆེར་བསྟོད་པ་མིག་ཏིག་མ",
    "རྗེ་རིན་པོ་ཆེའི་བསྟོད་པ་དམིགས་བརྩེ་མ"
  );
  result = result.replaceAll("ཁག་གཅིག་གིས", "ཁག་ཅིག་གིས");
  result = result.replaceAll("ཁག་གཅིག་གི", "ཁག་ཅིག་གི");
  result = result.replaceAll("ལྷོ་ཤར་ཨེ་ཤི་ཡ", "ལྷོ་ཤར་ཨེ་ཤེ་ཡ");
  result = result.replaceAll("བཀླག་བཞིན་པའི", "ཀློག་བཞིན་པའི");
  result = result.replaceAll("དྷ་རྨ་ཤཱལ", "དྷ་རམ་ས་ལ");
  result = result.replaceAll("ཤིའི་ཅིན་ཕིན་", "ཞི་ཅིན་ཕིན་");
  result = result.replaceAll("ཐེ་ཝན་", "ཐའེ་ཝན་");
  result = result.replaceAll("ཐའི་ཝན་", "ཐའེ་ཝན་");
  result = result.replaceAll(
    "བོད་རང་སྐྱོང་ལྗོངས་གྲ་སྒྲིག་ལྷན་ཁང་གི",
    "བོད་མིའི་སྒྲིག་འཛུགས་ཕྱི་དྲིལ་ལས་ཁུངས་ཀྱི"
  );
  result = result.replaceAll("ཊོག་ཀྱོ", "ཊོཀ་ཁྱོ");
  result = result.replaceAll("ལུའུ་སེ་ཁྲན", "ལུའུ་སི་ཁྲིན");
  result = result.replaceAll("ཨོ་སི་ི་རི་ལི་ཡ", "ཨོ་སི་ཊོ་ལི་ཡ");
  result = result.replaceAll("གོ་ལ་གསར་ཤོག", "གོ་ལའི་དུས་བབ");
  result = result.replaceAll("མང་གཙོའི་ཏང", "མང་གཙོ་ཚོགས་པ");
  result = result.replaceAll("ཤིན་ཧྭ", "ཞིན་ཧྭ");
  result = result.replaceAll("གསར་ཤོག་གོ་ལ་དུས་བབ", "གོ་ལའི་དུས་བབ་གསར་ཤོག");
  result = result.replaceAll("ཧིན་དྷུ་ཉེ་ཤི་ཡ", "ཨིན་ཌོ་ནེ་ཤི་ཡ");
  result = result.replaceAll(
    "སྐེ་རགས་དང་ལམ་བཟོའི་ལས་གཞི",
    "རྒྱུད་གཅིག་ལམ་གཅིག་གི་ལས་གཞི"
  );
  result = result.replaceAll("ཝེ་ཌོ་ཌོ", "ཇོ་ཀོ་ཝི་ཌོ་ཌོ");
  result = result.replaceAll("ཡུ་ཁི་རན", "ཡུག་ཁི་རན");
  result = result.replaceAll("སིང་ག་པོར", "སིང་ག་པུར");
  result = result.replaceAll("བཅོས་མའི་རིག་རྩལ", "མིས་བཟོས་རིག་ནུས");
  result = result.replaceAll("བྱེེད", "བྱེད");
  result = result.replaceAll(
    "སྐེད་རགས་དང་ལམ་གྱི་ལས་འཆར",
    "རྒྱུད་གཅིག་ལམ་གཅིག་གི་ལས་འཆར"
  );
  result = result.replaceAll("ཨེ་ཤི་ཡ", "ཨེ་ཤེ་ཡ");
  result = result.replaceAll("གནས་བབས", "གནས་བབ");
  result = result.replaceAll("ཧོན་ཀོང་", "ཧོང་ཀོང་");
  result = result.replaceAll("རྒྱ་ནག་སྐམ་ས་ཆེན་པོ", "རྒྱ་ནག་སྐམ་ས་ཆེན་མོ");
  result = result.replaceAll("ཧང་སྒོར", "ཧོང་སྒོར");
  result = result.replaceAll("བཅོས་མའི་རིག་ནུས", "མིས་བཟོས་རིག་ནུས");
  result = result.replaceAll(
    "ཨ་ཕོན་བེད་སྤྱོད་བྱེད་མཚམས་འཇོག",
    "ཀུ་ཤུ་ཁ་པར་བེད་སྤྱོད་བྱེད་མཚམས་འཇོག"
  );
  result = result.replaceAll("རྒྱ་ནག་གི་ཧུའུ་ཝེ", "རྒྱ་ནག་གི་ཧྭ་ཝེ");
  result = result.replaceAll("ཧོ་ཝེ", "ཧྭ་ཝེ");
  result = result.replaceAll("ཝ་ཞིན་ཊོན", "ཝ་ཤིན་ཊོན");
  result = result.replaceAll("ཧཱ་ཝེ་བཟོ་ལས", "ཧྭ་ཝེ་བཟོ་ལས");
  result = result.replaceAll("ཧུའུ་ཝེ", "ཧྭ་ཝེ");
  result = result.replaceAll("ཀུ་ཤུ་ཡི་ཁ་པར", "ཀུ་ཤུ་ཁ་པར");
  result = result.replaceAll("ཧོ་ཝེ་དང་འབྲེལ་ཡོད", "ཧྭ་ཝེ་དང་འབྲེལ་ཡོད");
  result = result.replaceAll("ཧའོ་ཝེ", "ཧྭ་ཝེ");
  result = result.replaceAll("ཕུ་ཁུ་ཤི་མ", "ཧྥུ་ཀུ་ཤི་མ");
  result = result.replaceAll("ཧུ་ཁུ་ཤི་མ", "ཧྥུ་ཀུ་ཤི་མ");
  result = result.replaceAll("ཧུའུ་ཁུ་ཤི་མ", "ཧྥུ་ཀུ་ཤི་མ");
  result = result.replaceAll(
    "ཉེན་རྟོག་ལས་ཁུངས་ཀྱི་ཀྲུའུ་རེན",
    "ཉེན་རྟོག་ལས་ཁུངས་ཀྱི་འགན་འཛིན"
  );
  result = result.replaceAll("རྒྱལ་སྲུང་པུའུ", "རྒྱལ་སྲུང་ལྷན་ཁང་");
  result = result.replaceAll("དགའ་བསུ་ཞུ་གི་ཡོད་", "དགའ་བསུ་ཞུ་ཡི་ཡོད་");
  result = result.replaceAll("ཧུའུ་ཝེ་བཟོ་ལས", "ཧྭ་ཝེ་བཟོ་ལས");
  result = result.replaceAll("ཧི་ལི་ཕིན", "ཧྥི་ལི་པིན");
  result = result.replaceAll("མ་ལེ་ཤི་ཡ", "མ་ལེ་ཞི་ཡ");
  result = result.replaceAll("མ་ལེ་ཤི་ཡས", "མ་ལེ་ཞི་ཡས");
  result = result.replaceAll(" སིང་གྷ་ཕོ", "སིངྒ་པུར");
  result = result.replaceAll("ཧིན་དྷུ་ཉེ་ཤི་ཡ", "ཧིན་དྷུ་ཉི་ཞི་ཡ");
  result = result.replaceAll("མཉམ་སྦྲེལ་རྒྱལ་ཚོགས", "མཉམ་འབྲེལ་རྒྱལ་ཚོགས");
  result = result.replaceAll(" ཐེ་ལན", " ཐའེ་ལན");
  result = result.replaceAll(" ཨོ་སི་ཊོ་ལི་ཡ", " ཨོ་སི་ཁྲུ་ལི་ཡ");
  result = result.replaceAll("ཁམ་བྷོ་ཌི་ཡ", "ཀམ་བྷོ་ཌི་ཡ");
  result = result.replaceAll("ལོ་སི", "ལའོ་སི");
  result = result.replaceAll("མེན་མར", "འབར་མ");
  result = result.replaceAll(
    "ཨ་རིའི་སྲིད་འཛིན་ཇོའེ་བའེ་ཌེན",
    "ཨ་རིའི་སྲིད་འཛིན་རྗོ་བྷེ་ཌེན"
  );
  result = result.replaceAll("ཀོ་རོ་ན་ཝའི་ནད་ཡམས", "ཀོ་རོ་ནའི་ནད་ཡམས");
  result = result.replaceAll("ཤིའི་ཅིན་ཕིང", "ཞིས་ཅིན་ཕིང");

  result = result.replaceAll("གྲོང་ཁྱེར་པུ་རག", "གྲོང་ཁྱེར་པ་རག");
  result = result.replaceAll(
    "པུ་རག་རྒྱལ་སྤྱིའི་ཚོགས་འདུ",
    "པ་རག་རྒྱལ་སྤྱིའི་ཚོགས་འདུ"
  );

  result = result.replaceAll("ཨོ་སི་ཊོ་ལི་ཡ", "ཨོ་སི་ཊི་ལི་ཡ");
  result = result.replaceAll("ཨོ་སི་ཁྲུ་ལི་ཡ", "ཨོ་སི་ཊི་ལི་ཡ");
  result = result.replaceAll("མི་དམངས", "མི་མང་");
  result = result.replaceAll("རྒྱ་ནག་དམར་ཕྱོགས", "རྒྱ་ནག་དམར་ཤོག");
  result = result.replaceAll(
    "རྒྱ་གྲམ་དམར་པོའི་སྲིད་འཛིན",
    "རྒྱ་གྲམ་དམར་པོའི་ཚོགས་གཙོ"
  );
  result = result.replaceAll("སྲིད་འཛིན་ཤིའི་ཅིན་ཕིན", "སྲིད་འཛིན་ཞི་ཅིན་ཕིན");
  result = result.replaceAll("ཤཱི་ཡིས་བཤད", "ཞི་ཡིས་བཤད");
  result = result.replaceAll("ཤཱི་ཡིས", "ཞི་ཡིས");
  result = result.replaceAll("མེལ་ཝིན་གོལ་ཌ་སི་ཊེན", "མེལ་ཝིན་སི་གྷོལྜ་སི་ཊེན");
  result = result.replaceAll("ཟི་དགའ་ཟེ", "གཞིས་ཀ་རྩེ");
  result = result.replaceAll("རི་བོ་རྩེ་ལྔའི་དམག་སྒར", "ཇོ་མོ་གླང་མའི་སྒར་ས");
  result = result.replaceAll("ཤིན་ཅང་", "ཤར་ཏུར་ཀི་སི་ཐན");
  result = result.replaceAll("ཉན་ཚང་", "ནན་ཁྲང་");
  result = result.replaceAll("ནན་ཅང་", "ནན་ཁྲང་");
  result = result.replaceAll("ཨེ་ཤི་ཡ", "ཨེ་ཤ་ཡ");
  result = result.replaceAll("ཀྲི་ཅ་ཀྲང་", "ཧྲི་ཅ་ཀྲང་");
  result = result.replaceAll("ཤིས་ཅ་ཀྲང་", "ཧྲི་ཅ་ཀྲང་");
  result = result.replaceAll("ཧེ་བེ་ཞིང་ཆེན", "ཧེ་པེ་ཞིང་ཆེན");
  result = result.replaceAll("༦ཤིན་ཧ།", "ཕྱི་ཟླ་དགུ་པའི་ཚེས་དྲུག ཤིན་ཧྭ།");
  result = result.replaceAll("ཨེ་ཤི་ཡ", "ཨེ་ཤ་ཡ");
  result = result.replaceAll("ཨོ་སི་ཊོ་ལི་ཡས", "ཨོ་སི་ཀྲོ་ལི་ཡས");
  result = result.replaceAll("ཨོ་སི་ཊོ་ལི་ཡའི", "ཨོ་སི་ཀྲོ་ལི་ཡའི");
  result = result.replaceAll("པྲི་མུའུ་ལ", "པི་རི་མུའུ་ལ");
  result = result.replaceAll("པི་རི་མུ་ལ", "པི་རི་མུའུ་ལ");
  result = result.replaceAll("ཕི་རི་མུ་ལ", "པི་རི་མུའུ་ལ");
  result = result.replaceAll("པྲ་མོ་ལ", "པི་རི་མུའུ་ལ");
  result = result.replaceAll("ཟི་ནུའུ།", "ཤིན་ཧྭ།");
  result = result.replaceAll("ལན་ཀྲོའུ་", "ལན་ཀྲུའུ་");
  result = result.replaceAll("ཧེ་ཅང་ཞིང་ཆེན་", "ཧེ་ལུང་ཅང་ཞིང་ཆེན་");
  result = result.replaceAll(
    "ཞི་ལུང་ཆུ་ལོག་གིས་རྒྱ་ནག་གི་ཧེ་ཅང་ཞིང་ཆེན་གྱི་གྲོང་གསེབ་མང་པོར་ཤུགས་རྐྱེན་ཐེབས་ཡོད།",
    "ཞི་ཅིན་ཕིན་གྱིས་རྒྱ་ནག་གི་བྱང་ཤར་ཧེ་ལུང་ཅང་ཞིང་ཆེན་གྱི་ཆུ་ལོག་གི་གནོད་འཚེ་ཐེབས་པའི་སྡེ་དམངས་ལ་གཟིགས་ཞིབ་མཛད།"
  );
  result = result.replaceAll("ཀྲུང་དབྱང་", "དབུས་");
  result = result.replaceAll("ཤཱི་ཅིན་ཕིང་", "ཞི་ཅིན་ཕིན་");
  result = result.replaceAll(
    "ལོང་ཝང་རྨོའོ་གྲོང་ཚོའི་ནང་དུ་ཤཱི་ཡས་མཆུས་འབྲས་ཞིང་སྟེང་དུ་ཆུ་ལོག་བྱུང་ནས་འབྲས་ཀྱི་ལོ་ཏོག་ལ་ཤུགས་རྐྱེན་གང་འདྲ་ཐེབས་མིན་ལྟ་བར་འགྲོ་གི་ཡོད།",
    "ཞི་ཅིན་ཕིན་གྱིས་ལུའུ་ཝང་མེའོ་གྲོང་སྡེའི་ཞིང་ཁར་ཕེབས་ཆུ་ལོག་གིས་ལོ་ཏོག་ལ་ཐེབས་པའི་ཤུགས་རྐྱེན་ལ་ལྟ་ཞིབ་གནང་བ་རེད།"
  );
  result = result.replaceAll(
    "ཀྲུང་གུང་དམག་དོན་ལྷན་ཁང་གི་གཙོ་འཛིན་ཡིན་པའི་ཤཱི་ཅིན་ཕིང་",
    "རྒྱ་ནག་དམར་ཤོག་དབུས་དམག་དོན་ལྷན་ཁང་གི་གཙོ་འཛིན་ཡིན་པའི་ཞི་ཅིན་ཕིན་"
  );
  result = result.replaceAll(
    "རྒྱ་ནག་གུང་ཁྲན་ཏང་རྒྱ་ནག་དབུས་དམར་ཤོག་གཞུང་ལྷན་ཁང་གི་དྲུང་ཡིག་ཆེན་མོ་ཞིའི་ཅིན་ཕིན།",
    "རྒྱ་ནག་དམར་ཤོག་དབུས་གཞུང་གི་སྤྱི་ཁྱབ་དྲུང་ཆེ་ཞི་ཅིན་ཕིན།"
  );
  result = result.replaceAll(
    "རྒྱ་ནག་གི་སྲིད་འཛིན་དང་ཀྲུང་དབྱང་དམག་དོན་ལྷན་ཁང་གི་ཚོགས་གཙོ།",
    "རྒྱ་ནག་གི་སྲིད་འཛིན་དང་དབུས་དམག་དོན་ལྷན་ཁང་གི་ཚོགས་གཙོ།"
  );
  result = result.replaceAll("ཞིན་ཧྭ", "ཤིན་ཧྭ");
  result = result.replaceAll(
    "སྲིད་འཛིན་ཞིའི་ཅིན་ཕིང་",
    "སྲིད་འཛིན་ཞི་ཅིན་ཕིན་"
  );
  result = result.replaceAll(
    "རྒྱ་ནག་གི་སྲིད་བློན་ལི་ཆེང་",
    "རྒྱ་ནག་གི་སྲིད་བློན་ལི་ཆང་"
  );
  result = result.replaceAll("ཨེ་ཤེ་ཡ", "ཨེ་ཤ་ཡ");
  result = result.replaceAll("ཤར་ཨེ་ཤེ་ཡ", "ཤར་ཨེ་ཤེ་ཡ");
  result = result.replaceAll("ཕྱེ་བྲལ་", "གྱེས་བྲལ་");
  result = result.replaceAll(
    "རྒྱལ་ཁབ་༩༠ ལྷག་གི་སྐུ་ཚབ་ཀྱིས་རྒྱལ་སྤྱིའི་མཉམ་ལས་སྐོར་གྱི་ཚོགས་འདུ་ཐེངས་གསུམ་པའི་ནང་དུ་ཞུགས་རྒྱུ་གཏན་འཁེལ་བྱས་ཡོད། མགྲིན་ཚབ་པ།",
    "རྒྱལ་ཁབ་༩༠ལྷག་གི་སྐུ་ཚབ་ཀྱིས་རྒྱུད་གཅིག་ལམ་གཅིག་གི་མཉམ་ལས་གླེང་སྟེགས་སྐབས་གསུམ་པར་ཞུགས་རྒྱུར་གཏན་འཁེལ་བྱས། མགྲིན་ཚབ་པ།"
  );
  result = result.replaceAll(
    "རྒྱ་ནག་མི་མང་སྤྱི་མཐུན་རྒྱལ་ཁབ་ཀྱི་རྩ་ཁྲིམས།",
    "རྒྱ་ནག་མི་དམངས་སྤྱི་མཐུན་རྒྱལ་ཁབ་ཀྱི་རྩ་ཁྲིམས།"
  );
  result = result.replaceAll(
    "མི་མང་འཐུས་མིའི་ཚོགས་ཆེན་",
    "མི་དམངས་འཐུས་མི་ཚོགས་ཆེན་"
  );
  result = result.replaceAll(
    "རྒྱ་ནག་མི་མང་སྤྱི་མཐུན་རྒྱལ་ཁབ་",
    "རྒྱ་ནག་མི་དམངས་སྤྱི་མཐུན་རྒྱལ་ཁབ་"
  );
  result = result.replaceAll("ཀྲུའུ་ཞི་མའོ་ཙེ་ཏུང་", "ཚོགས་གཙོ་མའོ་ཙེ་ཏུང་");
  result = result.replaceAll("རྒྱ་ནག་གུང་ཁྲན་ཚོགས་པ", "རྒྱ་ནག་དམར་ཤོག་ཚོགས་པ");
  result = result.replaceAll("རྒྱ་ནག་མི་མང་", "རྒྱ་ནག་མི་དམངས་");
  result = result.replaceAll("འཐུས་མི་གསུམ་གྱི་ལྟ་བ།", "མཚོན་བྱེད་གསུམ།");
  result = result.replaceAll(
    "མའོ་ཙེ་ཏུང་གི་བསམ་བློ།",
    "མའོ་ཙེ་ཏུང་གི་དགོངས་པ།"
  );
  result = result.replaceAll(
    "ཏེང་ཞའོ་ཕིང་གི་ལྟ་བ།",
    "ཏེང་ཞའོ་ཕིང་གི་རིགས་པའི་གཞུང་ལུགས།"
  );
  result = result.replaceAll(
    "ཡར་རྒྱས་ཀྱི་ཚན་རིག་གི་ལྟ་ཚུལ་",
    "ཚན་རིག་དང་མཐུན་པའི་འཕེལ་རྒྱས་ལྟ་བ་"
  );
  result = result.replaceAll("ཚན་རིག་ཚན་རྩལ་", "ཚན་རིག་ལག་རྩལ་");
  result = result.replaceAll("མི་མང་ཀྱིས་", "མི་དམངས་ཀྱིས་");
  result = result.replaceAll("རྒྱ་ནག་གུང་ཁྲན་ཚོགས་པ", "རྒྱ་ནག་དམར་ཤོག་ཚོགས་པ");
  result = result.replaceAll(
    "རྒྱ་ནག་མི་མང་སྤྱི་མཐུན་རྒྱལ་ཁབ་",
    "རྒྱ་ནག་མི་དམངས་སྤྱི་མཐུན་རྒྱལ་ཁབ་"
  );
  result = result.replaceAll(
    "འབྲེལ་ལམ་བཙུགས་དང་མུ་མཐུད་སྲ་བརྟན་དུ་གཏོང་ངེས།",
    "འབྲེལ་ལམ་འཛུགས་པ་དང་མུ་མཐུད་སྲ་བརྟན་དུ་གཏོང་ངེས།"
  );
  result = result.replaceAll("ཆའོ་ཝི་ནོ་རིང་ལུགས་", "མི་རིགས་རིང་ལུགས་");
  result = result.replaceAll(
    "ཆའོ་ཝི་ནི་གཙོ་ཆེར་ཧན་ཆའོ་ཝི་ནོ་རིང་ལུགས་དང་ས་གནས་མི་རིགས་ཀྱི་ཆའོ་ཝི་ནོ་རིང་ལུགས་ལ་གོ་དགོས།",
    "མི་རིགས་རིང་ལུགས་ནི་གཙོ་ཆེར་རྒྱ་མི་རིགས་རིང་ལུགས་དང་ས་གནས་ཀྱི་མི་རིགས་རིང་ལུགས་ལ་གོ་དགོས།"
  );
  result = result.replaceAll(
    "རྒྱ་ནག་གུང་ཁྲན་ཚོགས་པའི་སྤྱི་ཁྱབ་དྲུང་ཆེན།",
    "རྒྱ་ནག་དམར་ཤོག་ཚོགས་པའི་སྤྱི་ཁྱབ་དྲུང་ཆེ།"
  );
  result = result.replaceAll(
    "རྒྱ་ནག་གུང་ཁྲན་ཏང་རྒྱ་ནག་དབུས་དམར་ཤོག་གཞུང་ལྷན་ཁང་གི་དྲུང་ཡིག་ཆེན་མོ།",
    "རྒྱ་ནག་དབུས་དམར་ཤོག་ཚོགས་པའི་སྤྱི་ཁྱབ་དྲུང་ཆེ།"
  );
  result = result.replaceAll(
    "ཨེ་ཤེ་ཡའི་རྒྱལ་ཁབ་རྣམས་",
    "ལྷོ་ཤར་ཨེ་ཤ་ཡའི་རྒྱལ་ཁབས་རྣམས་"
  );
  result = result.replaceAll("ཆབ་སྲིད་ཀྱི", "ས་ཁམས་ཆབ་སྲིད་ཀྱི");
  result = result.replaceAll(
    "རྒྱ་ནག་དང་ཨེ་ཤེ་ཡ་གཉིས་ཀྱིས་",
    "རྒྱ་ནག་དང་ལྷོ་ཤར་ཨེ་ཤེ་ཡའི་མནའ་འབྲེལ་མཐུན་ཚོགས་གཉིས་ཀྱིས་"
  );
  result = result.replaceAll("སྲིད་བློན་ལི་ཁྲེང་", "སྲིད་བློན་ལི་ཆང་");
  result = result.replaceAll(
    "རྒྱ་ནག་དང་ཨེ་ཤེ་ཡའི་རྒྱལ་ཁབ་གཉིས་ཀྱིས་",
    "རྒྱ་ནག་དང་ལྷོ་ཤར་ཨེ་ཤེ་ཡའི་མནའ་འབྲེལ་མཐུན་ཚོགས་གཉིས་ཀྱིས་"
  );
  result = result.replaceAll(
    "ཕན་ཚུན་རྟེན་ཅིང་འབྲེལ་བར་འབྱུང་བ་ནི་གོ་སྐབས་ཤིག་ཡིན།",
    "ཕན་ཚུན་བརྒྱུད་སྦྲེལ་རང་བཞིན་ཇེ་ལེགས་སུ་གཏོང་དགོས།"
  );
  result = result.replaceAll("གོས་ཆེན་ལྕགས་ལམ", "དར་གོས་ཚོང་ལམ");
  result = result.replaceAll("ཁུ་རན་གསུང་རབ", "ཀོ་རན་གསུང་རབ");
  result = result.replaceAll("གཤན་ཏུང", "ཧྲན་ཏུང");
  result = result.replaceAll(
    "བསྟན་སེལ་སྤྱི་གཉེར་ཁང་འི་Tencent",
    "ཊེན་སེན་ཊི་སྤྱི་གཉེར་ཁང་གི"
  );

  result = result.replaceAll("མེར་པོ་ུའུ་", "མེར་པོའུ་");
  result = result.replaceAll("ལྷོ་ཁོ་རེ་ཡ", "ལྷོ་ཀོ་རེ་ཡ");
  result = result.replaceAll("བྱང་ཁོ་རེ་ཡ", "བྱང་ཀོ་རེ་ཡ");
  result = result.replaceAll("ཁོ་རེ་ཡ་ལྷོ་བྱང་གཉིས", "ཀོ་རེ་ཡ་ལྷོ་བྱང་གཉིས");
  result = result.replaceAll("ཀྲུང་དབྱང་ལྷན་ཁང་", "དབུས་གཞུང་ལྷན་ཁང་");
  result = result.replaceAll("ཀྲུང་དབྱང་མི་དམངས", "དབུས་གཞུང་མི་དམངས");
  result = result.replaceAll("ཧ་རན་སུ", "ཧྥ་རན་སི");
  result = result.replaceAll("ཤིན་ཅིན་ཕིན", "ཞིས་ཅིན་ཕིན");
  result = result.replaceAll("མའོ་སི་ཁཱོ", "མོ་སི་ཁཱོ");
  result = result.replaceAll("པེ་ཅིན་གྱི", "པེ་ཅིང་གི");
  result = result.replaceAll("ཧཱ་ཝེ", "ཧྭ་ཝེ");
  result = result.replaceAll("ཆབ་སྲིད་པུའུ", "ཆབ་སྲིད་ལྷན་ཁང");
  result = result.replaceAll(" བྱང་ཨ་མེ་རི་ཁ", " བྱང་ཨ་མེ་རི་ཀ");
  result = result.replaceAll(
    "རྒྱ་ནག་ལྷོ་ཕྱོགས་ཀྱི་ཞོགས་པའི་སྦྲག་ཁང",
    "རྒྱ་ནག་ལྷོ་ཕྱོགས་ཞོགས་པའི་ཚགས་པར"
  );
  result = result.replaceAll("ཨ་ལ་བྷ་བྷ་དྲྭ་ཚིགས", "ཨ་ལི་བྷ་བྷ་དྲྭ་ཚིགས");
  result = result.replaceAll("ཡོ་རོབ", "ཡུ་རོབ");
  result = result.replaceAll("ཨ་ལ་བྷ་བྷ", "ཨ་ལི་བྷ་བྷ");
  result = result.replaceAll("ཨ་ལི་བྷ་བྷཱ་", "ཨ་ལི་བྷ་བྷ");
  result = result.replaceAll("ཡོ་རོབ་ནུབ་མ", "ཡུ་རོབ་ནུབ་མ");
  result = result.replaceAll("ཨོ་སི་ཊི་ལི་ཡ", "ཨོ་སི་ཁྲུ་ལི་ཡ");
  result = result.replaceAll(
    "རིག་གནས་གསར་བརྗེའི་སྐབས་སུ་གྲགས་ཆེ་བའི་མིག་དཔེར་འོས་པའི་ལྷ་མོའི་འཁྲབ་གཞུང་བརྒྱད",
    "རིག་གནས་གསར་བརྗེའི་སྐབས་སུ་གྲགས་ཆེ་བའི་མིག་དཔེར་འོས་པའི་ཟློས་གར་འཁྲབ་གཞུང་བརྒྱད"
  );
  result = result.replaceAll("སྲིད་བློན་ལི་ཁྲེང", "སྲིད་བློན་ལི་ཆང་");
  result = result.replaceAll(
    "ཀྲུང་དབྱང་དམག་དོན་ལྷན་ཁང",
    "དབུས་གཞུང་དམག་དོན་ལྷན་ཁང"
  );
  result = result.replaceAll("ཊོག་ཀྱེ", "ཊོག་ཀྱོ");
  result = result.replaceAll(" པེ་ཅིན་ན་ཡོད", " པེ་ཅིང་ན་ཡོད");
  result = result.replaceAll("ཕ་རེ་སིའི་གྲོས་མཐུན", "ཕེ་རེ་སིའི་གྲོས་མཐུན");
  result = result.replaceAll("འབགས་བཙོག", "འབག་བཙོག");
  result = result.replaceAll("ཨེ་ཤ་ཡའི", "ཨེ་ཤེ་ཡའི");

  result = result.replaceAll("་པོ་ས་", "་པོས་");
  result = result.replaceAll(
    "བསམ་ལམ་ཨང་ཏ་རིག་པའི་ཞིབ་འཇུག་ལྟེ་གནས་",
    "སྨོན་ལམ་བརྡ་འཕྲིན་ཞིག་འཇུག་ཁང་"
  );
  result = result.replaceAll("རྩིས་འཁོར", "གློག་ཀླད");
  result = result.replace(
    "།དེ་ནས་བཅོམ་ལྡན་འདས་ཀྱིས་འཇམ་དཔལ་གཞོན་ནུར་གྱུར་པ་ལ་འདི་སྐད་ཅེས་བཀའ་སྩལ་ཏོ། །འཇམ་དཔལ་གཞོན་ནུར་གྱུར་པ་འདིས་དེ་བཞིན་གཤེགས་པ་དགྲ་བཅོམ་པ་ཡང་དག་པར་རྫོགས་པའི་སངས་རྒྱས་རིག་པ་དང་ཞབས་སུ་ལྡན་པ། བདེ་བར་གཤེགས་པ། འཇིག་རྟེན་མཁྱེན་པ། སྐྱེས་བུ་འདུལ་བའི་ཁ་ལོ་སྒྱུར་བ། བླ་ན་མེད་པ། ལྷ་དང་མི་རྣམས་ཀྱི་སྟོན་པ་སངས་རྒྱས་བཅོམ་ལྡན་འདས་ཤཱཀྱ་ཐུབ་པ་ཞེས་བྱ་བ་ཞིག་འཇིག་རྟེན་དུ་བྱུང་སྟེ།",
    ""
  );
  result = result.replaceAll("རྩིས་འཁོར", "གློག་ཀླད");
  result = result.replaceAll(
    "བསམ་ལམ་ཨང་ཏ་རིག་པའི་ཞིབ་འཇུག་ལྟེ་གནས་",
    "སྨོན་ལམ་བརྡ་འཕྲིན་ཞིག་འཇུག་ཁང་"
  );
  result = result.replaceAll(
    "བྱང་ཆུབ་སེམས་དཔའི་སྤྱོད་པ་ལ་འཇུག་པ་ཞེས་བྱ་བ་སྟེ་ལེའུ་དང་པོའོ་༑༑",
    ""
  );
  //data: "
  result = result.replaceAll('data: "', "");
  result = result.replaceAll('"\n', "\n");
  result = result.replaceAll("ལྷོ་ཁོ་རེ་ཡ", "ལྷོ་ཀོ་རེ་ཡ");
  result = result.replaceAll("བྱང་ཁོ་རེ་ཡ", "བྱང་ཀོ་རེ་ཡ");
  result = result.replaceAll("ལས་ཆས", "མཉེན་ཆས");
  //result = result.replaceAll("\n\n", "\n");
  result = result.replaceAll("པོ་འི་", "པོའི");
  result = result.replaceAll("་་", "་");
  result = result.replaceAll("བ་འི", "་བའི");
  result = result.replaceAll("མཉམཉམཉེན", "མཉེན");
  result = result.replaceAll("མཎལ", "མཎྜལ");
  result = result.replaceAll("ཨ་ཧི་གྷ་ནི་སི་ཐན", "ཨ་ཧྥི་གྷ་ནི་སི་ཐན");
  result = result.replaceAll("ཨཕ་གྷ་ནི་སི་ཐན", "ཨ་ཧྥི་གྷ་ནི་སི་ཐན");
  result = result.replaceAll(
    "གྷི་ཨེན་ཨེམཊ",
    "གྷུས་གྷལ་དབང་རྩའི་ཡིག་སྒྱུར་རིག་ནུས"
  );
  result = result.replaceAll(
    "རྒྱ་ནག་དམར་ཤོག་ཚོགས་པ་དབུ་བརྙེས་ནས་ལོ་ངོ་བརྒྱ་དང་དྲུག་ཅུ",
    "རྒྱ་གྲམ་དམར་པོའི་ཚོགས་པ་དབུ་བརྙེས་ནས་ལོ་ངོ་བརྒྱ་དང་དྲུག་ཅུ"
  );
  result = result.replaceAll(
    "རྒྱ་ནག་དམར་ཤོག་ཚོགས་པ་དབུ་བརྙེས་པ་ནས་བཟུང་འདས་པའི་ལོ་ངོ་༡༦༠ རིང",
    "རྒྱ་གྲམ་དམར་པོའི་ཚོགས་པ་དབུ་བརྙེས་པ་ནས་བཟུང་འདས་པའི་ལོ་ངོ་ ༡༦༠ རིང"
  );
  result = result.replaceAll(
    "བཀའ་ཤག་སྐུ་ཕྲེང་བཅུ་དྲུག་པ",
    "བཀའ་ཤག་སྐབས་བཅུ་དྲུག་པ"
  );
  result = result.replaceAll("གཞིས་ལེན་གཟབ་རྒྱས", "གཞིས་ལེན་གཟབ་རྒྱས");
  result = result.replaceAll("སྐེད་རགས་དང་གཞུང་ལམ", "རྒྱུད་གཅིག་ལམ་གཅིག");
  result = result.replaceAll("ཨང་ཀིའི་ཞབས་ཞུ", "གྲངས་འཛིན་ཞབས་ཞུ");
  result = result.replaceAll("ཨང་ཀིའི་སྤྱི་ཚོགས", "གྲངས་འཛིན་སྤྱི་ཚོགས");
  result = result.replaceAll("ཨང་ཀིའི་འགྱུར་ལྡོག", "གྲངས་འཛིན་འགྱུར་ལྡོག");
  //སྤྱིར་བཚོགས
  result = result.replaceAll("ཨང་ཀི་ཅན", "གྲངས་འཛིན");
  result = result.replaceAll("སྤྱིར་བཚོགས", "སྤྱིར་ཚོགས");
  result = result.replaceAll("༑་", "། ");
  result = result.replaceAll("་༑", "། ");
  result = result.replaceAll("༑༑", "།། ");
  result = result.replaceAll("་།", "།");
  result = result.replaceAll("ང།", "ང་།");

  result = result.replaceAll("༑", "།");

  result = result.replaceAll("་༠", "་ ༠");
  result = result.replaceAll("་༡", "་ ༡");
  result = result.replaceAll("་༢", "་ ༢");
  result = result.replaceAll("་༣", "་ ༣");
  result = result.replaceAll("་༤", "་ ༤");
  result = result.replaceAll("་༥", "་ ༥");
  result = result.replaceAll("་༦", "་ ༦");
  result = result.replaceAll("་༧", "་ ༧");
  result = result.replaceAll("་༨", "་ ༨");
  result = result.replaceAll("་༩", "་ ༩");

  result = result.replaceAll("༠་", "༠ ");
  result = result.replaceAll("༡་", "༡ ");
  result = result.replaceAll("༢་", "༢ ");
  result = result.replaceAll("༣་", "༣ ");
  result = result.replaceAll("༤་", "༤ ");
  result = result.replaceAll("༥་", "༥ ");
  result = result.replaceAll("༦་", "༦ ");
  result = result.replaceAll("༧་", "༧ ");
  result = result.replaceAll("༨་", "༨ ");
  result = result.replaceAll("༩་", "༩ ");

  result = result.replaceAll("འདུག", "འདུག ");
  result = result.replaceAll("འདུག ་", "འདུག་");
  // result = result.replaceAll(
  //   "ཆོས་སྲིད་ལྷན་ཁང་",
  //   "ཆོས་རིག་ལྷན་ཁང་"
  // );
  result = result.replaceAll("གོང་ས་", "༸གོང་ས་");
  result = result.replaceAll("སྐྱབས་མགོན", "༸སྐྱབས་མགོན");
  result = result.replaceAll("༸༸", "༸");
  result = result.replaceAll("ཧིན་དྷུ་ཉི་ཞི་ཡ", "ཧིན་དྷུ་ནེ་ཤི་ཡ");
  result = result.replaceAll("ཇུ་ལཱི་པིས་ཞ་ཕུ", "ཇུ་ལེའུ་བྷིས་ཞིབ");
  result = result.replaceAll(
    "ཨན་ཊོ་ནི་ཨེལ་བྷན་ནེ་སི",
    "ཨན་ཐོ་ནི་ཨེལ་བྷན་ནེ་སི"
  );
  result = result.replaceAll("ཧོ་ཝེ་མེ་ཊེ", "ཧྭ་ཝི་མེ་ཊེ");
  result = result.replaceAll("འཛམ་གླིང་དུས་བབ་ཚགས་པར", "གོ་ལའི་དུས་བབ་གསར་ཤོག");
  result = result.replaceAll("ཧུའུ་ཝེ", "ཧྭ་ཝི");
  result = result.replaceAll("ཧུ་མེ་ཨོ་ཀི་ཤི་ཌ", "ཧྥུ་མོའི་ཀི་ཤི་ད");
  result = result.replaceAll("ཀི་ཤི་ཌ", "ཀི་ཤི་ད");
  result = result.replaceAll("ཀི་ཞ་དྷ", "ཀི་ཤི་ད");
  result = result.replaceAll("ཕུའུ་ཁུ་ཤི་མ", "ཕུ་ཁུ་ཞི་མ");
  result = result.replaceAll("ཧིན་རྡུ་ཉི་ཞི་ཡ", "ཨིན་ཌོ་ནེ་ཤི་ཡ");
  result = result.replaceAll("ཧིན་རྡུ་ཉི་ཞི་ཡའི", "ཨིན་ཌོ་ནེ་ཤི་ཡའི");
  result = result.replaceAll("ཨ་ཧེ་རི་ཀ", "ཨ་ཧྥི་རི་ཀ");
  result = result.replaceAll("ཨན་ཐོ་ནེ་ཤི་ཨལ་བྷན", "ཨན་ཐོ་ནི་ཨེལ་བྷན་ནེ་སི");
  result = result.replaceAll("ཨལ་བྷན་ཉི", "ཨེལ་བྷན་ནེ་སི");
  result = result.replaceAll("ཁི་རེག་ཨེ་མིར་སོན", "ཁི་རེ་གྷན་ཨེ་མིར་སོན");
  result = result.replaceAll("ཇུ་ལེ་པིས་ཞ་ཕུ", "ཇུ་ལེའུ་བྷིས་ཞིབ");
  result = result.replaceAll("ཨན་ཐོ་ཉི་ཨལ་བྷན་ནེ་སི", "ཨན་ཐོ་ནི་ཨེལ་བྷན་ནེ་སི");
  result = result.replaceAll("ཁ་ལི་ཧྥོར་ནི་ཡ", "ཁཱ་ལེ་ཧྥོར་ནི་ཡ");
  result = result.replaceAll("ཁེན", "ཁིང");
  result = result.replaceAll("ཧོར་དྷོ", "བྷོར་དྷོ");
  result = result.replaceAll("གོ་ལ་གསར་འགྱུར་ཁང", "གོ་ལའི་དུས་བབ་གསར་ཤོག");
  result = result.replaceAll("འཛམ་གླིང་དུས་བབ་གསར་ཁང", "གོ་ལའི་དུས་བབ་གསར་ཤོག");
  result = result.replaceAll(
    "གནམ་གཤིས་སྔོན་བརྟག་པུའུ",
    "གནམ་གཤིས་བརྟག་དཔྱད་ཁང"
  );
  result = result.replaceAll("ཧྲེན་ཀྲེན", "ཧྲིན་ཀྲིན");
  result = result.replaceAll("ཤཱི་ཅིན་ཕིན", "ཞི་ཅིན་ཕིན");
  result = result.replaceAll("སྲིད་འཛིན་ཤཱི", "སྲིད་འཛིན་ཞི");
  result = result.replaceAll(
    "ཟི་ལིང་ཡུ་གུར་རང་སྐྱོང་ཁུལ",
    "ཤིན་ཅིང་ཡུ་གུར་རང་སྐྱོང་ཁུལ"
  );
  result = result.replaceAll("ཨུ་ཁི་རེན", "ཡུག་ཁི་རན");
  result = result.replaceAll("འཛམ་གླིང་དུས་བབ་ཚགས་པར", "གོ་ལའི་དུས་བབ་གསར་ཤོག");
  result = result.replaceAll("ཧིན་དྷུ་ཉི་ཞི་ཡ", "ཨིན་ཌོ་ནེ་ཤི་ཡ");
  result = result.replaceAll("ེག་ས་སི", "ཌེག་ས་སི");
  result = result.replaceAll("འཇོར་ཇི་བྷོ་ཤི", "འཇོར་ཇི་བྷུ་ཤུ");
  result = result.replaceAll("ཞིས་ཅིན་ཕིང", "ཞི་ཅིན་ཕིན");
  result = result.replaceAll("ཌོ་ནོལ་ི་ཁྲེམ་ཕུ", "ཌོ་ནལ་ཋོམ་ཕུ");

  result = result.replaceAll("ཊུ་ཝི་ཊར", "ཋི་ཊར");
  result = result.replaceAll("ཨིན་སི་ཊ་ཊར", "ཨིན་སི་གྷ་རམ");
  result = result.replaceAll("ཡུ་ཊུ་བཱོག", "ཡུ་ཊུབ");

  result = result.replaceAll("ཨིན་སི་ཀྲ་རམ", "ཨིན་སི་གྷ་རམ");
  result = result.replaceAll("ཡུ་ཊོ་སྦེར", "ཡུ་ཊུབ");

  result = result.replaceAll("ཏང་མི", "ཚོགས་མི");
  result = result.replaceAll("ཏང་ཡོན", "ཚོགས་མི");
  result = result.replaceAll("ཏང་གི", "ཚོགས་པའི");
  result = result.replaceAll("ཏང་གིས", "ཚོགས་པས");
  result = result.replaceAll("བྷང་ག་ལ་ཤ", "བྷང་ལ་དྷེ་ཤི");

  result = result.replaceAll("ཨར་ཨེན་ཨེའི", "རིག་ནུས་ཀྱི");
  result = result.replaceAll("ཨར་ཨེན་ཨེས", "རིག་ནུས་ཀྱི");

  result = result.replaceAll("ཨེ་ལོན་མཱས་ཁི", "ཨེ་ལོན་མཱ་སི་ཁི");
  result = result.replaceAll("མའེ་ཁོ་སཱཊ", "མེག་རོ་སོ་ཧྥི");
  result = result.replaceAll("བྷིལ་གྷལ་ཚི", "བྷིལ་གྷེ་ཚི");
  result = result.replaceAll("གྷོ་གྷལ", "གྷུས་གྷུལ");
  result = result.replaceAll("མཱས་ཁི", "མཱ་སི་ཁི");
  result = result.replaceAll("ས་གྱི", "ས་ཀྱི");
  result = result.replaceAll("མའེ་ཁུ་སི་ཀྲོ", "མེག་རོ་སོ་ཧྥི");
  result = result.replaceAll("མེག་རོ་སོ་ཧྥི་ཧུ", "མེག་རོ་སོ་ཧྥི");
  result = result.replaceAll(
    "གྷུས་གྷུལ་གྱི་འཁྲིག་ལྡན་མ",
    "གྷུས་གྷུལ་གྱི་ཇ་མན་ནཱཡེ"
  );
  result = result.replaceAll("འཆར་འགོད་པར་ཌི", "བྷར་ཌི་ཁ་བརྡ");
  result = result.replaceAll("ཡོ་ཊོ་ཀླད་ཀྱི་བརྙན་ཐག", "ཡུས་ཊུབ་བརྙན་རིས");
  result = result.replaceAll("ཨ་ཧོ་ནེ", "ཀུ་ཤུ་ཁ་པར");
  result = result.replaceAll(
    "སྨོན་ལམ་རིག་གནས་ཞིབ་འཇུག་ཁང་",
    "སྨོན་ལམ་བརྡ་འཕྲིན་ཞིབ་འཇུག་ཁང་"
  );
  result = result.replaceAll("༠ཡི", "༠ ཡི");
  result = result.replaceAll("༠པའི", "༠ པའི");
  result = result.replaceAll("རྟགས་ཅན་ ༡༦", "༡༦ རྟགས་ཅན་");
  result = result.replaceAll("མའོ་ཙེ་ཏུང་གིས", "མའོ་ཡིས");
  result = result.replaceAll("ཝུར་ཏོ", "ཨུར་དྷུའུ");
  result = result.replaceAll("ཨེབ་ཨའེ", "ཨེ་པི་ཨེ་ (API) ");
  result = result.replaceAll(" ་", " ");
  result = result.replaceAll("ཁ་རྩང", "ཁ་སང");
  result = result.replaceAll("པན་པ་ཚེ་རིང", "སྤེན་པ་ཚེ་རིང");
  result = result.replaceAll("ཌ་རམ་ས་ལ", "དྷ་རམ་ས་ལ");
  result = result.replaceAll("ཨོག་སི་ཧོར་ཌི", "ཨོག་སི་ཧྥོར་ཌི");
  result = result.replaceAll("དབྱི་ལང", "ཨི་རན");
  result = result.replaceAll("ཨཧ་གྷ་ནི་སི་ཐན", "ཨ་ཧྥི་གྷ་ནི་སི་ཐན");
  result = result.replaceAll("དགེ་སྦྱོང་ག་ཏ་མ", "དགེ་སྦྱོང་གཽ་ཏ་མ");
  //result = result.replaceAll("དགེ་སྦྱོང་ག་ཏ་མ", "དགེ་སྦྱོང་གཽ་ཏ་མ");
  //དགེ་སྦྱོང་ག་ཏ་མ
  result = result.replaceAll(
    "བོད་ལྗོངས་སློབ་གྲྭ་ཆེན་མོའི་བོད་ཀྱི་སྲིད་བྱུས་ཞིབ་འཇུག་ཁང་",
    "བོད་ཀྱི་སྲིད་བྱུས་ཞིབ་འཇུག་ཁང་"
  );
  result = result.replaceAll("སྤན་པ་ཚེ་རིང", "སྤེན་པ་ཚེ་རིང");

  result = result.replaceAll("ཚིག་མཛོད་ཆུང་བའི", "དམའ་རིམ་ཚིག་མཛོད་ཀྱི");
  result = result.replaceAll("ཨན་ཌ་རོ་ཡེ་སི", "ཨན་ཌོར་ཌི། ཨ་ཡེ་ཨོ་ཨེ་སི");
  result = result.replaceAll("ཨན་ཌ་རོ་ཡེ་སི", "ཨན་ཌོར་ཌི། ཨ་ཡེ་ཨོ་ཨེ་སི");
  result = result.replaceAll(
    "ལྷ་ས་ལྷོ་བྱང་ལྷན་ཁང",
    "ལ་དྭགས་རང་སྐྱོང་རི་ལྗོངས་ཡར་རྒྱས་ལྷན་ཚོགས་གླེ"
  );
  result = result.replaceAll("ཉེན་ཁ་གྱིས་", "ཉེན་ཁ་ཡིས་");

  result = result.replaceAll("ཙུང་ཐུང", "སྲིད་འཛིན");
  result = result.replaceAll("ཉུང་ཟད་", "ཅུང་ཟད་");
  result = result.replaceAll("ཇ་ཝིཊ", "ཇ་ཝ་སི་ཁི (JavaScript)");
  //ཇ་ཝིཊ

  result = result.replaceAll("པ་འོ། །", "པའོ།།");

  result = result.replaceAll("བང་རྩིས", "རིམ་ལྡན་རྩིས་ཐབས");
  result = result.replaceAll("ཨང་རྩིས་སྒྲིག་འཛུགས", "རིག་ནུས་གལ་གནད");
  result = result.replaceAll("ཨང་རྩིས་ལ་སྟངས་འཛིན", "རིག་ནུས་སྟངས་འཛིན");

  result = result.replaceAll("སྐྱེ་འཕེལ་གྱི་ཨང་ཨད", "སྐྱེ་འཕེལ་རིག་ནུས");
  result = result.replaceAll("ཨང་ཨད", "རིག་ནུས");
  result = result.replaceAll("སྐྱེ་འཕེལ་གྱི་ཨང་ཨེས", "སྐྱེ་འཕེལ་རིག་ནུས");
  result = result.replaceAll("སྐྱེ་འཕེལ་གྱི་ཨིས་ཨིས", "སྐྱེ་འཕེལ་རིག་ནུས");
  result = result.replaceAll("ཨར་ཨེན་ཨེའམ", "རིག་ནུས་སམ");
  result = result.replaceAll("བསྐྱེད་པའི་ཨིས་ཨིས", "སྐྱེ་འཕེལ་རིག་ནུས");
  result = result.replaceAll("བསྐྱེད་པའི་ཨིས་ཨིས", "སྐྱེ་འཕེལ་རིག་ནུས");
  result = result.replaceAll("སྐྱེ་འཕེལ་གྱི་ཨང་ཨིས", "སྐྱེ་འཕེལ་རིག་ནུས");
  result = result.replaceAll("མིས་བཟོས་རིག་སྟོབས", "མིས་བཟོས་རིག་ནུས");
  result = result.replaceAll("བསྐྱེད་རྫས་ཀྱི་རིག་ནུས", "སྐྱེ་འཕེལ་རིག་ནུས");
  result = result.replaceAll("སན་ཧ་རན་སེ་སི་ཁོ", "སན་ཧྥན་སེ་སི་ཁོ");
  result = result.replaceAll("བཅོས་མའི་རིག་སྟོབས", "མིས་བཟོས་རིག་ནུས");
  result = result.replaceAll("པ་འམ", "པའམ");
  result = result.replaceAll("སྤྱི་མཐུན་ཏང་ཁག་གི", "སྤྱི་མཐུན་ཚོགས་པའི");
  result = result.replaceAll("རྣམ་པ་ཉུང་ཟད་ཅིག", "རྣམ་པ་ཅུང་ཟད་ཅིག");
  result = result.replaceAll("བ་འོ།", "བའོ།");
  result = result.replaceAll("༎", "།། ");
  result = result.replaceAll("།", "། ");
  result = result.replaceAll("  ", " ");
  result = result.replaceAll("་་", "་");
  result = result.replaceAll("་།", "།");
  result = result.replaceAll("ང།", "ང་།");
  result = result.replaceAll("བཟོ་བཅོས་རིག་སྟོབས", "མིས་བཟོས་རིག་ནུས");
  result = result.replaceAll("ཏང་ཁག", "ཚོགས་ཁག");
  result = result.replaceAll("ཧེ་ལི་ཕིན", "ཧྥི་ལིས་པིན");
  result = result.replaceAll(
    "སི་ཀོང་སྤེན་པ་ཚེ་རིང",
    "སྲིད་སྐྱོང་སྤེན་པ་ཚེ་རིང"
  );
  result = result.replaceAll("ཚིན་ཧྭ", "ཆིན་ཧ");
  result = result.replaceAll("ཨེད་ཁུ་སི", "ཨེག་སི");
  result = result.replaceAll(
    "ས་ཡ་མང་པོ་བོད་གཞུང་གི་དབང་སྒྱུར",
    "ས་ཡ་མང་པོ་རྒྱ་གཞུང་གི་དབང་སྒྱུར"
  );
  result = result.replaceAll("༄༅། ། ", "");
  result = result.replaceAll("༄༅། །", "");
  result = result.replaceAll("མཐོ་སྒང་ཨིན་ཆི་ཐེ་རུ", "ཨེིན་ཤོན་མཐོ་སྒང་དུ");
  result = result.replaceAll("དབྱི་སི་ལན", "ཨི་སི་ལམ");

  result = result.replaceAll("གྷ་ཟ", "གྷ་ཛ");
  result = result.replaceAll("གྷ་སའི", "གྷ་ཛའི");
  result = result.replaceAll("དབྱི་སི་རལ", "ཨི་སི་རལ");
  result = result.replaceAll(
    "ཞི་ཅིན་ཕིན་གསར་འགྱུར་ཁང་",
    "ཤིན་ཧྭ་གསར་འགྱུར་ཁང་"
  );
  result = result.replaceAll("བསམ་སྡོང་རིན་པོ་ཆེ", "ཟམ་གདོང་རིན་པོ་ཆེ");
  result = result.replaceAll("བསམ་སྡོང་བསམ་བློ", "ཟམ་གདོང་བསམ་བློ");
  result = result.replaceAll("བསམ་རྡོང་རིན་པོ་ཆེ", "ཟམ་གདོང་རིན་པོ་ཆེ");
  result = result.replaceAll("བསམ་རྡོང་གི་ལྟ་བ", "ཟམ་གདོང་གི་ལྟ་བ");
  result = result.replaceAll("བྷ་རཱ་ཁཱ་ཨོ་བྷ་མ", "བྷ་རག་ཨོ་བྷ་མ");
  result = result.replaceAll("བྷ་རཱ་ཁེ་ཨོ་བྷ་མ", "བྷ་རག་ཨོ་བྷ་མ");
  result = result.replaceAll(
    "སྲིད་འཛིན་སྐུ་ཕྲེང་བཞི་བཅུ་ང་གསུམ",
    "སྲིད་འཛིན་ཞེ་གསུམ"
  );
  result = result.replaceAll(
    "སྲིད་འཛིན་སྐུ་ཕྲེང་བཞི་བཅུ་ང་བཞི",
    "སྲིད་འཛིན་ཞེ་བཞི"
  );
  result = result.replaceAll(
    "སྲིད་འཛིན་སྐུ་ཕྲེང་བཞི་བཅུ་ང་ལྔ",
    "སྲིད་འཛིན་ཞེ་ལྔ"
  );
  result = result.replaceAll("ཐོག་མའི་ལྕམ", "ལྕམ་སྐུ་དང་པོ");
  result = result.replaceAll(
    "བུད་མེད་སྐུ་ཕྲེང་དང་པོ་གཉིས་པ",
    "ལྕམ་སྐུ་དང་པོ་གཉིས་པ"
  );

  result = result.replaceAll("འཁོར་ཐག་དང་ལམ་གྱི", "རྒྱུད་གཅིག་ལམ་གཅིག་གི");
  result = result.replaceAll("འཁོར་ཐག་དང་རྒྱ་ལམ་གྱི", "རྒྱུད་གཅིག་ལམ་གཅིག་གི");
  result = result.replaceAll("སྐ་རགས་དང་རྒྱ་ལམ་གྱི", "རྒྱུད་གཅིག་ལམ་གཅིག་གི");
  result = result.replaceAll("གཞུང་ལམ་དང་སྐེ་རགས་ཀྱི", "རྒྱུད་གཅིག་ལམ་གཅིག་གི");
  result = result.replaceAll("ཨ་ཀེན་ཊི་ནེ་ཡ", "ཨར་རྗིན་ཊི་ན");
  result = result.replaceAll("འཛམ་གླིང་ལྗོངས་ཉི་ཤུ", "འཛམ་གླིང་རྒྱལ་ཁབ་ཉི་ཤུ");
  result = result.replaceAll("དབྱི་རན", "ཨི་རན");
  result = result.replaceAll("པེ་ལི་སི་ཐན", "པ་ལི་སི་ཐན");
  result = result.replaceAll("ཕ་ལི་སི་ཐན", "པ་ལི་སི་ཐན");
  result = result.replaceAll("ཞེས་པ་ས་བསྟན།", "ཞེས་པས་བསྟན།");
  result = result.replaceAll("ལྕམ་སྐུ་ཞབས་རྣམ་པ།", "ལྕམ་དང་སྐུ་ཞབས་རྣམ་པ།");
  result = result.replaceAll("ལུང་དུ་མ་བསྟན་པ་", "ལུང་དུ་མ་བསྟན་པ་");
  //
  result = result.replaceAll("ཅིག་གྱི", "ཅིག་གི");
  result = result.replaceAll("ཏཱ་ལའི་བླ་མ་མཆོག་གིས", "ཁོང་གིས");
  result = result.replaceAll("བོད་དབུས་ཤར་ཁུལ", "དབུས་ཤར་ཁུལ");
  result = result.replaceAll("ཨིན་ཇིའི་རྒྱལ་ཁབ་མང་པོ", "རྒྱལ་ཁབ་མང་པོ");
  result = result.replaceAll("ཨིན་ཅི་གྲོས་ཚོགས", "གྲོས་ཚོགས");
  result = result.replaceAll("ངོས་རང་", "ང་རང་");
  result = result.replaceAll(
    "བྱང་གི་སྒྲ་མི་སྙན་གྱི་བར་གྱི་ལམ་པོ་ཆེ",
    "ནཱ་ལནྡཱ་བར་གྱི་ལམ་པོ་ཆེ"
  );
  result = result.replaceAll("བྱང་གི་སྒྲ་མི་སྙན", "ནཱ་ལནྡཱ");
  result = result.replaceAll(
    "བསྟོད་བསྔགས་མི་འདྲ་བ་མང་དུ་བྱས་ཀྱང",
    "བསྔགས་པ་མ་ཡིན་པ་མང་དུ་བྱས་ཀྱང"
  );
  result = result.replaceAll("བོད་མིའི་རྩ་འཛིན་ལས་ཁུངས", "རྩ་འཛིན་ལས་ཁུངས");
  result = result.replaceAll("ཕྱི་ལོ་ ༢༠༠༨ ལོའི་ཟླ", "ཟླ");
  result = result.replaceAll("ཕྱི་ལོ་ ༢༠༠༨ ལོར", "");
  result = result.replaceAll("ཕྱི་ལོ་ ༢༠༠༨ ལོའི་", "");
  result = result.replaceAll("ཕྱི་ལོ་༢༠༠༨ ལོའི་", "");
  result = result.replaceAll("༸ཏཱ་ལའི་བླ་མ།", "");
  result = result.replaceAll("ངོས་ཀྱིས་", "ངས་");
  result = result.replaceAll("ངོས་ཀྱི་", "ང་རང་གི་");
  result = result.replaceAll("ལམ་སྲང་དང་སྐ་རགས", "རྒྱུད་གཅིག་ལམ་གཅིག");
  result = result.replaceAll("ལམ་དང་སྐེ་རགས་", "རྒྱུད་གཅིག་ལམ་གཅིག");
  result = result.replaceAll("ཨིན་ཅི་", "");
  result = result.replaceAll("གུ་གལ་", "གྷུས་གྷལ");
  result = result.replaceAll("མེད་མིན་གྱི་", "ཡོད་མེད་ཀྱི་");
  result = result.replaceAll("ཏཱ་ལའི་བླ་མ་མཆོག་གིས", "ཁོང་གིས");
  result = result.replaceAll("བོད་དབུས་ཤར་ཁུལ", "དབུས་ཤར་ཁུལ");
  result = result.replaceAll("ཨིན་ཇིའི་རྒྱལ་ཁབ་མང་པོ", "རྒྱལ་ཁབ་མང་པོ");
  result = result.replaceAll("ཨིན་ཅི་གྲོས་ཚོགས", "གྲོས་ཚོགས");
  result = result.replaceAll("ངོས་རང་", "ང་རང་");
  result = result.replaceAll("བོད་མིའི་རྩ་འཛིན་ལས་ཁུངས", "རྩ་འཛིན་ལས་ཁུངས");
  result = result.replaceAll("ཕྱི་ལོ་ ༢༠༠༨ ལོའི་ཟླ", "ཟླ");
  result = result.replaceAll("ཕྱི་ལོ་ ༢༠༠༨ ལོར", "");
  result = result.replaceAll("ཕྱི་ལོ་ ༢༠༠༨ ལོའི་", "");
  result = result.replaceAll("ཕྱི་ལོ་༢༠༠༨ ལོའི་", "");
  result = result.replaceAll("ཕྱི་ལོ་༡༩༥༩ ལོའི་", "");
  result = result.replaceAll("༸ཏཱ་ལའི་བླ་མ།", "");
  result = result.replaceAll("ངོས་ཀྱིས་", "ངས་");
  result = result.replaceAll("ངོས་ཀྱི་", "ང་རང་གི་");
  result = result.replaceAll("ལམ་སྲང་དང་སྐ་རགས", "རྒྱུད་གཅིག་ལམ་གཅིག");
  result = result.replaceAll("ལམ་དང་སྐེ་རགས་", "རྒྱུད་གཅིག་ལམ་གཅིག");
  result = result.replaceAll("ཨིན་ཅི་", "");
  result = result.replaceAll("གུ་གལ་", "གྷུས་གྷལ");
  result = result.replaceAll("མེད་མིན་གྱི་", "ཡོད་མེད་ཀྱི་");

  result = result.replaceAll("ཨིན་ཆི་ཐེ་", "");
  result = result.replaceAll("ཨིན་ཆི་", "");
  result = result.replaceAll("ཨིན་ཆུ་ཐེ་", "");
  result = result.replaceAll("ཨིན་ཆུ་", "");
  result = result.replaceAll("ཨིན་ཆ་ཐེ་", "");
  result = result.replaceAll("ཨིན་ཆ་", "");
  result = result.replaceAll("ཨེན་ཅི་ཐེ་", "");
  result = result.replaceAll("ཨེན་ཅི་", "");
  result = result.replaceAll("ཨིན་ཌི་ཊེ་", "");

  result = result.replaceAll("ཨིན་ཆི་ཐེ་རུ་", "ལ་");
  result = result.replaceAll("ཟས་སྦྱོར་གྱི་ཕྲ་ཕུང་", "ཕྲ་ཕུང་");

  result = result.replaceAll("བརྡ་བཚོགས་", "བརྡ་བཏང་");
  result = result.replaceAll("སྒ་ཟ", "སྒ་ཛ");
  result = result.replaceAll("སྒ་ས", "སྒ་ཛ");
  result = result.replaceAll("དགྲང་ངར་ཆེ་བ", "ནར་འགྱངས་ཆེ་བ");
  result = result.replaceAll(
    "༸ཏཱ་ལའི་བླ་མ་སྐུ་ཕྲེང་བཅུ་བཞི་པ་ཆེན་པོ། ཕྱི་ལོ་༡༩༨༩ ལོའི་ཟླ་༡༠ ཚེས་༡༥ ཉིན།",
    ""
  );
  //༸ཏཱ་ལའི་བླ་མ་སྐུ་ཕྲེང་བཅུ་བཞི་པ་ཆེན་པོ། ཕྱི་ལོ་༡༩༨༩ ལོའི་ཟླ་༡༠ ཚེས་༡༥ ཉིན།
  result = result.replaceAll("་མཉན་དུ་ཡོད་པ་ན་", "་མཉན་ཡོད་དུ་");
  result = result.replaceAll(
    "ཆེན་པོ་མ་ངེས་པ་དང་ཐབས་ཅིག་",
    "ཆེན་པོ་དང་ཐབས་ཅིག་"
  );
  result = result.replaceAll("མ་ངེས་པའི་", "");
  result = result.replaceAll("ཨིན་ཇིའི་དམག་འཁྲུག་དང་།", "");
  result = result.replaceAll("དབུས་ཤར་ཨེན་ཊེ་ཡ", "དཀྱིལ་ཤར་ཨེ་ཤ་ཡ");
  result = result.replaceAll("ང་ཀྱི་", "ང་གི་");
  result = result.replaceAll("སྟོང་ཉིས་བརྒྱ་ལྔ་བཅུ", "ཉིས་སྟོང་ལྔ་བརྒྱ");
  result = result.replaceAll("ཁྲེན་སྣ་ཁུག་གི", "ཁྲེན་གྱི");
  //ཁྲེན་སྣ་ཁུག་གི
  result = result.replaceAll("བརྡ་བཚོགས་", "བརྡ་བཏང་");
  result = result.replaceAll("སྒ་ཟ", "སྒ་ཛ");
  result = result.replaceAll("སྒ་ས", "སྒ་ཛ");
  result = result.replaceAll("དགྲང་ངར་ཆེ་བ", "ནར་འགྱངས་ཆེ་བ");
  result = result.replaceAll(
    "༸ཏཱ་ལའི་བླ་མ་སྐུ་ཕྲེང་བཅུ་བཞི་པ་ཆེན་པོ། ཕྱི་ལོ་༡༩༨༩ ལོའི་ཟླ་༡༠ ཚེས་༡༥ ཉིན།",
    ""
  );
  //༸ཏཱ་ལའི་བླ་མ་སྐུ་ཕྲེང་བཅུ་བཞི་པ་ཆེན་པོ། ཕྱི་ལོ་༡༩༨༩ ལོའི་ཟླ་༡༠ ཚེས་༡༥ ཉིན།
  result = result.replaceAll("་མཉན་དུ་ཡོད་པ་ན་", "་མཉན་ཡོད་དུ་");
  result = result.replaceAll(
    "ཆེན་པོ་མ་ངེས་པ་དང་ཐབས་ཅིག་",
    "ཆེན་པོ་དང་ཐབས་ཅིག་"
  );
  result = result.replaceAll("མཚན་ཉིད་ངེས་གསལ་མེད་པའི་སྒོ་ནས་", "");
  result = result.replaceAll("མ་ངེས་པའི་", "");
  result = result.replaceAll("ཨིན་ཇིའི་དམག་འཁྲུག་དང་།", "");
  result = result.replaceAll("དབུས་ཤར་ཨེན་ཊེ་ཡ", "དཀྱིལ་ཤར་ཨེ་ཤ་ཡ");
  result = result.replaceAll("ང་ཀྱི་", "ང་གི་");
  result = result.replaceAll("སྟོང་ཉིས་བརྒྱ་ལྔ་བཅུ", "ཉིས་སྟོང་ལྔ་བརྒྱ");
  result = result.replaceAll("༸ཏཱ་ལའི་བླ་མ་དགོངས་པ་རྫོགས", "སྐུ་གཤེགས");
  result = result.replaceAll("༸ཏཱ་ལའི་བླ་མ་གཤེགས", "སྐུ་གཤེགས");
  result = result.replaceAll("མཚན་ཉིད་ངེས་གསལ་མེད་པའི་", "");
  result = result.replaceAll("མཚན་ཉིད་མ་ཚང་བའི་", "");
  result = result.replaceAll(
    "༸ཏཱ་ལའི་བླ་མ་དྲན་གསོའི་དུས་དྲན་",
    "དྲན་གསོའི་དུས་དྲན་"
  );
  result = result.replaceAll("ངེས་གཏན་བྲལ་བའི་", "");
  result = result.replaceAll("དམར་ཤོག་ཚོགས་པ", "ཚོགས་པ");
  result = result.replaceAll("༡༩༥༩ ལོའི་", "");
  result = result.replaceAll("ཧ་རན་སི", "ཧྥ་རན་སི");
  result = result.replaceAll("རྟེན་འབུལ་འབུལ་འབུལ་ཆེད", "རྟེན་འབུལ་འབུལ་ཆེད");
  result = result.replaceAll("ཕྱི་ལོ་༢༠༠༨", "");
  result = result.replaceAll("མ་ངེས་པ་", "");
  result = result.replaceAll("ཨིན་ཆས་ཐི་ཡིས་", "");
  result = result.replaceAll("ངེས་མེད་", "");
  result = result.replaceAll("གསལ་ཁ་མེད་པའི་", "");
  result = result.replaceAll("ངེས་མེད་ཀྱི་", "");
  result = result.replaceAll("ངེས་གཏན་མེད་པའི་", "");
  result = result.replaceAll("གཏན་འཁེལ་མེད་པའི་", "");
  result = result.replaceAll(
    "བེེངྒ་ལོར་རྒྱལ་བའི་བླ་མ་མཐོ་རིམ་སློབ་གཉེར་ཁང་",
    "བྷེན་ལོར་ཏཱ་ལའི་བླ་མ་མཐོ་རིམ་སློབ་གཉེར་ཁང་"
  );
  result = result.replaceAll("མ་ངེས་", "");
  result = result.replaceAll("ངེས་ཚིག་མ་བཀོད་པའི་", "");
  result = result.replaceAll("ཨུ་ཡོན་གཞོན་པ", "དྲུང་ཆེ་གཞོན་པ");
  result = result.replaceAll("ཨུ་ཡོན་ཀྲང་", "ཚོགས་གཙོ་");
  result = result.replaceAll("ཨུ་ཡོན་", "འཐུས་མི་");
  result = result.replaceAll("ཀྲུའུ་ཞི", "ཁྲི་བ");
  result = result.replaceAll("ངེས་ཚིག་མ་གཏུགས་པའི་", "");
  result = result.replaceAll("ངེས་ཚིག་མ་གཏུགས་པ་", "");
  result = result.replaceAll("འཕན་པ་ཚེ་རིང་", "སྤེན་པ་ཚེ་རིང་");
  result = result.replaceAll("དབྱི་རན", "ཨི་རན");
  result = result.replaceAll("སྤྱི་མཐུན་ཏང་གི", "སྤྱི་མཐུན་ཚོགས་པའི");
  result = result.replaceAll("སྤྱི་མཐུན་ཏང་གིས", "སྤྱི་མཐུན་ཚོགས་པས");
  result = result.replaceAll("ལུང་མ་བསྟན་གྱི་", "");
  result = result.replaceAll("དྲུག་ཅུ་གྱ་ལྔ་", "དྲུག་ཅུ་རེ་ལྔ་");
  result = result.replaceAll("སྤྱི་མཐུན་ཏང་གི་", "སྤྱི་མཐུན་ཚོགས་པའི་");
  result = result.replaceAll("སྤྱི་མཐུན་ཏང་གིས་", "སྤྱི་མཐུན་ཚོགས་པས་");
  result = result.replaceAll("མི་དམངས་ཏང་གི་", "མི་དམངས་ཚོགས་པའི་");
  result = result.replaceAll("མི་དམངས་ཏང་གིས", "མི་དམངས་ཚོགས་པས་");
  result = result.replaceAll("བོ་སི་ཊོན", "བྷོ་སི་ཊོན");
  result = result.replaceAll("མགྲོན་གཉེར་ཆེ་མོ་གཉིས་སུ་", "སྐུ་མགྲོན་གཙོ་བོར་");
  //མགྲོན་གཉེར་ཆེ་མོ་གཉིས་སུ་

  result = result.replaceAll(
    "༸ཏཱ་ལའི་བླ་མའི་དགོངས་པ་རྫོགས་ཚུལ་",
    "ཁོ་སྐུ་གཤེགས་པའི་སྐོར་"
  );
  result = result.replaceAll("MITRA", "Monlam AI");
  result = result.replaceAll("སྡིངས་ཆ་རྫོད་པ་", "སྤྱི་ཚོགས་དཀྲུགས་པ་");
  result = result.replaceAll("རྫོད་པ", "སྐྱོན་གཏོང་བ");
  result = result.replaceAll("བརྫད་པ", "སྐྱོན་བཏང་བ");
  result = result.replaceAll("སྡིངས་ཆ", "གར་སྟེགས");
  result = result.replaceAll(
    "བོད་ཀྱི་གཙུག་ལག་གཅེས་བཏུས་པོད་ཕྲེང་ཉི་ཤུ་རྩ་བརྒྱད་པ་སྨན་གཞུང་།",
    "བོད་ཀྱི་སྲིད་བཤུས་ཉམས་ཞིབ་ཁང་།"
  );
  result = result.replaceAll("ཏང་ཁག་", "ཚོགས་པ་ཁག་");
  result = result.replaceAll("ཏང་གི་", "ཚོགས་པའི་");
  result = result.replaceAll("ཏང་གིས་", "ཚོགས་པས་");
  result = result.replaceAll("དམར་ཤོག་ཚོགས་པ", "ཚོགས་པ་");
  result = result.replaceAll("དབྱི་ཐ་ལི", "ཨི་ཊ་ལི");
  result = result.replaceAll("་ཏང་", "་ཚོགས་པ་");

  //རྙིང་ཞེན་ཏང་

  result = result.replaceAll(/(\d+)([^\d]+)/g, "$1 $2");
  result = result.replaceAll(/([\u0F20-\u0F33]+)([^\u0F20-\u0F33]+)/g, "$1 $2");
  return result;
}

// replaces for the tibetan to english ->input before sending to server
export function bo_en_tibetan_replaces(text: string) {
  return text;
}
//  replaces for the tibetan to english   -> output  after getting responce from the api

export function bo_en_english_replaces(text: string) {
  let result = text.replaceAll("MITRA", "Monlam AI");
  result = result.replaceAll(/event: message data: /g, "");
  result = result.replaceAll("' event: message data: '", "");
  result = result.replaceAll(
    "Tibet was not pure independence",
    "Tibet was pure independence"
  );

  return result;
}

function convertToLowerCaseIfAllUppercase(inputString: string) {
  return inputString === inputString.toUpperCase()
    ? inputString.toLowerCase()
    : inputString;
}
