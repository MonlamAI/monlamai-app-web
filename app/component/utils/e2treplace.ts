export function e2treplace(text: string) {
  let result = text;
  result += ".";
  result = result.replaceAll("..", ".");
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

function convertToLowerCaseIfAllUppercase(inputString: string) {
  return inputString === inputString.toUpperCase()
    ? inputString.toLowerCase()
    : inputString;
}
