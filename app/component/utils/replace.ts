// replaces for the english to tibetan  ->input before sending to server

export function en_bo_english_replaces(text: string) {
  let result = text;
  result += ".";
  result = result.replaceAll("..", ".");
  result = result.replaceAll(" – ", " ");
  result = result.replaceAll("–", " ");
  result = result.replaceAll(". .", ".");
  result = result.replaceAll("“", "");
  result = result.replaceAll("”", "");
  result = result.replaceAll("’", "");
  result = result.replaceAll("‘", "");
  result = result.replaceAll((/[\n\r]/g, ","));
  result = result.replaceAll(/\bAI\b/g, "artificial intelligence ");
  result = result.replaceAll("(AI)", "");
  result = result.replaceAll("AI.)", "artificial intelligence.");
  result = result.replaceAll(/\bCTA\b/g, "Central Tibetan Administration");
  result = result.replaceAll(
    /(\.\s*)\bCTA\b/g,
    "Central Tibetan Administration"
  );
  result = result.replaceAll(/(\.\s*)\bEV\b/g, "Electric vehicle");
  result = result.replaceAll(/\bEV\b/g, "Electric vehicle");
  result = result.replaceAll(/\bASAP\b/g, "As soon as possible");
  result = result.replaceAll(/\bRSVP\b/g, "Répondez s’il vous plaît");
  result = result.replaceAll(/\bFAQs\b/g, "Frequently asked questions");
  result = result.replaceAll(/\bTGIF\b/g, "Thank god it’s Friday");
  result = result.replaceAll(/\bIMO\b/g, "In my opinion");
  result = result.replaceAll(/\bIMHO\b/g, "In my humble opinion");
  result = result.replaceAll(/\bDIY\b/g, "Do-it-yourself");
  result = result.replaceAll(/\bFIY\b/g, "For your information");
  result = result.replaceAll(/\bAKA\b/g, "Also known as");
  result = result.replaceAll(/\bFKA\b/g, "Formerly known as");
  result = result.replaceAll(/\bBYOB\b/g, "Bring your own beverage");
  result = result.replaceAll(/\bBO\b/g, "Body odor");
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
  result = result.replaceAll(/\bi.e.\b/g, "In other words");
  result = result.replaceAll(/\bi.g.\b/g, "For example");
  result = result.replaceAll(/\bPIN\b/g, "Personal identification number");
  result = result.replaceAll(/\bSOS\b/g, "Save our ship (help)");
  result = result.replaceAll(/\bSO\b/g, "Significant other");
  result = result.replaceAll(/\bTMI\b/g, "Too much information");
  result = result.replaceAll(/\bPOV\b/g, "Point of view");
  result = result.replaceAll(/\bHBD\b/g, "Happy birthday");
  result = result.replaceAll(/\blol\b/g, "Laugh out loud");
  result = result.replaceAll(/\blmk\b/g, "Let me know");
  result = result.replaceAll(/\bnvm\b/g, "Nevermind");
  result = result.replaceAll(/\bomw\b/g, "On my way");
  result = result.replaceAll(/\bidk\b/g, "I don’t know");
  result = result.replaceAll(/\bthx\b/g, "Thanks");
  result = result.replaceAll(/\bty\b/g, "Thank you");
  result = result.replaceAll(/\bbrb\b/g, "Be right back");
  result = result.replaceAll(/\bbtw\b/g, "By the way");
  result = result.replaceAll(/\bomg\b/g, "Oh my god");
  result = result.replaceAll(/\blmao\b/g, "Laughing my ass off");
  result = result.replaceAll(/\bwtf\b/g, "What the ****");
  result = result.replaceAll(/\bwth\b/g, "What the hell");
  result = result.replaceAll(/\biykyk\b/g, "If you know, you know");
  result = result.replaceAll(/\bsthu\b/g, "Shut the hell up");
  result = result.replaceAll(/\byolo\b/g, "You only live once");
  result = result.replaceAll(/\bTL;DR\b/g, "Too long, didn’t read");
  result = result.replaceAll(/\b2day\b/g, "Today");
  result = result.replaceAll(/\b2moro\b/g, "Tomorrow");
  result = result.replaceAll(/\batm\b/g, "At the moment");
  result = result.replaceAll(/\bb4\b/g, "Before");
  result = result.replaceAll(/\bl8r\b/g, "Later");
  result = result.replaceAll(/\bcu\b/g, "See you");
  result = result.replaceAll(/\bcya\b/g, "See ya");
  result = result.replaceAll(/\bgr8\b/g, "Great");
  result = result.replaceAll(/\bily\b/g, "I love you");
  result = result.replaceAll(/\bily2\b/g, "I love you too");
  result = result.replaceAll(/\bpls\b/g, "Please");
  result = result.replaceAll(/\br u srs\b/g, "Are you serious?");
  result = result.replaceAll(/\by\b/g, "Why?");
  result = result.replaceAll(/\bttyl\b/g, "Talk to you later");
  result = result.replaceAll(/\bbc\b/g, "Because");
  result = result.replaceAll(/\bDM\b/g, "Direct message");
  result = result.replaceAll(/\bftw\b/g, "For the win");
  result = result.replaceAll(/\biirc\b/g, "If I remember correctly");
  result = result.replaceAll(/\bjk\b/g, "Just kidding");
  result = result.replaceAll(/\bnbd\b/g, "No big deal");
  result = result.replaceAll(/\brn\b/g, "Right now");
  result = result.replaceAll(/\bDAE\b/g, "Does anyone else?");
  result = result.replaceAll(/\bhmu\b/g, "Hit me up");
  result = result.replaceAll(/\bwyd\b/g, "What (are) you doing?");
  result = result.replaceAll(/\bidc\b/g, "I don’t care");
  result = result.replaceAll(/\bh8\b/g, "Hate");
  result = result.replaceAll(/\bCC\b/g, "Carbon copy");
  result = result.replaceAll(/\bBCC\b/g, "Blind carbon copy");
  result = result.replaceAll(/\bFTE\b/g, "Full-time employment");
  result = result.replaceAll(/\bEOD\b/g, "End-of-day");
  result = result.replaceAll(/\bRE\b/g, "Regarding");
  result = result.replaceAll(/\bP.S.\b/g, "Post script");
  result = result.replaceAll(/\bPTO\b/g, "Paid time off");
  result = result.replaceAll(/\bNB\b/g, "Nota Bene");
  result = result.replaceAll(/\bOOO\b/g, "Out of office");
  result = result.replaceAll(/\bOT\b/g, "Overtime");
  result = result.replaceAll(/\bP&C\b/g, "Private & confidential");
  result = result.replaceAll(
    /\bSMART\b/g,
    "Specific, measurable, attainable, realistic, time-bound"
  );
  result = result.replaceAll(/\bTIA\b/g, "Thanks in advance");
  result = result.replaceAll(/\bWFH\b/g, "Work from home");
  result = result.replaceAll(/\bCE\b/g, "Common Era");
  result = result.replaceAll(/\bBCE\b/g, "Before Common Era");
  result = result.replaceAll(/\bETA\b/g, "Estimated time of arrival");
  result = result.replaceAll(/\ba. m.\b/g, "Ante meridiem");
  result = result.replaceAll(/\bp. m.\b/g, "Post meridiem");
  result = result.replaceAll(/\bh\b/g, "Hour");
  result = result.replaceAll(/\bmin\b/g, "Minute");
  result = result.replaceAll(/\bs\b/g, "Seconds");
  result = result.replaceAll(/\bN\b/g, "North");
  result = result.replaceAll(/\bS\b/g, "South");
  result = result.replaceAll(/\bE\b/g, "East");
  result = result.replaceAll(/\bW\b/g, "West");
  result = result.replaceAll(/\bNW\b/g, "Northwest");
  result = result.replaceAll(/\bNE\b/g, "Northeast");
  result = result.replaceAll(/\bSW\b/g, "Southwest");
  result = result.replaceAll(/\bSE\b/g, "Southeast");
  result = result.replaceAll(/\bM\b/g, "Monday");
  result = result.replaceAll(/\bT\b/g, "Tuesday");
  result = result.replaceAll(/\bW\b/g, "Wednesday");
  result = result.replaceAll(/\bTh\b/g, "Thursday");
  result = result.replaceAll(/\bF\b/g, "Friday");
  result = result.replaceAll(/\bS\b/g, "Saturday");
  result = result.replaceAll(/\bSu\b/g, "Sunday");
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
  result = result.replaceAll(/\bPM\b/g, "Project manager");
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
  result = result.replaceAll(/\boz.\b/g, "Ounce");
  result = result.replaceAll(/\bfl. oz.\b/g, "Fluid ounce");
  result = result.replaceAll(/\bgal.\b/g, "Gallon");
  result = result.replaceAll(/\bpt.\b/g, "Pint");
  result = result.replaceAll(/\bqt.\b/g, "Quart");
  result = result.replaceAll(/\btbsp.\b/g, "Tablespoon");
  result = result.replaceAll(/\btsp. \b/g, "Teaspoon");
  result = result.replaceAll(/\bin.\b/g, "Inch");
  result = result.replaceAll(/\bft.\b/g, "Foot");
  result = result.replaceAll(/\bmi.\b/g, "Mile");
  result = result.replaceAll(/\bmph\b/g, "Miles per hour");
  result = result.replaceAll(/\bn.m.\b/g, "Nautical miles");
  result = result.replaceAll(/\bsq.\b/g, "Square");
  result = result.replaceAll(/\byd.\b/g, "Yard");
  result = result.replaceAll(/\blb.\b/g, "Pound");
  result = result.replaceAll(/\bcm\b/g, "Centimeter");
  result = result.replaceAll(/\bm\b/g, "Meter");
  result = result.replaceAll(/\bkm\b/g, "Kilometer");
  result = result.replaceAll(/\bg\b/g, "Gram");
  result = result.replaceAll(/\bkg\b/g, "Kilogram");
  result = result.replaceAll(/\bT\b/g, "Ton");
  result = result.replaceAll(/\bml\b/g, "Milliliter");
  result = result.replaceAll(/\bl\b/g, "Liter");
  result = result.replaceAll(/\biktr\b/g, "I know that’s right");
  result = result.replaceAll(/\bfomo\b/g, "Fear of missing out");
  result = result.replaceAll(/\bikyl\b/g, "I know you’re lying");
  result = result.replaceAll(/\bsmh\b/g, "Shaking my head");
  result = result.replaceAll(/\btbh\b/g, "To be honest");
  result = result.replaceAll(/\brofl\b/g, "Rolling on the floor laughing");
  result = result.replaceAll(/\bxoxo\b/g, "Hugs and kisses");
  result = result.replaceAll(/\bikr\b/g, "I know, right?");
  result = result.replaceAll(/\bofc\b/g, "Of course");
  result = result.replaceAll(/\btfw\b/g, "The feel when");
  result = result.replaceAll(/\btfti\b/g, "Thanks for the invite");
  result = result.replaceAll(/\bdl\b/g, "Down-low");
  result = result.replaceAll(/\bfr\b/g, "For real");
  result = result.replaceAll(/\bqt\b/g, "Cutie");
  result = result.replaceAll(/\bngl\b/g, "Not gonna lie");
  result = result.replaceAll(/\bobv\b/g, "Obviously");
  result = result.replaceAll(/\bgrl\b/g, "Girl");
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
  result = result.replaceAll(/\binnit\b/g, "Isn’t it?");
  result = result.replaceAll(/\bSammie\b/g, "Sandwich");
  result = result.replaceAll(/\bA cuppa\b/g, "A cup of tea");
  result = result.replaceAll(/\bSoz\b/g, "Sorry");
  result = result.replaceAll(/\bManc\b/g, "Manchester");
  result = result.replaceAll(/\bP’s\b/g, "Pounds (£)");
  result = result.replaceAll(/\bChrissie\b/g, "Christmas");
  result = result.replaceAll(/\bBrekky\b/g, "Breakfast");
  result = result.replaceAll(/\bAvo\b/g, "Avocado");
  result = result.replaceAll(/\bServo\b/g, "Gas station");
  result = result.replaceAll(/\bMaccas\b/g, "McDonald’s");
  result = result.replaceAll(/\bBevos\b/g, "Beverages");
  result = result.replaceAll(/\bSanga\b/g, "Sandwich");
  result = result.replaceAll(/\bAggro\b/g, "Aggressive");
  result = result.replaceAll(/\bBarbie\b/g, "Barbecue");
  result = result.replaceAll(/\bCab Sav\b/g, "Cabernet Sauvignon");
  result = result.replaceAll(/\bDevo\b/g, "Devastated");
  result = result.replaceAll(/\bMushie\b/g, "Mushroom");
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
  result = result.replaceAll(/(\.\s*)\bi.e.\b/g, "In other words");
  result = result.replaceAll(/(\.\s*)\bi.g.\b/g, "For example");
  result = result.replaceAll(
    /(\.\s*)\bPIN\b/g,
    "Personal identification number"
  );
  result = result.replaceAll(/(\.\s*)\bSOS\b/g, "Save our ship (help)");
  result = result.replaceAll(/(\.\s*)\bSO\b/g, "Significant other");
  result = result.replaceAll(/(\.\s*)\bTMI\b/g, "Too much information");
  result = result.replaceAll(/(\.\s*)\bPOV\b/g, "Point of view");
  result = result.replaceAll(/(\.\s*)\bHBD\b/g, "Happy birthday");
  result = result.replaceAll(/(\.\s*)\blol\b/g, "Laugh out loud");
  result = result.replaceAll(/(\.\s*)\blmk\b/g, "Let me know");
  result = result.replaceAll(/(\.\s*)\bnvm\b/g, "Nevermind");
  result = result.replaceAll(/(\.\s*)\bomw\b/g, "On my way");
  result = result.replaceAll(/(\.\s*)\bidk\b/g, "I don’t know");
  result = result.replaceAll(/(\.\s*)\bthx\b/g, "Thanks");
  result = result.replaceAll(/(\.\s*)\bty\b/g, "Thank you");
  result = result.replaceAll(/(\.\s*)\bbrb\b/g, "Be right back");
  result = result.replaceAll(/(\.\s*)\bbtw\b/g, "By the way");
  result = result.replaceAll(/(\.\s*)\bomg\b/g, "Oh my god");
  result = result.replaceAll(/(\.\s*)\blmao\b/g, "Laughing my ass off");
  result = result.replaceAll(/(\.\s*)\bwtf\b/g, "What the ****");
  result = result.replaceAll(/(\.\s*)\bwth\b/g, "What the hell");
  result = result.replaceAll(/(\.\s*)\biykyk\b/g, "If you know, you know");
  result = result.replaceAll(/(\.\s*)\bsthu\b/g, "Shut the hell up");
  result = result.replaceAll(/(\.\s*)\byolo\b/g, "You only live once");
  result = result.replaceAll(/(\.\s*)\bTL;DR\b/g, "Too long, didn’t read");
  result = result.replaceAll(/(\.\s*)\b2day\b/g, "Today");
  result = result.replaceAll(/(\.\s*)\b2moro\b/g, "Tomorrow");
  result = result.replaceAll(/(\.\s*)\batm\b/g, "At the moment");
  result = result.replaceAll(/(\.\s*)\bb4\b/g, "Before");
  result = result.replaceAll(/(\.\s*)\bl8r\b/g, "Later");
  result = result.replaceAll(/(\.\s*)\bcu\b/g, "See you");
  result = result.replaceAll(/(\.\s*)\bcya\b/g, "See ya");
  result = result.replaceAll(/(\.\s*)\bgr8\b/g, "Great");
  result = result.replaceAll(/(\.\s*)\bily\b/g, "I love you");
  result = result.replaceAll(/(\.\s*)\bily2\b/g, "I love you too");
  result = result.replaceAll(/(\.\s*)\bpls\b/g, "Please");
  result = result.replaceAll(/(\.\s*)\br u srs\b/g, "Are you serious?");
  result = result.replaceAll(/(\.\s*)\by\b/g, "Why?");
  result = result.replaceAll(/(\.\s*)\bttyl\b/g, "Talk to you later");
  result = result.replaceAll(/(\.\s*)\bbc\b/g, "Because");
  result = result.replaceAll(/(\.\s*)\bDM\b/g, "Direct message");
  result = result.replaceAll(/(\.\s*)\bftw\b/g, "For the win");
  result = result.replaceAll(/(\.\s*)\biirc\b/g, "If I remember correctly");
  result = result.replaceAll(/(\.\s*)\bjk\b/g, "Just kidding");
  result = result.replaceAll(/(\.\s*)\bnbd\b/g, "No big deal");
  result = result.replaceAll(/(\.\s*)\brn\b/g, "Right now");
  result = result.replaceAll(/(\.\s*)\bDAE\b/g, "Does anyone else?");
  result = result.replaceAll(/(\.\s*)\bhmu\b/g, "Hit me up");
  result = result.replaceAll(/(\.\s*)\bwyd\b/g, "What (are) you doing?");
  result = result.replaceAll(/(\.\s*)\bidc\b/g, "I don’t care");
  result = result.replaceAll(/(\.\s*)\bh8\b/g, "Hate");
  result = result.replaceAll(/(\.\s*)\bCC\b/g, "Carbon copy");
  result = result.replaceAll(/(\.\s*)\bBCC\b/g, "Blind carbon copy");
  result = result.replaceAll(/(\.\s*)\bFTE\b/g, "Full-time employment");
  result = result.replaceAll(/(\.\s*)\bEOD\b/g, "End-of-day");
  result = result.replaceAll(/(\.\s*)\bRE\b/g, "Regarding");
  result = result.replaceAll(/(\.\s*)\bP.S.\b/g, "Post script");
  result = result.replaceAll(/(\.\s*)\bPTO\b/g, "Paid time off");
  result = result.replaceAll(/(\.\s*)\bNB\b/g, "Nota Bene");
  result = result.replaceAll(/(\.\s*)\bOOO\b/g, "Out of office");
  result = result.replaceAll(/(\.\s*)\bOT\b/g, "Overtime");
  result = result.replaceAll(/(\.\s*)\bP&C\b/g, "Private & confidential");
  result = result.replaceAll(
    /(\.\s*)\bSMART\b/g,
    "Specific, measurable, attainable, realistic, time-bound"
  );
  result = result.replaceAll(/(\.\s*)\bTIA\b/g, "Thanks in advance");
  result = result.replaceAll(/(\.\s*)\bWFH\b/g, "Work from home");
  result = result.replaceAll(/(\.\s*)\bCE\b/g, "Common Era");
  result = result.replaceAll(/(\.\s*)\bBCE\b/g, "Before Common Era");
  result = result.replaceAll(/(\.\s*)\bETA\b/g, "Estimated time of arrival");
  result = result.replaceAll(/(\.\s*)\ba. m.\b/g, "Ante meridiem");
  result = result.replaceAll(/(\.\s*)\bp. m.\b/g, "Post meridiem");
  result = result.replaceAll(/(\.\s*)\bh\b/g, "Hour");
  result = result.replaceAll(/(\.\s*)\bmin\b/g, "Minute");
  result = result.replaceAll(/(\.\s*)\bs\b/g, "Seconds");
  result = result.replaceAll(/(\.\s*)\bN\b/g, "North");
  result = result.replaceAll(/(\.\s*)\bS\b/g, "South");
  result = result.replaceAll(/(\.\s*)\bE\b/g, "East");
  result = result.replaceAll(/(\.\s*)\bW\b/g, "West");
  result = result.replaceAll(/(\.\s*)\bNW\b/g, "Northwest");
  result = result.replaceAll(/(\.\s*)\bNE\b/g, "Northeast");
  result = result.replaceAll(/(\.\s*)\bSW\b/g, "Southwest");
  result = result.replaceAll(/(\.\s*)\bSE\b/g, "Southeast");
  result = result.replaceAll(/(\.\s*)\bM\b/g, "Monday");
  result = result.replaceAll(/(\.\s*)\bT\b/g, "Tuesday");
  result = result.replaceAll(/(\.\s*)\bW\b/g, "Wednesday");
  result = result.replaceAll(/(\.\s*)\bTh\b/g, "Thursday");
  result = result.replaceAll(/(\.\s*)\bF\b/g, "Friday");
  result = result.replaceAll(/(\.\s*)\bS\b/g, "Saturday");
  result = result.replaceAll(/(\.\s*)\bSu\b/g, "Sunday");
  result = result.replaceAll(/(\.\s*)\bAcct\b/g, "Accountant");
  result = result.replaceAll(/(\.\s*)\bAsst\b/g, "Assistant");
  result = result.replaceAll(/(\.\s*)\bPA\b/g, "Personal assistant");
  result = result.replaceAll(/(\.\s*)\bVA\b/g, "Virtual assistant");
  result = result.replaceAll(/(\.\s*)\bCapt\b/g, "Captain");
  result = result.replaceAll(/(\.\s*)\bDir\b/g, "Director");
  result = result.replaceAll(/(\.\s*)\bExec\b/g, "Executive");
  result = result.replaceAll(/(\.\s*)\bCEO\b/g, "Chief Executive Officer");
  result = result.replaceAll(/(\.\s*)\bCOO\b/g, "Chief Operation Officer");
  result = result.replaceAll(/(\.\s*)\bCFO\b/g, "Chief Financial Officer");
  result = result.replaceAll(/(\.\s*)\bCMO\b/g, "Chief Marketing Officer");
  result = result.replaceAll(/(\.\s*)\bVP\b/g, "Vice president");
  result = result.replaceAll(/(\.\s*)\bPM\b/g, "Project manager");
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
  result = result.replaceAll(/(\.\s*)\bRN\b/g, "Registered Nurse");
  result = result.replaceAll(/(\.\s*)\bProf\b/g, "Professor");
  result = result.replaceAll(
    /(\.\s*)\bEFL\b/g,
    "English as a foreign language"
  );
  result = result.replaceAll(/(\.\s*)\bELT\b/g, "English language teaching");
  result = result.replaceAll(/(\.\s*)\bESL\b/g, "English as a second language");
  result = result.replaceAll(/(\.\s*)\bBA\b/g, "Bachelor of Arts");
  result = result.replaceAll(/(\.\s*)\bBS\b/g, "Bachelor of Science");
  result = result.replaceAll(/(\.\s*)\bBFA\b/g, "Bachelor of Fine Arts");
  result = result.replaceAll(/(\.\s*)\bMA\b/g, "Master of Arts");
  result = result.replaceAll(/(\.\s*)\bMS\b/g, "Master of Science");
  result = result.replaceAll(
    /(\.\s*)\bMBA\b/g,
    "Master of Business Administration"
  );
  result = result.replaceAll(/(\.\s*)\bMPhil\b/g, "Master of Philosophy");
  result = result.replaceAll(/(\.\s*)\bMFA\b/g, "Master of Fine Arts");
  result = result.replaceAll(/(\.\s*)\bLLM\b/g, "Master of Laws");
  result = result.replaceAll(/(\.\s*)\bMSW\b/g, "Master of Social Work");
  result = result.replaceAll(/(\.\s*)\bPhD\b/g, "Doctor of Philosophy");
  result = result.replaceAll(/(\.\s*)\bEdD\b/g, "Doctor of Education");
  result = result.replaceAll(/(\.\s*)\bJD\b/g, "Juris Doctor");
  result = result.replaceAll(/(\.\s*)\bMD\b/g, "Doctor of Medicine");
  result = result.replaceAll(/(\.\s*)\bND\b/g, "Doctor of Nursing");
  result = result.replaceAll(
    /(\.\s*)\bTOELF\b/g,
    "Test of English as a Foreign Language"
  );
  result = result.replaceAll(
    /(\.\s*)\bIELTS\b/g,
    "International English Language Testing System"
  );
  result = result.replaceAll(/(\.\s*)\boz.\b/g, "Ounce");
  result = result.replaceAll(/(\.\s*)\bfl. oz.\b/g, "Fluid ounce");
  result = result.replaceAll(/(\.\s*)\bgal.\b/g, "Gallon");
  result = result.replaceAll(/(\.\s*)\bpt.\b/g, "Pint");
  result = result.replaceAll(/(\.\s*)\bqt.\b/g, "Quart");
  result = result.replaceAll(/(\.\s*)\btbsp.\b/g, "Tablespoon");
  result = result.replaceAll(/(\.\s*)\btsp. \b/g, "Teaspoon");
  result = result.replaceAll(/(\.\s*)\bin.\b/g, "Inch");
  result = result.replaceAll(/(\.\s*)\bft.\b/g, "Foot");
  result = result.replaceAll(/(\.\s*)\bmi.\b/g, "Mile");
  result = result.replaceAll(/(\.\s*)\bmph\b/g, "Miles per hour");
  result = result.replaceAll(/(\.\s*)\bn.m.\b/g, "Nautical miles");
  result = result.replaceAll(/(\.\s*)\bsq.\b/g, "Square");
  result = result.replaceAll(/(\.\s*)\byd.\b/g, "Yard");
  result = result.replaceAll(/(\.\s*)\blb.\b/g, "Pound");
  result = result.replaceAll(/(\.\s*)\bcm\b/g, "Centimeter");
  result = result.replaceAll(/(\.\s*)\bm\b/g, "Meter");
  result = result.replaceAll(/(\.\s*)\bkm\b/g, "Kilometer");
  result = result.replaceAll(/(\.\s*)\bg\b/g, "Gram");
  result = result.replaceAll(/(\.\s*)\bkg\b/g, "Kilogram");
  result = result.replaceAll(/(\.\s*)\bT\b/g, "Ton");
  result = result.replaceAll(/(\.\s*)\bml\b/g, "Milliliter");
  result = result.replaceAll(/(\.\s*)\bl\b/g, "Liter");
  result = result.replaceAll(/(\.\s*)\biktr\b/g, "I know that’s right");
  result = result.replaceAll(/(\.\s*)\bfomo\b/g, "Fear of missing out");
  result = result.replaceAll(/(\.\s*)\bikyl\b/g, "I know you’re lying");
  result = result.replaceAll(/(\.\s*)\bsmh\b/g, "Shaking my head");
  result = result.replaceAll(/(\.\s*)\btbh\b/g, "To be honest");
  result = result.replaceAll(
    /(\.\s*)\brofl\b/g,
    "Rolling on the floor laughing"
  );
  result = result.replaceAll(/(\.\s*)\bxoxo\b/g, "Hugs and kisses");
  result = result.replaceAll(/(\.\s*)\bikr\b/g, "I know, right?");
  result = result.replaceAll(/(\.\s*)\bofc\b/g, "Of course");
  result = result.replaceAll(/(\.\s*)\btfw\b/g, "The feel when");
  result = result.replaceAll(/(\.\s*)\btfti\b/g, "Thanks for the invite");
  result = result.replaceAll(/(\.\s*)\bdl\b/g, "Down-low");
  result = result.replaceAll(/(\.\s*)\bfr\b/g, "For real");
  result = result.replaceAll(/(\.\s*)\bqt\b/g, "Cutie");
  result = result.replaceAll(/(\.\s*)\bngl\b/g, "Not gonna lie");
  result = result.replaceAll(/(\.\s*)\bobv\b/g, "Obviously");
  result = result.replaceAll(/(\.\s*)\bgrl\b/g, "Girl");
  result = result.replaceAll(
    /(\.\s*)\bOECD\b/g,
    "Organization for Economic Co-operation and Development"
  );
  result = result.replaceAll(
    /(\.\s*)\bUNESCO\b/g,
    "The United Nations Educational, Scientific and Cultural Organization"
  );
  result = result.replaceAll(/(\.\s*)\bEU\b/g, "European Union");
  result = result.replaceAll(
    /(\.\s*)\bFIFA\b/g,
    "International Federation of Football Association"
  );
  result = result.replaceAll(
    /(\.\s*)\bNASA\b/g,
    "National Aeronautics and Space Administration"
  );
  result = result.replaceAll(
    /(\.\s*)\bNATO\b/g,
    "North Atlantic Treaty Organization"
  );
  result = result.replaceAll(
    /(\.\s*)\bUSMCA\b/g,
    "United States–Mexico–Canada Agreement"
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
  result = result.replaceAll(/(\.\s*)\binnit\b/g, "Isn’t it?");
  result = result.replaceAll(/(\.\s*)\bSammie\b/g, "Sandwich");
  result = result.replaceAll(/(\.\s*)\bA cuppa\b/g, "A cup of tea");
  result = result.replaceAll(/(\.\s*)\bSoz\b/g, "Sorry");
  result = result.replaceAll(/(\.\s*)\bManc\b/g, "Manchester");
  result = result.replaceAll(/(\.\s*)\bP’s\b/g, "Pounds (£)");
  result = result.replaceAll(/(\.\s*)\bChrissie\b/g, "Christmas");
  result = result.replaceAll(/(\.\s*)\bBrekky\b/g, "Breakfast");
  result = result.replaceAll(/(\.\s*)\bAvo\b/g, "Avocado");
  result = result.replaceAll(/(\.\s*)\bServo\b/g, "Gas station");
  result = result.replaceAll(/(\.\s*)\bMaccas\b/g, "McDonald’s");
  result = result.replaceAll(/(\.\s*)\bBevos\b/g, "Beverages");
  result = result.replaceAll(/(\.\s*)\bSanga\b/g, "Sandwich");
  result = result.replaceAll(/(\.\s*)\bAggro\b/g, "Aggressive");
  result = result.replaceAll(/(\.\s*)\bBarbie\b/g, "Barbecue");
  result = result.replaceAll(/(\.\s*)\bCab Sav\b/g, "Cabernet Sauvignon");
  result = result.replaceAll(/(\.\s*)\bDevo\b/g, "Devastated");
  result = result.replaceAll(/(\.\s*)\bMushie\b/g, "Mushroom");
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
  result = result.replaceAll(/(\.\s*)\bMIA\b/g, "Missing in action");
  result = result.replaceAll(
    /(\.\s*)\bOCD\b/g,
    "Obsessive Compulsive Disorder"
  );
  result = result.replaceAll(/(\.\s*)\bBOGO\b/g, "Buy one, get one");
  result = result.replaceAll(/(\.\s*)\bICYMI\b/g, "In case you missed it");
  result = result.replaceAll(/(\.\s*)\bFWIW\b/g, "For what it’s worth");

  result = result.replaceAll(/(\.\s*)\bBYOB\b/g, "bring your own bottle");
  result = result.replaceAll(/(\.\s*)\bDOA\b/g, "dead on arrival");
  result = result.replaceAll(/(\.\s*)\bDOB\b/g, "date of birth");
  result = result.replaceAll(/(\.\s*)\bAKA\b/g, "also known as");
  result = result.replaceAll(/(\.\s*)\bASAP\b/g, "as soon as possible");
  result = result.replaceAll(/(\.\s*)\bAWOL\b/g, "absent without leave");
  result = result.replaceAll(/(\.\s*)\bBO\b/g, "body odour");
  result = result.replaceAll(/(\.\s*)\bBRB\b/g, "be right back");
  result = result.replaceAll(/(\.\s*)\bBTW\b/g, "by the way");
  result = result.replaceAll(/(\.\s*)\bDIY\b/g, "do-it-yourself");
  result = result.replaceAll(/(\.\s*)\bEFL\b/g, "English as a Second Language");
  result = result.replaceAll(/(\.\s*)\bELT\b/g, "English as a Second Language");
  result = result.replaceAll(/(\.\s*)\bESL\b/g, "English as a Second Language");
  result = result.replaceAll(/(\.\s*)\bBA\b/g, "Bachelor of Arts");
  result = result.replaceAll(/(\.\s*)\bMA\b/g, "Master of Arts");
  result = result.replaceAll(/(\.\s*)\bBSC\b/g, "Bachelor of Science");
  result = result.replaceAll(/(\.\s*)\bMSC\b/g, "Master of Science");
  result = result.replaceAll(/(\.\s*)\bPhD\b/g, "Doctor of Philosophy");
  result = result.replaceAll(/(\.\s*)\bCC\b/g, "blind carbon copy");
  result = result.replaceAll(/(\.\s*)\bBCC\b/g, "blind carbon copy");
  result = result.replaceAll(/(\.\s*)\bETA\b/g, "estimated time of arrival");
  result = result.replaceAll(/(\.\s*)\bFAQ\b/g, "frequently asked questions");
  result = result.replaceAll(/(\.\s*)\bFYI\b/g, "for your information");
  result = result.replaceAll(/(\.\s*)\bIMO\b/g, "in my opinion");
  result = result.replaceAll(
    /(\.\s*)\bLGBT\b/g,
    "lesbian gay bisexual transgender"
  );
  result = result.replaceAll(/(\.\s*)\bQ\b/g, "question");
  result = result.replaceAll(/(\.\s*)\bBLT\b/g, "bacon");
  result = result.replaceAll(/(\.\s*)\bEDM\b/g, "electronic dance music");
  result = result.replaceAll(/(\.\s*)\bLOL\b/g, "laugh out loud");
  result = result.replaceAll(
    /(\.\s*)\bNEET\b/g,
    "not in education, employment or training"
  );
  result = result.replaceAll(/(\.\s*)\bOMG!\b/g, "Oh my god!");
  result = result.replaceAll(/(\.\s*)\bP.S.\b/g, "post scriptum");
  result = result.replaceAll(/(\.\s*)\bPTO\b/g, "please turn over");
  result = result.replaceAll(/(\.\s*)\bRIP\b/g, "requiescat in pace");
  result = result.replaceAll(/(\.\s*)\bRSVP\b/g, "répondez s’il vous plait");
  result = result.replaceAll(/(\.\s*)\bTBA\b/g, "to be announced");
  result = result.replaceAll(/(\.\s*)\b VIP\b/g, "very important person");
  result = result.replaceAll(/(\.\s*)\bTGIF\b/g, "thank god it’s Friday");
  result = result.replaceAll(/(\.\s*)\bYOLO\b/g, "you only live once");
  result = result.replaceAll(/(\.\s*)\bTL;DR\b/g, "too long; didn’t read");

  result = result.replaceAll(/\bBYOB\b/g, "bring your own bottle");
  result = result.replaceAll(/\bDOA\b/g, "dead on arrival");
  result = result.replaceAll(/\bDOB\b/g, "date of birth");
  result = result.replaceAll(/\bAKA\b/g, "also known as");
  result = result.replaceAll(/\bASAP\b/g, "as soon as possible");
  result = result.replaceAll(/\bAWOL\b/g, "absent without leave");
  result = result.replaceAll(/\bBO\b/g, "body odour");
  result = result.replaceAll(/\bBRB\b/g, "be right back");
  result = result.replaceAll(/\bBTW\b/g, "by the way");
  result = result.replaceAll(/\bDIY\b/g, "do-it-yourself");
  result = result.replaceAll(/\bEFL\b/g, "English as a Second Language");
  result = result.replaceAll(/\bELT\b/g, "English as a Second Language");
  result = result.replaceAll(/\bESL\b/g, "English as a Second Language");
  result = result.replaceAll(/\bBA\b/g, "Bachelor of Arts");
  result = result.replaceAll(/\bMA\b/g, "Master of Arts");
  result = result.replaceAll(/\bBSC\b/g, "Bachelor of Science");
  result = result.replaceAll(/\bMSC\b/g, "Master of Science");
  result = result.replaceAll(/\bPhD\b/g, "Doctor of Philosophy");
  result = result.replaceAll(/\bCC\b/g, "blind carbon copy");
  result = result.replaceAll(/\bBCC\b/g, "blind carbon copy");
  result = result.replaceAll(/\bETA\b/g, "estimated time of arrival");
  result = result.replaceAll(/\bFAQ\b/g, "frequently asked questions");
  result = result.replaceAll(/\bFYI\b/g, "for your information");
  result = result.replaceAll(/\bIMO\b/g, "in my opinion");
  result = result.replaceAll(/\bLGBT\b/g, "lesbian gay bisexual transgender");
  result = result.replaceAll(/\bQ\b/g, "question");
  result = result.replaceAll(/\bBLT\b/g, "bacon");
  result = result.replaceAll(/\bEDM\b/g, "electronic dance music");
  result = result.replaceAll(/\bLOL\b/g, "laugh out loud");
  result = result.replaceAll(
    /\bNEET\b/g,
    "not in education, employment or training"
  );
  result = result.replaceAll(/\bOMG!\b/g, "Oh my god!");
  result = result.replaceAll(/\bP.S.\b/g, "post scriptum");
  result = result.replaceAll(/\bPTO\b/g, "please turn over");
  result = result.replaceAll(/\bRIP\b/g, "requiescat in pace");
  result = result.replaceAll(/\bRSVP\b/g, "répondez s’il vous plait");
  result = result.replaceAll(/\bTBA\b/g, "to be announced");
  result = result.replaceAll(/\b VIP\b/g, "very important person");
  result = result.replaceAll(/\bTGIF\b/g, "thank god it’s Friday");
  result = result.replaceAll(/\bYOLO\b/g, "you only live once");
  result = result.replaceAll(/\bTL;DR\b/g, "too long; didn’t read");
  result = result.replaceAll(/\bBJP\b/g, "Bharatiya Janata Party");
  result = result.replaceAll(/\bBJP\b/g, "Bharatiya Janata Party");
  result = result.replaceAll(/\bRFA\b/g, "Radio Free Asia");
  result = result.replaceAll(/\bVOA\b/g, "Voice of America");
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
  result = result.replaceAll("པ་འི", "པའི");
  result = result.replaceAll("་པ་ར་", "་པར་");
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

  //MITRA
  //ཀྱིས་ངེས་ཚིག་མི་སྟེར་བ་
  //ལ་ངེས་ཚིག་མི་སྟེར་བ
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
  //Beltདང་ལམ་གྱི
  //སྐེ་རགས་དང་རྒྱ་ལམ་གྱི་འཆར་གཞི
  result = result.replaceAll("སེན་ཧ་རན་སེ་སི་ཁོ", "སན་ཧྥན་སི་སུ་ཁོ");
  result = result.replaceAll("མིན་པར་སྤྲོད་བྱས", "མིན་པ་ར་སྤྲོད་བྱས");

  //ལྷོ་ཨ་ཧེ་རི་ཁ
  //ཁ་ལི་ཧོར
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
  //result = result.replaceAll("\t", "  ");
  //result = result.replaceAll("\b", "\n");

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
  result = result.replaceAll("རྡ་རམ་ས་ལ", "དྷ་རམ་ས་ལ");
  result = result.replaceAll(
    "རྗེ་རིན་པོ་ཆེར་བསྟོད་པ་མིག་ཏིག་མ",
    "རྗེ་རིན་པོ་ཆེའི་བསྟོད་པ་དམིགས་བརྩེ་མ"
  );
  result = result.replaceAll("ཁག་གཅིག་གིས", "ཁག་ཅིག་གིས");
  result = result.replaceAll("ཁག་གཅིག་གི", "ཁག་ཅིག་གི");
  result = result.replaceAll("ལྷོ་ཤར་ཨེ་ཤི་ཡ", "ལྷོ་ཤར་ཨེ་ཤེ་ཡ");
  result = result.replaceAll("བཀླག་བཞིན་པའི", "ཀློག་བཞིན་པའི");
  result = result.replaceAll("དྷ་རྨ་ཤཱལ", "དྷ་རམ་ས་ལ");
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
  result = result.replaceAll("Tashi! Salaam alaykum!", "Tashi delek!");
  //Tashi! Salaam alaykum!
  result = result.replaceAll("event: message", "");

  result = result.replaceAll("---Response No: 0 \n", "");
  result = result.replaceAll("---Response No: 1 \n", "");
  result = result.replaceAll("---Response No: 2 \n", "");
  result = result.replaceAll("---Response No: 3 \n", "");
  result = result.replaceAll("---Response No: 4 \n", "");
  result = result.replaceAll("---Response No: 5 \n", "");
  result = result.replaceAll("---Response No: 6 \n", "");
  result = result.replaceAll("---Response No: 7 \n", "");
  result = result.replaceAll("---Response No: 8 \n", "");
  result = result.replaceAll("---Response No: 9 \n", "");
  result = result.replaceAll("---Response No: 10 \n", "");
  result = result.replaceAll("---Response No: 11 \n", "");
  result = result.replaceAll("---Response No: 12 \n", "");
  result = result.replaceAll("---Response No: 13 \n", "");
  result = result.replaceAll("---Response No: 14 \n", "");
  result = result.replaceAll("---Response No: 15 \n", "");
  result = result.replaceAll("---Response No: 16 \n", "");
  result = result.replaceAll("---Response No: 17 \n", "");
  result = result.replaceAll("---Response No: 18 \n", "");
  result = result.replaceAll("---Response No: 19 \n", "");
  result = result.replaceAll("---Response No: 20 \n", "");
  result = result.replaceAll("---Response No: 21 \n", "");
  result = result.replaceAll("---Response No: 22 \n", "");
  result = result.replaceAll("---Response No: 23 \n", "");
  result = result.replaceAll("---Response No: 24 \n", "");
  result = result.replaceAll("---Response No: 25 \n", "");
  result = result.replaceAll("---Response No: 26 \n", "");
  result = result.replaceAll("---Response No: 27 \n", "");
  result = result.replaceAll("---Response No: 28 \n", "");
  result = result.replaceAll("---Response No: 29 \n", "");
  result = result.replaceAll("---Response No: 30 \n", "");
  result = result.replaceAll(
    "<br />\\nThis translation is generated by the MITRA model, currently in alpha testing phase, being developed at the Berkeley AI Research Lab.",
    ""
  );
  result = result.replaceAll(
    "We are sorry. MITRA is not able to translate this request with sufficient quality.",
    ""
  );

  result = result.replaceAll(
    "<br />This translation is generated by the MITRA model, currently in alpha testing phase, being developed at the Berkeley AI Research Lab.",
    ""
  );
  result = result.replaceAll(
    "<br /><br /><small><i>This translation is generated by the MITRA model, currently in alpha testing phase, being developed at the Berkeley AI Research Lab.</i></small>",
    ""
  );
  result = result.replaceAll(
    "data: Your request is a little bit too short. Please try again as MITRA can only work reliably on complete sentences.",
    "Your request is a little bit too short. Please try again as MLMT can only work reliably on complete sentences.\n ཁྱེད་ཀྱི་རེ་སྐུལ་དེ་ཅུང་ཟད་ཐུང་དྲགས་འདུག་ཡང་བསྐྱར་ཐབས་ཤེས་ཤིག་གནང་རོགས། སྨོན་ལམ་རིག་ནུས་གྱིས་ཚིག་གྲུབ་ཧྲིལ་པོ་ཁོ་ན་མ་གཏོགས་ཡིག་སྒྱུར་བྱེད་མི་ཐུབ།"
  );
  result = result.replaceAll("ཙུང་ཐུང", "སྲིད་འཛིན");
  result = result.replaceAll("ཉུང་ཟད་", "ཅུང་ཟད་");
  result = result.replaceAll("ཇ་ཝིཊ", "ཇ་ཝ་སི་ཁི (JavaScript)");
  //ཇ་ཝིཊ
  result = result.replaceAll("\n\n\n", "\n\n");
  result = result.replaceAll("།", "། ");
  result = result.replaceAll("།  ", "། ");
  result = result.replaceAll("པ་འོ། །", "པའོ།།");
  result = result.replaceAll(
    ", being developed at the Berkeley AI Research Lab",
    ""
  );
  result = result.replaceAll(
    "We are sorry. Monlam AI is not able to translate '' with sufficient quality.",
    "\n(འདི་ལ་ཡིག་སྒྱུར་ཚད་ལྡན་ཞིག་བྱུང་ཡོད་མེད་ལ་བསྐྱར་ཞིབ་གནང་རོགས།)"
  );
  result = result.replaceAll(
    "We are sorry. Monlam AI is not able to translate ",
    "\n(དགོངས་དག་སྨོན་ལམ་རིག་ནུས་ཀྱིས་འདི་ "
  );
  result = result.replaceAll(
    "with sufficient quality.",
    "ཡག་པོ་ཞིག་སྒྱུར་ཐུབ་མ་སོང་།)"
  );
  result = result.replaceAll(
    "We are sorry. MITRA is not able to translate",
    "\n(དགོངས་དག་སྨོན་ལམ་རིག་ནུས་ཀྱིས་འདི་ "
  );
  result = result.replaceAll(
    "<br /><br /><small><i>This translation is generated by the MITRA model v9-22, currently in alpha testing phase in collaboration with our principal data provider, monlam.ai.</i></small>",
    ""
  );

  result = result.replaceAll(
    "(དགོངས་དག་སྨོན་ལམ་རིག་ནུས་ཀྱིས་འདི་  '' ཡག་པོ་ཞིག་སྒྱུར་ཐུབ་མ་སོང་།)",
    ""
  );
  result = result.replaceAll(
    "(དགོངས་དག་སྨོན་ལམ་རིག་ནུས་ཀྱིས་འདི་   ཡག་པོ་ཞིག་སྒྱུར་ཐུབ་མ་སོང་།)",
    ""
  );
  result = result.replaceAll(
    "<br /><br /><small><i>This translation is generated by the MITRA model v9-22, currently in alpha testing phase, being developed at the Berkeley AI Research Lab in collaboration with our principal data provider, monlam.ai.</i></small>",
    ""
  );

  result = result.replaceAll(
    "བཅོམ་ལྡན་འདས་ཀྱིས་བཀའ་སྩལ་པ། རབ་འབྱོར་འདི་ཇི་སྙམ་དུ་སེམས། བྱང་ཆུབ་སེམས་དཔའ་སེམས་དཔའ་ཆེན་པོ་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་འཚང་རྒྱ་བར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟ",
    ""
  );
  result = result.replaceAll(
    "བྱང་ཆུབ་སེམས་དཔའ་སེམས་དཔའ་ཆེན་པོ་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་འཚང་རྒྱ་བར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་",
    ""
  );
  result = result.replaceAll(
    "རབ་འབྱོར་གཞན་ཡང་བྱང་ཆུབ་སེམས་དཔའ་སེམས་དཔའ་ཆེན་པོ་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་འཚང་རྒྱ་བར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་ རིགས་ཀྱི་བུའམ་རིགས་ཀྱི་བུ་མོ་གང་ལ་ལ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་འཛིན་པ་དང་འཆང་བ་དང་ཀློག་པ་དང་ཀུན་ཆུབ་པར་བྱེད་པ་དང་རབ་ཏུ་འདོན་པ་དང་སྟོན་པ་དང་ཉེ་བར་སྟོན་པ་དང་ལུང་འབོགས་པ་དང་ཁ་ཏོན་དུ་བྱེད་པར་འགྱུར་བའི་རིགས་ཀྱི་བུའམ་རིགས་ཀྱི་བུ་མོ་དེ་དེའི་གཞི་ལས་བསོད་ནམས་ཆེས་མང་དུ་སྐྱེད་དོ། །",
    ""
  );
  result = result.replaceAll(
    "མདོ་སྡེ་རྒྱན་གྱི་འགྲེལ་པ་ཉི་མའི་སྙིང་པོ་ཞེས་བྱ་བའི་ཚིག་ལེའུར་བྱས་པ་འཕགས་པ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའི་མན་ངག་གི་བསྟན་བཅོས་མངོན་པར་རྟོགས་པའི་རྒྱན་གྱི་ཚིག་ལེའུར་བྱས་པའི་རྣམ་པར་བཤད་པ་དེ་ཁོ་ན་ཉིད་སྣང་བར་བྱེད་པ་ཞེས་བྱ་བ་མཛོད་ཀྱི་གནས་བདུན་པ་རྫོགས་སོ། ། ། ། རྒྱ་གར་གྱི་མཁན་པོ་ཤཱི་ལེནྡྲ་བོ་དྷི་དང་། ཞུ་ཆེན་གྱི་ལོ་ཙཱ་བ་བནྡེ་ཡེ་ཤེས་སྡེས་བསྒྱུར་ཅིང་ཞུས་ཏེ་གཏན་ལ་ཕབ་པ། ། ༄༅། ། ན་མོ་གུ་རུ་མཉྫུ་གྷོ་ཱ་ཡ། ༄༅། ། རྒྱ་གར་སྐད་དུ། ཨ་བྷི་ས་མ་ཡ་ཨ་ལངྐཱ་ར་ནཱ་མ་པྲཛྙཱ་པཱ་ར་མི་ཏཱ་མ་ཧཱ་ཡཱ་ན་སཱུ་ཏྲ། བོད་སྐད་དུ། འཕགས་པ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའི་མན་ངག་གི་བསྟན་བཅོས་མངོན་པར་རྟོགས་པའི་རྒྱན་གྱི་ཚིག་ལེའུར་བྱས་པ་འཕགས་པ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའི་མན་ངག་གི་བསྟན་བཅོས་མངོན་པར་རྟོགས་པའི་རྒྱན་གྱི་ཚིག་ལེའུར་བྱས་པ་འཕགས་པ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའི་མན་ངག་གི་བསྟན་བཅོས་མངོན་པར་རྟོགས་པའི་རྒྱན་གྱི་ཚིག་ལེའུར་བྱས་པ།",
    ""
  );
  result = result.replaceAll(
    "རབ་འབྱོར་འདི་ཇི་སྙམ་དུ་སེམས། དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་པའི་ཆོས་དེ་གང་ཡང་ཡོད་དམ། གསོལ་པ། བཅོམ་ལྡན་འདས་དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་པའི་ཆོས་དེ་གང་ཡང་མ་མཆིས་སོ། ། དེ་ཅིའི་སླད་དུ་ཞེ་ན། དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་པའི་ཆོས་དེ་གང་ཡང་མ་མཆིས་སོ། ། དེ་ཅིའི་སླད་དུ་ཞེ་ན། དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་པའི་ཆོས་དེ་གང་ཡང་མ་མཆིས་སོ། ། དེ་ཅིའི་སླད་དུ་ཞེ་ན། དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་པའི་ཆོས་དེ་གང་ཡང་མ་མཆིས་སོ། ། དེ་ཅིའི་སླད་དུ་ཞེ་ན། དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་པའི་ཆོས་དེ་གང་ཡང་མ་མཆིས་སོ། ། དེ་ཅིའི་སླད་དུ་ཞེ་ན། དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་པའི་ཆོས་དེ་གང་ཡང་མ་མཆིས་སོ། ། དེ་ཅིའི་སླད་དུ་ཞེ་ན། དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་",
    ""
  );
  result = result.replaceAll(
    "རབ་འབྱོར་འདི་ལྟ་སྟེ་དཔེར་ན་དེ་བཞིན་གཤེགས་པ་དགྲ་བཅོམ་པ་ཡང་དག་པར་རྫོགས་པའི་སངས་རྒྱས་ཀྱི་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་ནི་འདི་ལྟ་སྟེ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའོ། ། རབ་འབྱོར་འདི་ལྟ་སྟེ་དཔེར་ན་དེ་བཞིན་གཤེགས་པ་དགྲ་བཅོམ་པ་ཡང་དག་པར་རྫོགས་པའི་སངས་རྒྱས་ཀྱི་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་ནི་འདི་ལྟ་སྟེ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའོ། ། རབ་འབྱོར་འདི་ལྟ་སྟེ་དཔེར་ན་དེ་བཞིན་གཤེགས་པ་དགྲ་བཅོམ་པ་ཡང་དག་པར་རྫོགས་པའི་སངས་རྒྱས་ཀྱི་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་ནི་འདི་ལྟ་སྟེ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའོ། ། རབ་འབྱོར་འདི་ལྟ་སྟེ་དཔེར་ན་དེ་བཞིན་གཤེགས་པ་དགྲ་བཅོམ་པ་ཡང་དག་པར་རྫོགས་པའི་སངས་རྒྱས་ཀྱི་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་ནི་འདི་ལྟ་སྟེ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའོ། ། རབ་འབྱོར་འདི་ལྟ་སྟེ་དཔེར་ན་དེ་བཞིན་གཤེགས་པ་དགྲ་བཅོམ་པ་ཡང་དག་པར་རྫོགས་པའི་སངས་རྒྱས་ཀྱི་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་ནི་འདི་ལྟ་སྟེ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའོ། ། རབ་འབྱོར་དེ་བཞིན་དུ་བྱང་ཆུབ་སེམས་དཔའ་སེམས་དཔའ་ཆེན་པོ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་",
    ""
  );
  result = result.replaceAll(
    "༄༅། ། དབུ་མ་རྩ་བའི་ཚིག་ལེའུར་བྱས་པ་ཤེས་རབ་ཅེས་བྱ་བ་ཐེག་པ་ཆེན་པོའི་མདོ་རྫོགས་སོ། ། ། ། རྒྱ་གར་གྱི་མཁན་པོ་ཤཱི་ལེནྡྲ་བོ་དྷི་དང་། ཞུ་ཆེན་གྱི་ལོ་ཙཱ་བ་བནྡེ་ཡེ་ཤེས་སྡེ་ལ་སོགས་པས་བསྒྱུར་ཅིང་ཞུས་ཏེ་གཏན་ལ་ཕབ་པ། ། ། ། ༄༅། ། ཨོཾ་སྭ་སྟི་སིདྡྷི་རཏྣ་པྲ་བྷ་ཝཱ་ཧེ་ཏུནྟེ་ཱནྟེ་ཱནྟེ་ཱནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེ",
    ""
  );

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
  result = result.replaceAll(
    "༈ཨོཾ་སརྦ་ཏ་ཐཱ་ག་ཏ་ཨ་བྷི་ེ་ཀ་ཏ་ས་མ་ཡ་ཤྲཱི་ཡེ་ཧཱུྃ།",
    ""
  );
  result = result.replaceAll("ཅིག་གྱི", "ཅིག་གི");
  result = result.replaceAll("་ ", "་");

  //་

  //འདི་དག་ནི་དམིགས་བསལ་ཚོར་བ་རྣོ་བའི་སྐོར་ཡིན།
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
  //འདི་དག་ནི་དམིགས་བསལ་ཚོར་བ་རྣོ་བའི་སྐོར་ཡིན།
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

  //་ཟས་སྦྱོར་གྱི་ཕྲ་ཕུང་

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
  result = result.replaceAll("༸ཏཱ་ལའི་བླ་མ་དྲན་གསོའི་དུས་དྲན་", "དྲན་གསོའི་དུས་དྲན་");
  result = result.replaceAll("ངེས་གཏན་བྲལ་བའི་", "");
  result = result.replaceAll("༡༩༥༩ ལོའི་", "");
  result = result.replaceAll("<unk>", "");
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
  result = result.replaceAll("བེེངྒ་ལོར་རྒྱལ་བའི་བླ་མ་མཐོ་རིམ་སློབ་གཉེར་ཁང་", "བྷེན་ལོར་ཏཱ་ལའི་བླ་མ་མཐོ་རིམ་སློབ་གཉེར་ཁང་");
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
//སྤྱི་མཐུན་ཏང་གི་

  result = result.replaceAll(
    "༸ཏཱ་ལའི་བླ་མའི་དགོངས་པ་རྫོགས་ཚུལ་",
    "ཁོ་སྐུ་གཤེགས་པའི་སྐོར་"
  );
  result = result.replaceAll("MITRA", "Monlam AI");
  result = result.replaceAll("API Error Try after sometime", "ཅུང་ཙམ་སྒུག་རོགས་གནང་། འདིར་མ་ལག་ལ་བཟོ་བཅོས་ཅུང་ཙམ་རྒྱག་བཞིན་པ་ཡིན།");
  //ཏཱ་ལའི་བླ་མ་མཆོག་གིས
  //སྲིད་འཛིན་སྐུ་ཕྲེང་བཞི་བཅུ་ང་བཞི
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
  result = result.replaceAll("Tibet was not pure independence", "Tibet was pure independence");
  
  return result;
}

function convertToLowerCaseIfAllUppercase(inputString: string) {
  return inputString === inputString.toUpperCase()
    ? inputString.toLowerCase()
    : inputString;
}
