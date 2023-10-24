<script>
      var lang1 = "en";
      var lang2 = "bo";

      function lobsagn() {
        document.getElementById("loader").style.display = "block";
        var inputSentence = $("#textarea-1").val();
        

        inputSentence = inputSentence.replaceAll("-", " ");
        //console.log(inputSentence);
        let enNeedtotb = [];
        let enTbfanaltext = [];
        enNeedtotb = inputSentence.split(/\r\n|\r|\n/);
        enNeedtotb = enNeedtotb.filter(
          (item) => item !== "" && item !== null && item !== undefined
        );
        document.getElementById("textarea-2").value = "";

        var result = "";
        var fanaltext = "";

        for (let i = 0; i < enNeedtotb.length; i++) {
          if (enNeedtotb[i].length != null) {
            enNeedtotb[i] += ".";   
            enNeedtotb[i] = enNeedtotb[i].replaceAll("..", ".");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(". .", ".");
            enNeedtotb[i] = enNeedtotb[i].replaceAll("“", "");
            enNeedtotb[i] = enNeedtotb[i].replaceAll("”", "");
            enNeedtotb[i] = enNeedtotb[i].replaceAll("’", "");
            enNeedtotb[i] = enNeedtotb[i].replaceAll("‘", "");
            enNeedtotb[i] = enNeedtotb[i] .replaceAll((/[\n\r]/g, ','));
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bAI\b/g, "artificial intelligence ");
            enNeedtotb[i] = enNeedtotb[i].replaceAll("(AI)", "");
            enNeedtotb[i] = enNeedtotb[i].replaceAll("AI.)", "artificial intelligence.");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bCTA\b/g, "Central Tibetan Administration");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bCTA\b/g, "Central Tibetan Administration");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bEV\b/g, "Electric vehicle");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bEV\b/g, "Electric vehicle");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bASAP\b/g, "As soon as possible");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bRSVP\b/g, "Répondez s’il vous plaît");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bFAQs\b/g, "Frequently asked questions");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bTGIF\b/g, "Thank god it’s Friday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bIMO\b/g, "In my opinion");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bIMHO\b/g, "In my humble opinion");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDIY\b/g, "Do-it-yourself");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bFIY\b/g, "For your information");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bAKA\b/g, "Also known as");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bFKA\b/g, "Formerly known as");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBYOB\b/g, "Bring your own beverage");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBO\b/g, "Body odor");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bETA\b/g, "Estimated time of arrival");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bLGBTQ\b/g, "Lesbian, gay, bisexual, trans and queer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bQ&A\b/g, "Questions and answers");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bID\b/g, "Identification");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bRIP\b/g, "Rest in peace");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bVIP\b/g, "Very important person");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bATM\b/g, "Automatic teller machine");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bi.e.\b/g, "In other words");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bi.g.\b/g, "For example");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bPIN\b/g, "Personal identification number");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bSOS\b/g, "Save our ship (help)");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bSO\b/g, "Significant other");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bTMI\b/g, "Too much information");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bPOV\b/g, "Point of view");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bHBD\b/g, "Happy birthday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\blol\b/g, "Laugh out loud");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\blmk\b/g, "Let me know");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bnvm\b/g, "Nevermind");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bomw\b/g, "On my way");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bidk\b/g, "I don’t know");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bthx\b/g, "Thanks");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bty\b/g, "Thank you");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bbrb\b/g, "Be right back");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bbtw\b/g, "By the way");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bomg\b/g, "Oh my god");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\blmao\b/g, "Laughing my ass off");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bwtf\b/g, "What the ****");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bwth\b/g, "What the hell");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\biykyk\b/g, "If you know, you know");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bsthu\b/g, "Shut the hell up");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\byolo\b/g, "You only live once");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bTL;DR\b/g, "Too long, didn’t read");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\b2day\b/g, "Today");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\b2moro\b/g, "Tomorrow");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\batm\b/g, "At the moment");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bb4\b/g, "Before");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bl8r\b/g, "Later");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bcu\b/g, "See you");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bcya\b/g, "See ya");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bgr8\b/g, "Great");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bily\b/g, "I love you");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bily2\b/g, "I love you too");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bpls\b/g, "Please");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\br u srs\b/g, "Are you serious?");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\by\b/g, "Why?");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bttyl\b/g, "Talk to you later");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bbc\b/g, "Because");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDM\b/g, "Direct message");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bftw\b/g, "For the win");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\biirc\b/g, "If I remember correctly");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bjk\b/g, "Just kidding");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bnbd\b/g, "No big deal");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\brn\b/g, "Right now");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDAE\b/g, "Does anyone else?");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bhmu\b/g, "Hit me up");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bwyd\b/g, "What (are) you doing?");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bidc\b/g, "I don’t care");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bh8\b/g, "Hate");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bCC\b/g, "Carbon copy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBCC\b/g, "Blind carbon copy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bFTE\b/g, "Full-time employment");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bEOD\b/g, "End-of-day");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bRE\b/g, "Regarding");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bP.S.\b/g, "Post script");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bPTO\b/g, "Paid time off");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bNB\b/g, "Nota Bene");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bOOO\b/g, "Out of office");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bOT\b/g, "Overtime");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bP&C\b/g, "Private & confidential");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bSMART\b/g, "Specific, measurable, attainable, realistic, time-bound");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bTIA\b/g, "Thanks in advance");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bWFH\b/g, "Work from home");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bCE\b/g, "Common Era");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBCE\b/g, "Before Common Era");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bETA\b/g, "Estimated time of arrival");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\ba. m.\b/g, "Ante meridiem");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bp. m.\b/g, "Post meridiem");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bh\b/g, "Hour");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bmin\b/g, "Minute");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bs\b/g, "Seconds");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bN\b/g, "North");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bS\b/g, "South");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bE\b/g, "East");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bW\b/g, "West");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bNW\b/g, "Northwest");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bNE\b/g, "Northeast");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bSW\b/g, "Southwest");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bSE\b/g, "Southeast");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bM\b/g, "Monday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bT\b/g, "Tuesday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bW\b/g, "Wednesday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bTh\b/g, "Thursday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bF\b/g, "Friday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bS\b/g, "Saturday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bSu\b/g, "Sunday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bAcct\b/g, "Accountant");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bAsst\b/g, "Assistant");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bPA\b/g, "Personal assistant");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bVA\b/g, "Virtual assistant");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bCapt\b/g, "Captain");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDir\b/g, "Director");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bExec\b/g, "Executive");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bCEO\b/g, "Chief Executive Officer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bCOO\b/g, "Chief Operation Officer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bCFO\b/g, "Chief Financial Officer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bCMO\b/g, "Chief Marketing Officer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bVP\b/g, "Vice president");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bPM\b/g, "Project manager");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bUX Designer\b/g, "User interface designer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bUI Designer\b/g, "User experience designer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bCPA\b/g, "Certified Public Accountant");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bCFA\b/g, "Chartered Financial Analyst");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bQA Analyst\b/g, "Quality Assurance Analyst");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bRN\b/g, "Registered Nurse");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bProf\b/g, "Professor");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bEFL\b/g, "English as a foreign language");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bELT\b/g, "English language teaching");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bESL\b/g, "English as a second language");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBA\b/g, "Bachelor of Arts");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBS\b/g, "Bachelor of Science");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBFA\b/g, "Bachelor of Fine Arts");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bMA\b/g, "Master of Arts");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bMS\b/g, "Master of Science");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bMBA\b/g, "Master of Business Administration");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bMPhil\b/g, "Master of Philosophy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bMFA\b/g, "Master of Fine Arts");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bLLM\b/g, "Master of Laws");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bMSW\b/g, "Master of Social Work");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bPhD\b/g, "Doctor of Philosophy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bEdD\b/g, "Doctor of Education");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bJD\b/g, "Juris Doctor");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bMD\b/g, "Doctor of Medicine");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bND\b/g, "Doctor of Nursing");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bTOELF\b/g, "Test of English as a Foreign Language");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bIELTS\b/g, "International English Language Testing System");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\boz.\b/g, "Ounce");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bfl. oz.\b/g, "Fluid ounce");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bgal.\b/g, "Gallon");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bpt.\b/g, "Pint");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bqt.\b/g, "Quart");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\btbsp.\b/g, "Tablespoon");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\btsp. \b/g, "Teaspoon");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bin.\b/g, "Inch");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bft.\b/g, "Foot");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bmi.\b/g, "Mile");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bmph\b/g, "Miles per hour");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bn.m.\b/g, "Nautical miles");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bsq.\b/g, "Square");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\byd.\b/g, "Yard");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\blb.\b/g, "Pound");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bcm\b/g, "Centimeter");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bm\b/g, "Meter");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bkm\b/g, "Kilometer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bg\b/g, "Gram");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bkg\b/g, "Kilogram");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bT\b/g, "Ton");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bml\b/g, "Milliliter");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bl\b/g, "Liter");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\biktr\b/g, "I know that’s right");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bfomo\b/g, "Fear of missing out");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bikyl\b/g, "I know you’re lying");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bsmh\b/g, "Shaking my head");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\btbh\b/g, "To be honest");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\brofl\b/g, "Rolling on the floor laughing");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bxoxo\b/g, "Hugs and kisses");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bikr\b/g, "I know, right?");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bofc\b/g, "Of course");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\btfw\b/g, "The feel when");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\btfti\b/g, "Thanks for the invite");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bdl\b/g, "Down-low");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bfr\b/g, "For real");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bqt\b/g, "Cutie");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bngl\b/g, "Not gonna lie");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bobv\b/g, "Obviously");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bgrl\b/g, "Girl");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bOECD\b/g, "Organization for Economic Co-operation and Development");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bUNESCO\b/g, "The United Nations Educational, Scientific and Cultural Organization");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bEU\b/g, "European Union");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bFIFA\b/g, "International Federation of Football Association");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bNASA\b/g, "National Aeronautics and Space Administration");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bNATO\b/g, "North Atlantic Treaty Organization");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bUSMCA\b/g, "United States–Mexico–Canada Agreement");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bWHO\b/g, "World Health Organization");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bIRS\b/g, "Internal Revenue Service");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDMV\b/g, "Department of Motor Vehicles");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bJFK\b/g, "John F. Kennedy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bMLK\b/g, "Martin Luther King");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bUSAF\b/g, "United States Air Force");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bFBI\b/g, "Federal Bureau of Investigations");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bCIA\b/g, "Central Intelligence Agency");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bPOTUS\b/g, "President of the United States");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bSCOTUS\b/g, "Supreme Court of the United States");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bLA\b/g, "Los Angeles");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bNYC\b/g, "New York City");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bSF\b/g, "San Francisco");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bSLC\b/g, "Salt Lake City");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bMIA\b/g, "Miami");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDMV Area\b/g, "Delaware-Maryland-Virginia");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bThe Fed\b/g, "The Federal Reserve Bank");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBOFA\b/g, "Bank of America");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bASL\b/g, "American Sign Language");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bTSA\b/g, "Transportation Security Administration");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bFAA\b/g, "Federal Aviation Administration");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bUSDA\b/g, "United States Department of Agriculture");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDOD\b/g, "Department of Defense");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDHS\b/g, "Department of Homeland Security");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDOJ\b/g, "Department of Justice");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bUSPS\b/g, "United States Postal Service");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bFDA\b/g, "Food and Drug Administration");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bEPA\b/g, "Environmental protection Agency");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bCDC\b/g, "Centers for Disease Control and Prevention");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBBC\b/g, "British Broadcasting Corporation");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBA\b/g, "British Airways");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBoE\b/g, "Bank of England");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBR\b/g, "British Rail");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\binnit\b/g, "Isn’t it?");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bSammie\b/g, "Sandwich");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bA cuppa\b/g, "A cup of tea");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bSoz\b/g, "Sorry");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bManc\b/g, "Manchester");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bP’s\b/g, "Pounds (£)");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bChrissie\b/g, "Christmas");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBrekky\b/g, "Breakfast");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bAvo\b/g, "Avocado");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bServo\b/g, "Gas station");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bMaccas\b/g, "McDonald’s");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBevos\b/g, "Beverages");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bSanga\b/g, "Sandwich");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bAggro\b/g, "Aggressive");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBarbie\b/g, "Barbecue");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bCab Sav\b/g, "Cabernet Sauvignon");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDevo\b/g, "Devastated");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bMushie\b/g, "Mushroom");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bAmbo\b/g, "Ambulance");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDOB\b/g, "Date of birth");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bTBA\b/g, "To be announced");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bTBD\b/g, "To be determined");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bTBC\b/g, "To be continued");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bVAT\b/g, "Value-added Tax");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDOA\b/g, "Dead on arrival");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bGMO\b/g, "Genetically modified organisms");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bMIA\b/g, "Missing in action");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bOCD\b/g, "Obsessive Compulsive Disorder");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBOGO\b/g, "Buy one, get one");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bICYMI\b/g, "In case you missed it");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bFWIW\b/g, "For what it’s worth");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bASAP\b/g, "As soon as possible");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bRSVP\b/g, "Répondez s’il vous plaît");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bFAQs\b/g, "Frequently asked questions");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bTGIF\b/g, "Thank god it’s Friday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bIMO\b/g, "In my opinion");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bIMHO\b/g, "In my humble opinion");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDIY\b/g, "Do-it-yourself");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bFIY\b/g, "For your information");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bAKA\b/g, "Also known as");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bFKA\b/g, "Formerly known as");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBYOB\b/g, "Bring your own beverage");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBO\b/g, "Body odor");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bETA\b/g, "Estimated time of arrival");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bLGBTQ\b/g, "Lesbian, gay, bisexual, trans and queer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bQ&A\b/g, "Questions and answers");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bID\b/g, "Identification");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bRIP\b/g, "Rest in peace");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bVIP\b/g, "Very important person");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bATM\b/g, "Automatic teller machine");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bi.e.\b/g, "In other words");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bi.g.\b/g, "For example");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bPIN\b/g, "Personal identification number");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bSOS\b/g, "Save our ship (help)");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bSO\b/g, "Significant other");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bTMI\b/g, "Too much information");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bPOV\b/g, "Point of view");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bHBD\b/g, "Happy birthday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\blol\b/g, "Laugh out loud");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\blmk\b/g, "Let me know");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bnvm\b/g, "Nevermind");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bomw\b/g, "On my way");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bidk\b/g, "I don’t know");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bthx\b/g, "Thanks");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bty\b/g, "Thank you");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bbrb\b/g, "Be right back");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bbtw\b/g, "By the way");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bomg\b/g, "Oh my god");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\blmao\b/g, "Laughing my ass off");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bwtf\b/g, "What the ****");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bwth\b/g, "What the hell");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\biykyk\b/g, "If you know, you know");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bsthu\b/g, "Shut the hell up");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\byolo\b/g, "You only live once");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bTL;DR\b/g, "Too long, didn’t read");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\b2day\b/g, "Today");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\b2moro\b/g, "Tomorrow");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\batm\b/g, "At the moment");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bb4\b/g, "Before");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bl8r\b/g, "Later");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bcu\b/g, "See you");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bcya\b/g, "See ya");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bgr8\b/g, "Great");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bily\b/g, "I love you");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bily2\b/g, "I love you too");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bpls\b/g, "Please");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\br u srs\b/g, "Are you serious?");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\by\b/g, "Why?");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bttyl\b/g, "Talk to you later");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bbc\b/g, "Because");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDM\b/g, "Direct message");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bftw\b/g, "For the win");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\biirc\b/g, "If I remember correctly");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bjk\b/g, "Just kidding");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bnbd\b/g, "No big deal");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\brn\b/g, "Right now");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDAE\b/g, "Does anyone else?");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bhmu\b/g, "Hit me up");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bwyd\b/g, "What (are) you doing?");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bidc\b/g, "I don’t care");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bh8\b/g, "Hate");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bCC\b/g, "Carbon copy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBCC\b/g, "Blind carbon copy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bFTE\b/g, "Full-time employment");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bEOD\b/g, "End-of-day");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bRE\b/g, "Regarding");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bP.S.\b/g, "Post script");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bPTO\b/g, "Paid time off");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bNB\b/g, "Nota Bene");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bOOO\b/g, "Out of office");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bOT\b/g, "Overtime");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bP&C\b/g, "Private & confidential");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bSMART\b/g, "Specific, measurable, attainable, realistic, time-bound");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bTIA\b/g, "Thanks in advance");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bWFH\b/g, "Work from home");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bCE\b/g, "Common Era");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBCE\b/g, "Before Common Era");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bETA\b/g, "Estimated time of arrival");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\ba. m.\b/g, "Ante meridiem");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bp. m.\b/g, "Post meridiem");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bh\b/g, "Hour");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bmin\b/g, "Minute");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bs\b/g, "Seconds");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bN\b/g, "North");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bS\b/g, "South");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bE\b/g, "East");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bW\b/g, "West");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bNW\b/g, "Northwest");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bNE\b/g, "Northeast");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bSW\b/g, "Southwest");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bSE\b/g, "Southeast");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bM\b/g, "Monday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bT\b/g, "Tuesday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bW\b/g, "Wednesday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bTh\b/g, "Thursday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bF\b/g, "Friday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bS\b/g, "Saturday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bSu\b/g, "Sunday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bAcct\b/g, "Accountant");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bAsst\b/g, "Assistant");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bPA\b/g, "Personal assistant");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bVA\b/g, "Virtual assistant");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bCapt\b/g, "Captain");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDir\b/g, "Director");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bExec\b/g, "Executive");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bCEO\b/g, "Chief Executive Officer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bCOO\b/g, "Chief Operation Officer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bCFO\b/g, "Chief Financial Officer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bCMO\b/g, "Chief Marketing Officer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bVP\b/g, "Vice president");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bPM\b/g, "Project manager");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bUX Designer\b/g, "User interface designer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bUI Designer\b/g, "User experience designer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bCPA\b/g, "Certified Public Accountant");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bCFA\b/g, "Chartered Financial Analyst");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bQA Analyst\b/g, "Quality Assurance Analyst");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bRN\b/g, "Registered Nurse");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bProf\b/g, "Professor");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bEFL\b/g, "English as a foreign language");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bELT\b/g, "English language teaching");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bESL\b/g, "English as a second language");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBA\b/g, "Bachelor of Arts");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBS\b/g, "Bachelor of Science");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBFA\b/g, "Bachelor of Fine Arts");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bMA\b/g, "Master of Arts");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bMS\b/g, "Master of Science");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bMBA\b/g, "Master of Business Administration");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bMPhil\b/g, "Master of Philosophy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bMFA\b/g, "Master of Fine Arts");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bLLM\b/g, "Master of Laws");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bMSW\b/g, "Master of Social Work");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bPhD\b/g, "Doctor of Philosophy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bEdD\b/g, "Doctor of Education");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bJD\b/g, "Juris Doctor");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bMD\b/g, "Doctor of Medicine");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bND\b/g, "Doctor of Nursing");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bTOELF\b/g, "Test of English as a Foreign Language");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bIELTS\b/g, "International English Language Testing System");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\boz.\b/g, "Ounce");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bfl. oz.\b/g, "Fluid ounce");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bgal.\b/g, "Gallon");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bpt.\b/g, "Pint");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bqt.\b/g, "Quart");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\btbsp.\b/g, "Tablespoon");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\btsp. \b/g, "Teaspoon");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bin.\b/g, "Inch");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bft.\b/g, "Foot");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bmi.\b/g, "Mile");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bmph\b/g, "Miles per hour");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bn.m.\b/g, "Nautical miles");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bsq.\b/g, "Square");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\byd.\b/g, "Yard");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\blb.\b/g, "Pound");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bcm\b/g, "Centimeter");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bm\b/g, "Meter");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bkm\b/g, "Kilometer");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bg\b/g, "Gram");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bkg\b/g, "Kilogram");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bT\b/g, "Ton");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bml\b/g, "Milliliter");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bl\b/g, "Liter");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\biktr\b/g, "I know that’s right");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bfomo\b/g, "Fear of missing out");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bikyl\b/g, "I know you’re lying");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bsmh\b/g, "Shaking my head");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\btbh\b/g, "To be honest");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\brofl\b/g, "Rolling on the floor laughing");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bxoxo\b/g, "Hugs and kisses");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bikr\b/g, "I know, right?");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bofc\b/g, "Of course");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\btfw\b/g, "The feel when");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\btfti\b/g, "Thanks for the invite");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bdl\b/g, "Down-low");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bfr\b/g, "For real");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bqt\b/g, "Cutie");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bngl\b/g, "Not gonna lie");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bobv\b/g, "Obviously");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bgrl\b/g, "Girl");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bOECD\b/g, "Organization for Economic Co-operation and Development");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bUNESCO\b/g, "The United Nations Educational, Scientific and Cultural Organization");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bEU\b/g, "European Union");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bFIFA\b/g, "International Federation of Football Association");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bNASA\b/g, "National Aeronautics and Space Administration");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bNATO\b/g, "North Atlantic Treaty Organization");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bUSMCA\b/g, "United States–Mexico–Canada Agreement");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bWHO\b/g, "World Health Organization");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bIRS\b/g, "Internal Revenue Service");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDMV\b/g, "Department of Motor Vehicles");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bJFK\b/g, "John F. Kennedy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bMLK\b/g, "Martin Luther King");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bUSAF\b/g, "United States Air Force");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bFBI\b/g, "Federal Bureau of Investigations");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bCIA\b/g, "Central Intelligence Agency");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bPOTUS\b/g, "President of the United States");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bSCOTUS\b/g, "Supreme Court of the United States");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bLA\b/g, "Los Angeles");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bNYC\b/g, "New York City");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bSF\b/g, "San Francisco");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bSLC\b/g, "Salt Lake City");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bMIA\b/g, "Miami");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDMV Area\b/g, "Delaware-Maryland-Virginia");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bThe Fed\b/g, "The Federal Reserve Bank");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBOFA\b/g, "Bank of America");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bASL\b/g, "American Sign Language");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bTSA\b/g, "Transportation Security Administration");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bFAA\b/g, "Federal Aviation Administration");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bUSDA\b/g, "United States Department of Agriculture");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDOD\b/g, "Department of Defense");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDHS\b/g, "Department of Homeland Security");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDOJ\b/g, "Department of Justice");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bUSPS\b/g, "United States Postal Service");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bFDA\b/g, "Food and Drug Administration");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bEPA\b/g, "Environmental protection Agency");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bCDC\b/g, "Centers for Disease Control and Prevention");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBBC\b/g, "British Broadcasting Corporation");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBA\b/g, "British Airways");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBoE\b/g, "Bank of England");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBR\b/g, "British Rail");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\binnit\b/g, "Isn’t it?");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bSammie\b/g, "Sandwich");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bA cuppa\b/g, "A cup of tea");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bSoz\b/g, "Sorry");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bManc\b/g, "Manchester");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bP’s\b/g, "Pounds (£)");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bChrissie\b/g, "Christmas");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBrekky\b/g, "Breakfast");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bAvo\b/g, "Avocado");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bServo\b/g, "Gas station");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bMaccas\b/g, "McDonald’s");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBevos\b/g, "Beverages");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bSanga\b/g, "Sandwich");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bAggro\b/g, "Aggressive");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBarbie\b/g, "Barbecue");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bCab Sav\b/g, "Cabernet Sauvignon");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDevo\b/g, "Devastated");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bMushie\b/g, "Mushroom");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bAmbo\b/g, "Ambulance");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDOB\b/g, "Date of birth");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bTBA\b/g, "To be announced");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bTBD\b/g, "To be determined");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bTBC\b/g, "To be continued");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bVAT\b/g, "Value-added Tax");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDOA\b/g, "Dead on arrival");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bGMO\b/g, "Genetically modified organisms");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bMIA\b/g, "Missing in action");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bOCD\b/g, "Obsessive Compulsive Disorder");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBOGO\b/g, "Buy one, get one");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bICYMI\b/g, "In case you missed it");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bFWIW\b/g, "For what it’s worth");
            
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBYOB\b/g, "bring your own bottle");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDOA\b/g, "dead on arrival");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDOB\b/g, "date of birth");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bAKA\b/g, "also known as");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bASAP\b/g, "as soon as possible");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bAWOL\b/g, "absent without leave");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBO\b/g, "body odour");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBRB\b/g, "be right back");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBTW\b/g, "by the way");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bDIY\b/g, "do-it-yourself");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bEFL\b/g, "English as a Second Language");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bELT\b/g, "English as a Second Language");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bESL\b/g, "English as a Second Language");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBA\b/g, "Bachelor of Arts");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bMA\b/g, "Master of Arts");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBSC\b/g, "Bachelor of Science");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bMSC\b/g, "Master of Science");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bPhD\b/g, "Doctor of Philosophy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bCC\b/g, "blind carbon copy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBCC\b/g, "blind carbon copy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bETA\b/g, "estimated time of arrival");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bFAQ\b/g, "frequently asked questions");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bFYI\b/g, "for your information");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bIMO\b/g, "in my opinion");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bLGBT\b/g, "lesbian gay bisexual transgender");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bQ\b/g, "question");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bBLT\b/g, "bacon");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bEDM\b/g, "electronic dance music");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bLOL\b/g, "laugh out loud");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bNEET\b/g, "not in education, employment or training");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bOMG!\b/g, "Oh my god!");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bP.S.\b/g, "post scriptum");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bPTO\b/g, "please turn over");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bRIP\b/g, "requiescat in pace");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bRSVP\b/g, "répondez s’il vous plait");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bTBA\b/g, "to be announced");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\b VIP\b/g, "very important person");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bTGIF\b/g, "thank god it’s Friday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bYOLO\b/g, "you only live once");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/(\.\s*)\bTL;DR\b/g, "too long; didn’t read");

            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBYOB\b/g, "bring your own bottle");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDOA\b/g, "dead on arrival");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDOB\b/g, "date of birth");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bAKA\b/g, "also known as");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bASAP\b/g, "as soon as possible");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bAWOL\b/g, "absent without leave");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBO\b/g, "body odour");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBRB\b/g, "be right back");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBTW\b/g, "by the way");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bDIY\b/g, "do-it-yourself");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bEFL\b/g, "English as a Second Language");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bELT\b/g, "English as a Second Language");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bESL\b/g, "English as a Second Language");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBA\b/g, "Bachelor of Arts");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bMA\b/g, "Master of Arts");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBSC\b/g, "Bachelor of Science");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bMSC\b/g, "Master of Science");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bPhD\b/g, "Doctor of Philosophy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bCC\b/g, "blind carbon copy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBCC\b/g, "blind carbon copy");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bETA\b/g, "estimated time of arrival");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bFAQ\b/g, "frequently asked questions");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bFYI\b/g, "for your information");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bIMO\b/g, "in my opinion");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bLGBT\b/g, "lesbian gay bisexual transgender");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bQ\b/g, "question");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBLT\b/g, "bacon");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bEDM\b/g, "electronic dance music");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bLOL\b/g, "laugh out loud");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bNEET\b/g, "not in education, employment or training");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bOMG!\b/g, "Oh my god!");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bP.S.\b/g, "post scriptum");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bPTO\b/g, "please turn over");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bRIP\b/g, "requiescat in pace");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bRSVP\b/g, "répondez s’il vous plait");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bTBA\b/g, "to be announced");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\b VIP\b/g, "very important person");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bTGIF\b/g, "thank god it’s Friday");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bYOLO\b/g, "you only live once");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bTL;DR\b/g, "too long; didn’t read");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBJP\b/g, "Bharatiya Janata Party");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bBJP\b/g, "Bharatiya Janata Party");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bRFA\b/g, "Radio Free Asia");
            enNeedtotb[i] = enNeedtotb[i].replaceAll(/\bVOA\b/g, "Voice of America");
            // Radio Free Asia
            enNeedtotb[i] = convertToLowerCaseIfAllUppercase(enNeedtotb[i]);

            

            enNeedtotb[i] = enNeedtotb[i].replaceAll(
              "CTA ",
              "Central Tibetan Administration "
            );
            enNeedtotb[i] = enNeedtotb[i].replaceAll(
              "SARD ",
              "Social Development Fund "
            );
            enNeedtotb[i] = enNeedtotb[i].replaceAll(
              "TCRC ",
              "Tibetan Computer Resource Centre "
            );
            enNeedtotb[i] = enNeedtotb[i].replaceAll(
              "TPI ",
              "Tibet Policy Institute "
            );

            //TPI

            let e = 0;
            console.log("Arry No:" + i + " " + enNeedtotb[i]);

            $.ajax({
              url: "https://dharmamitra.org/api/translation/",
              type: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              data: JSON.stringify({
                input_sentence: enNeedtotb[i],
                level_of_explanation: 0,
                language: lang1 + "-" + lang2,

                model: "NO",
              }),
              success: function (response) {
                // Handle the response here
                var combinedData = response;
                var newText = combinedData.replace(/^.*\n/g, "");
                if (combinedData != null) {
                  //console.log("Response No: " + i + " " + combinedData);
                  fanaltext = "---Response No: " + i + " " + combinedData;
                  enTbfanaltext.push(fanaltext);
                  enTbfanaltext.sort();

                  result = enTbfanaltext.join("");

                  //
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
                  
                  //༄༅། ། 
                  result = result.replaceAll(
                    "སྐེ་རགས་དང་རྒྱ་ལམ",
                    "རྒྱུད་གཅིག་ལམ་གཅིག"
                  );
                  result = result.replaceAll(
                    "སྐེ་རགས་དང་རྒྱ་ལམ་གྱི",
                    "རྒྱུད་གཅིག་ལམ་གཅིག་གི"
                  );
                  result = result.replaceAll(
                    "Beltདང་ལམ་གྱི",
                    "རྒྱུད་གཅིག་ལམ་གཅིག་གི"
                  );

                  //Beltདང་ལམ་གྱི
                  //སྐེ་རགས་དང་རྒྱ་ལམ་གྱི་འཆར་གཞི
                  result = result.replaceAll(
                    "སེན་ཧ་རན་སེ་སི་ཁོ",
                    "སན་ཧྥན་སི་སུ་ཁོ"
                  );
                  result = result.replaceAll(
                    "མིན་པར་སྤྲོད་བྱས",
                    "མིན་པ་ར་སྤྲོད་བྱས"
                  );

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
                  result = result.replaceAll(
                    "རྒྱུད་གཅིག་ལམ་གཅིག་གྱི",
                    "རྒྱུད་གཅིག་ལམ་གཅིག་གི"
                  );
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
                  result = result.replaceAll(
                    "བསོད་ནམས་སི་ཆོས",
                    "བསོད་ནམས་སྲིད་གཅོད་"
                  );
                  result = result.replaceAll(
                    "གོང་མ་སྲོང་བཙན་སྒམ་པོ",
                    "བཙན་པོ་སྲོང་བཙན་སྒམ་པོ་"
                  );
                  result = result.replaceAll("དམངས་གཙོ", "མང་གཙོ");
                  result = result.replaceAll(
                    "སྨོན་ལམ་རིག་རྩལ་ཞིབ་འཇུག་ལྟེ་གནས",
                    "སྨོན་ལམ་བརྡ་འཕྲིན་ཞིབ་འཇུག་ཁང་"
                  );
                  result = result.replaceAll(
                    "སྨོན་ལམ་གྱི་ཨར",
                    "སྨོན་ལམ་རིག་ནུས"
                  );
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
                  
                  result = result.replaceAll(
                    "སྨོན་ལམ་གྱི་རིག་རྩལ",
                    "སྨོན་ལམ་རིག་ནུས"
                  );
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
                  result = result.replaceAll(
                    "སྐེད་རགས་དང་ལམ",
                    "རྒྱུད་གཅིག་ལམ་གཅིག"
                  );
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
                  result = result.replaceAll(
                    "སྲིད་འཛིན་ཤིའི་ཅིན་ཕིན་",
                    "སྲིད་འཛིན་ཞི་ཅིན་ཕིན"
                  );
                  result = result.replaceAll(
                    "སྐེ་རགས་དང་ལམ",
                    "རྒྱུད་གཅིག་ལམ་གཅིག"
                  );
                  result = result.replaceAll(
                    "ལམ་ཐིག་དང་སྐེ་རགས",
                    "རྒྱུད་གཅིག་ལམ་གཅིག"
                  );
                  result = result.replaceAll(
                    "བཅོས་མའི་རིག་རྩལ",
                    "མིས་བཟོས་རིག་ནུས"
                  );
                  result = result.replaceAll(
                    "སི་ཨེ་ཧི་ཊི་སི",
                    "སི་ཨེ་ཧྥི་ཊི་སི"
                  );
                  result = result.replaceAll(
                    "མཚོ་དམག་དར་གོས་ཀྱི་ལམ",
                    "མཚོ་རྒྱུད་དར་ལམ"
                  );
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
                  result = result.replaceAll(
                    "ཤིན་ཏཱ་ཞིང་ཆེན",
                    "ཧྲན་ཏུང་ཞིང་ཆེན་"
                  );
                  result = result.replaceAll(
                    "བཟོ་ལས་རིག་པས་མིའི་འཕྲུལ་ཆས་ཀྱི",
                    "མིས་བཟོས་རིག་ནུས་འཕྲུལ་རིག་གི"
                  );
                  result = result.replaceAll(
                    "རྒྱ་གྲམ་དམར་པོའི་སྲིད་འཛིན་གྱིས",
                    "རྒྱ་གྲམ་དམར་པོའི་ཚོགས་གཙོས"
                  );
                  result = result.replaceAll(
                    "བསམ་བློའི་དཔྱད་ཞིབ་ཁང་",
                    "བློ་འདོན་ཁང་"
                  );
                  result = result.replaceAll(
                    "བསམ་བློའི་ཚོགས་ཆུང་གིས",
                    "བློ་འདོན་ཁང་གིས"
                  );
                  result = result.replaceAll(
                    "བསམ་བློའི་ཚོགས་ཆུང་གི",
                    "བློ་འདོན་ཁང་གི"
                  );
                  result = result.replaceAll(
                    "བསམ་བློ་གཏོང་མཁན་གྱི་ཚོགས་པ་དེས",
                    "བློ་འདོན་ཁང་གིས"
                  );
                  result = result.replaceAll(
                    "བསམ་བློ་གཏོང་མཁན་གྱི་ཚོགས་པ་དེ",
                    "བློ་འདོན་ཁང་གི"
                  );
                  result = result.replaceAll("དར་གོས་ཀྱི་ལམ", "དར་གོས་ཚོང་ལམ");
                  result = result.replaceAll(
                    "ཌུན་ཧོང་གི་ཞབས་བྲོ",
                    "ཏུན་ཧོང་གི་ཞབས་བྲོ"
                  );
                  result = result.replaceAll(
                    "ཌུན་ཧོང་གི་སྒྱུ་རྩལ",
                    "ཏུན་ཧོག་གི་སྒྱུ་རྩལ"
                  );
                  result = result.replaceAll("དར་གོས་ཀྱི", "དར་གོས་ཚོང་ལམ");
                  result = result.replaceAll("ཌུན་ཧོང་", "ཏུན་ཧོང་");
                  result = result.replaceAll(
                    "ཧུ་ཀྲན་ཞིང་ཆེན་",
                    "ཧྥུའུ་ཅན་ཞིང་ཆེན་"
                  );
                  result = result.replaceAll("ཤིའི་ཅིན་ཕིན", "ཞི་ཅིན་ཕིན");
                  result = result.replaceAll("ཤཱི་ཡིས་", "ཞི་ཡིས་");
                  result = result.replaceAll("ཤཱི་ཡི་", "ཞི་ཡི་");
                  result = result.replaceAll("ཤཱི་ལ་", "ཞི་ལ་");
                  result = result.replaceAll("ཞིན་ཧྭ་", "ཤིན་ཧྭ་");
                  result = result.replaceAll(
                    "མེ་འོན་གཙུག་ལག་སློབ་གྲྭ་ཆེན་མོའི་སློབ་གྲྭའི",
                    "མེས་དབོན་གཙུག་ལག་དཔེ་སྟོན་སློབ་གྲྭའི"
                  );
                  result = result.replaceAll(
                    "སོགས་ཀྱིས་རྐྱེན་པས",
                    "སོགས་ཀྱི་རྐྱེན་པས"
                  );
                  result = result.replaceAll(
                    "ཀུན་མཆོག་མིག་དམར",
                    "དཀོན་མཆོག་མིག་དམར"
                  );
                  result = result.replaceAll(
                    "སྨད་གཡོག་དཔེ་སྟོན་སློབ་གྲྭ",
                    "མེས་དབོན་གཙུག་ལག་དཔེ་སྟོན་སློབ་གྲྭ"
                  );
                  result = result.replaceAll(
                    "ཤེས་རབ་དགའ་ཚལ་བློ་བཟང་གླིང་",
                    "ཤེས་རབ་དགའ་ཚལ་སློབ་གླིང་"
                  );
                  result = result.replaceAll(
                    "སྐྱིད་སྐྱོང་གིས",
                    "སྲིད་སྐྱོང་གིས"
                  );
                  result = result.replaceAll(
                    "རྙིང་སྟོབས་གླིང་",
                    "སྙིང་སྟོབས་གླིང་"
                  );
                  result = result.replaceAll("རྡ་རམ་ས་ལ", "དྷ་རམ་ས་ལ");
                  result = result.replaceAll(
                    "རྗེ་རིན་པོ་ཆེར་བསྟོད་པ་མིག་ཏིག་མ",
                    "རྗེ་རིན་པོ་ཆེའི་བསྟོད་པ་དམིགས་བརྩེ་མ"
                  );
                  result = result.replaceAll("ཁག་གཅིག་གིས", "ཁག་ཅིག་གིས");
                  result = result.replaceAll("ཁག་གཅིག་གི", "ཁག་ཅིག་གི");
                  result = result.replaceAll(
                    "ལྷོ་ཤར་ཨེ་ཤི་ཡ",
                    "ལྷོ་ཤར་ཨེ་ཤེ་ཡ"
                  );
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
                  result = result.replaceAll(
                    "ཨོ་སི་ི་རི་ལི་ཡ",
                    "ཨོ་སི་ཊོ་ལི་ཡ"
                  );
                  result = result.replaceAll("གོ་ལ་གསར་ཤོག", "གོ་ལའི་དུས་བབ");
                  result = result.replaceAll("མང་གཙོའི་ཏང", "མང་གཙོ་ཚོགས་པ");
                  result = result.replaceAll("ཤིན་ཧྭ", "ཞིན་ཧྭ");
                  result = result.replaceAll(
                    "གསར་ཤོག་གོ་ལ་དུས་བབ",
                    "གོ་ལའི་དུས་བབ་གསར་ཤོག"
                  );
                  result = result.replaceAll(
                    "ཧིན་དྷུ་ཉེ་ཤི་ཡ",
                    "ཨིན་ཌོ་ནེ་ཤི་ཡ"
                  );
                  result = result.replaceAll(
                    "སྐེ་རགས་དང་ལམ་བཟོའི་ལས་གཞི",
                    "རྒྱུད་གཅིག་ལམ་གཅིག་གི་ལས་གཞི"
                  );
                  result = result.replaceAll("ཝེ་ཌོ་ཌོ", "ཇོ་ཀོ་ཝི་ཌོ་ཌོ");
                  result = result.replaceAll("ཡུ་ཁི་རན", "ཡུག་ཁི་རན");
                  result = result.replaceAll("སིང་ག་པོར", "སིང་ག་པུར");
                  result = result.replaceAll(
                    "བཅོས་མའི་རིག་རྩལ",
                    "མིས་བཟོས་རིག་ནུས"
                  );
                  result = result.replaceAll(
                    "སྐེད་རགས་དང་ལམ་གྱི་ལས་འཆར",
                    "རྒྱུད་གཅིག་ལམ་གཅིག་གི་ལས་འཆར"
                  );
                  result = result.replaceAll("ཨེ་ཤི་ཡ", "ཨེ་ཤེ་ཡ");
                  result = result.replaceAll("གནས་བབས", "གནས་བབ");
                  result = result.replaceAll("ཧོན་ཀོང་", "ཧོང་ཀོང་");
                  result = result.replaceAll(
                    "རྒྱ་ནག་སྐམ་ས་ཆེན་པོ",
                    "རྒྱ་ནག་སྐམ་ས་ཆེན་མོ"
                  );
                  result = result.replaceAll("ཧང་སྒོར", "ཧོང་སྒོར");
                  result = result.replaceAll(
                    "བཅོས་མའི་རིག་ནུས",
                    "མིས་བཟོས་རིག་ནུས"
                  );
                  result = result.replaceAll(
                    "ཨ་ཕོན་བེད་སྤྱོད་བྱེད་མཚམས་འཇོག",
                    "ཀུ་ཤུ་ཁ་པར་བེད་སྤྱོད་བྱེད་མཚམས་འཇོག"
                  );
                  result = result.replaceAll(
                    "རྒྱ་ནག་གི་ཧུའུ་ཝེ",
                    "རྒྱ་ནག་གི་ཧྭ་ཝེ"
                  );
                  result = result.replaceAll("ཧོ་ཝེ", "ཧྭ་ཝེ");
                  result = result.replaceAll("ཝ་ཞིན་ཊོན", "ཝ་ཤིན་ཊོན");
                  result = result.replaceAll("ཧཱ་ཝེ་བཟོ་ལས", "ཧྭ་ཝེ་བཟོ་ལས");
                  result = result.replaceAll("ཧུའུ་ཝེ", "ཧྭ་ཝེ");
                  result = result.replaceAll("ཀུ་ཤུ་ཡི་ཁ་པར", "ཀུ་ཤུ་ཁ་པར");
                  result = result.replaceAll(
                    "ཧོ་ཝེ་དང་འབྲེལ་ཡོད",
                    "ཧྭ་ཝེ་དང་འབྲེལ་ཡོད"
                  );
                  result = result.replaceAll("ཧའོ་ཝེ", "ཧྭ་ཝེ");
                  result = result.replaceAll("ཕུ་ཁུ་ཤི་མ", "ཧྥུ་ཀུ་ཤི་མ");
                  result = result.replaceAll("ཧུ་ཁུ་ཤི་མ", "ཧྥུ་ཀུ་ཤི་མ");
                  result = result.replaceAll("ཧུའུ་ཁུ་ཤི་མ", "ཧྥུ་ཀུ་ཤི་མ");
                  result = result.replaceAll(
                    "ཉེན་རྟོག་ལས་ཁུངས་ཀྱི་ཀྲུའུ་རེན",
                    "ཉེན་རྟོག་ལས་ཁུངས་ཀྱི་འགན་འཛིན"
                  );
                  result = result.replaceAll(
                    "རྒྱལ་སྲུང་པུའུ",
                    "རྒྱལ་སྲུང་ལྷན་ཁང་"
                  );
                  result = result.replaceAll(
                    "དགའ་བསུ་ཞུ་གི་ཡོད་",
                    "དགའ་བསུ་ཞུ་ཡི་ཡོད་"
                  );
                  result = result.replaceAll("ཧུའུ་ཝེ་བཟོ་ལས", "ཧྭ་ཝེ་བཟོ་ལས");
                  result = result.replaceAll("ཧི་ལི་ཕིན", "ཧྥི་ལི་པིན");
                  result = result.replaceAll("མ་ལེ་ཤི་ཡ", "མ་ལེ་ཞི་ཡ");
                  result = result.replaceAll("མ་ལེ་ཤི་ཡས", "མ་ལེ་ཞི་ཡས");
                  result = result.replaceAll(" སིང་གྷ་ཕོ", "སིངྒ་པུར");
                  result = result.replaceAll(
                    "ཧིན་དྷུ་ཉེ་ཤི་ཡ",
                    "ཧིན་དྷུ་ཉི་ཞི་ཡ"
                  );
                  result = result.replaceAll(
                    "མཉམ་སྦྲེལ་རྒྱལ་ཚོགས",
                    "མཉམ་འབྲེལ་རྒྱལ་ཚོགས"
                  );
                  result = result.replaceAll(" ཐེ་ལན", " ཐའེ་ལན");
                  result = result.replaceAll(
                    " ཨོ་སི་ཊོ་ལི་ཡ",
                    " ཨོ་སི་ཁྲུ་ལི་ཡ"
                  );
                  result = result.replaceAll("ཁམ་བྷོ་ཌི་ཡ", "ཀམ་བྷོ་ཌི་ཡ");
                  result = result.replaceAll("ལོ་སི", "ལའོ་སི");
                  result = result.replaceAll("མེན་མར", "འབར་མ");
                  result = result.replaceAll(
                    "ཨ་རིའི་སྲིད་འཛིན་ཇོའེ་བའེ་ཌེན",
                    "ཨ་རིའི་སྲིད་འཛིན་རྗོ་བྷེ་ཌེན"
                  );
                  result = result.replaceAll(
                    "ཀོ་རོ་ན་ཝའི་ནད་ཡམས",
                    "ཀོ་རོ་ནའི་ནད་ཡམས"
                  );
                  result = result.replaceAll("ཤིའི་ཅིན་ཕིང", "ཞིས་ཅིན་ཕིང");

                  result = result.replaceAll(
                    "གྲོང་ཁྱེར་པུ་རག",
                    "གྲོང་ཁྱེར་པ་རག"
                  );
                  result = result.replaceAll(
                    "པུ་རག་རྒྱལ་སྤྱིའི་ཚོགས་འདུ",
                    "པ་རག་རྒྱལ་སྤྱིའི་ཚོགས་འདུ"
                  );

                  result = result.replaceAll("ཨོ་སི་ཊོ་ལི་ཡ", "ཨོ་སི་ཊི་ལི་ཡ");
                  result = result.replaceAll("ཨོ་སི་ཁྲུ་ལི་ཡ", "ཨོ་སི་ཊི་ལི་ཡ");
                  result = result.replaceAll("མི་དམངས", "མི་མང་");
                  result = result.replaceAll(
                    "རྒྱ་ནག་དམར་ཕྱོགས",
                    "རྒྱ་ནག་དམར་ཤོག"
                  );
                  result = result.replaceAll(
                    "རྒྱ་གྲམ་དམར་པོའི་སྲིད་འཛིན",
                    "རྒྱ་གྲམ་དམར་པོའི་ཚོགས་གཙོ"
                  );
                  result = result.replaceAll(
                    "སྲིད་འཛིན་ཤིའི་ཅིན་ཕིན",
                    "སྲིད་འཛིན་ཞི་ཅིན་ཕིན"
                  );
                  result = result.replaceAll("ཤཱི་ཡིས་བཤད", "ཞི་ཡིས་བཤད");
                  result = result.replaceAll("ཤཱི་ཡིས", "ཞི་ཡིས");
                  result = result.replaceAll(
                    "མེལ་ཝིན་གོལ་ཌ་སི་ཊེན",
                    "མེལ་ཝིན་སི་གྷོལྜ་སི་ཊེན"
                  );
                  result = result.replaceAll("ཟི་དགའ་ཟེ", "གཞིས་ཀ་རྩེ");
                  result = result.replaceAll(
                    "རི་བོ་རྩེ་ལྔའི་དམག་སྒར",
                    "ཇོ་མོ་གླང་མའི་སྒར་ས"
                  );
                  result = result.replaceAll("ཤིན་ཅང་", "ཤར་ཏུར་ཀི་སི་ཐན");
                  result = result.replaceAll("ཉན་ཚང་", "ནན་ཁྲང་");
                  result = result.replaceAll("ནན་ཅང་", "ནན་ཁྲང་");
                  result = result.replaceAll("ཨེ་ཤི་ཡ", "ཨེ་ཤ་ཡ");
                  result = result.replaceAll("ཀྲི་ཅ་ཀྲང་", "ཧྲི་ཅ་ཀྲང་");
                  result = result.replaceAll("ཤིས་ཅ་ཀྲང་", "ཧྲི་ཅ་ཀྲང་");
                  result = result.replaceAll("ཧེ་བེ་ཞིང་ཆེན", "ཧེ་པེ་ཞིང་ཆེན");
                  result = result.replaceAll(
                    "༦ཤིན་ཧ།",
                    "ཕྱི་ཟླ་དགུ་པའི་ཚེས་དྲུག ཤིན་ཧྭ།"
                  );
                  result = result.replaceAll("ཨེ་ཤི་ཡ", "ཨེ་ཤ་ཡ");
                  result = result.replaceAll(
                    "ཨོ་སི་ཊོ་ལི་ཡས",
                    "ཨོ་སི་ཀྲོ་ལི་ཡས"
                  );
                  result = result.replaceAll(
                    "ཨོ་སི་ཊོ་ལི་ཡའི",
                    "ཨོ་སི་ཀྲོ་ལི་ཡའི"
                  );
                  result = result.replaceAll("པྲི་མུའུ་ལ", "པི་རི་མུའུ་ལ");
                  result = result.replaceAll("པི་རི་མུ་ལ", "པི་རི་མུའུ་ལ");
                  result = result.replaceAll("ཕི་རི་མུ་ལ", "པི་རི་མུའུ་ལ");
                  result = result.replaceAll("པྲ་མོ་ལ", "པི་རི་མུའུ་ལ");
                  result = result.replaceAll("ཟི་ནུའུ།", "ཤིན་ཧྭ།");
                  result = result.replaceAll("ལན་ཀྲོའུ་", "ལན་ཀྲུའུ་");
                  result = result.replaceAll(
                    "ཧེ་ཅང་ཞིང་ཆེན་",
                    "ཧེ་ལུང་ཅང་ཞིང་ཆེན་"
                  );
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
                  result = result.replaceAll(
                    "ཀྲུའུ་ཞི་མའོ་ཙེ་ཏུང་",
                    "ཚོགས་གཙོ་མའོ་ཙེ་ཏུང་"
                  );
                  result = result.replaceAll(
                    "རྒྱ་ནག་གུང་ཁྲན་ཚོགས་པ",
                    "རྒྱ་ནག་དམར་ཤོག་ཚོགས་པ"
                  );
                  result = result.replaceAll(
                    "རྒྱ་ནག་མི་མང་",
                    "རྒྱ་ནག་མི་དམངས་"
                  );
                  result = result.replaceAll(
                    "འཐུས་མི་གསུམ་གྱི་ལྟ་བ།",
                    "མཚོན་བྱེད་གསུམ།"
                  );
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
                  result = result.replaceAll(
                    "ཚན་རིག་ཚན་རྩལ་",
                    "ཚན་རིག་ལག་རྩལ་"
                  );
                  result = result.replaceAll("མི་མང་ཀྱིས་", "མི་དམངས་ཀྱིས་");
                  result = result.replaceAll(
                    "རྒྱ་ནག་གུང་ཁྲན་ཚོགས་པ",
                    "རྒྱ་ནག་དམར་ཤོག་ཚོགས་པ"
                  );
                  result = result.replaceAll(
                    "རྒྱ་ནག་མི་མང་སྤྱི་མཐུན་རྒྱལ་ཁབ་",
                    "རྒྱ་ནག་མི་དམངས་སྤྱི་མཐུན་རྒྱལ་ཁབ་"
                  );
                  result = result.replaceAll(
                    "འབྲེལ་ལམ་བཙུགས་དང་མུ་མཐུད་སྲ་བརྟན་དུ་གཏོང་ངེས།",
                    "འབྲེལ་ལམ་འཛུགས་པ་དང་མུ་མཐུད་སྲ་བརྟན་དུ་གཏོང་ངེས།"
                  );
                  result = result.replaceAll(
                    "ཆའོ་ཝི་ནོ་རིང་ལུགས་",
                    "མི་རིགས་རིང་ལུགས་"
                  );
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
                  result = result.replaceAll(
                    "ཆབ་སྲིད་ཀྱི",
                    "ས་ཁམས་ཆབ་སྲིད་ཀྱི"
                  );
                  result = result.replaceAll(
                    "རྒྱ་ནག་དང་ཨེ་ཤེ་ཡ་གཉིས་ཀྱིས་",
                    "རྒྱ་ནག་དང་ལྷོ་ཤར་ཨེ་ཤེ་ཡའི་མནའ་འབྲེལ་མཐུན་ཚོགས་གཉིས་ཀྱིས་"
                  );
                  result = result.replaceAll(
                    "སྲིད་བློན་ལི་ཁྲེང་",
                    "སྲིད་བློན་ལི་ཆང་"
                  );
                  result = result.replaceAll(
                    "རྒྱ་ནག་དང་ཨེ་ཤེ་ཡའི་རྒྱལ་ཁབ་གཉིས་ཀྱིས་",
                    "རྒྱ་ནག་དང་ལྷོ་ཤར་ཨེ་ཤེ་ཡའི་མནའ་འབྲེལ་མཐུན་ཚོགས་གཉིས་ཀྱིས་"
                  );
                  result = result.replaceAll(
                    "ཕན་ཚུན་རྟེན་ཅིང་འབྲེལ་བར་འབྱུང་བ་ནི་གོ་སྐབས་ཤིག་ཡིན།",
                    "ཕན་ཚུན་བརྒྱུད་སྦྲེལ་རང་བཞིན་ཇེ་ལེགས་སུ་གཏོང་དགོས།"
                  );
                  result = result.replaceAll(
                    "གོས་ཆེན་ལྕགས་ལམ",
                    "དར་གོས་ཚོང་ལམ"
                  );
                  result = result.replaceAll("ཁུ་རན་གསུང་རབ", "ཀོ་རན་གསུང་རབ");
                  result = result.replaceAll("གཤན་ཏུང", "ཧྲན་ཏུང");
                  result = result.replaceAll(
                    "བསྟན་སེལ་སྤྱི་གཉེར་ཁང་འི་Tencent",
                    "ཊེན་སེན་ཊི་སྤྱི་གཉེར་ཁང་གི"
                  );

                  result = result.replaceAll("མེར་པོ་ུའུ་", "མེར་པོའུ་");
                  result = result.replaceAll("ལྷོ་ཁོ་རེ་ཡ", "ལྷོ་ཀོ་རེ་ཡ");
                  result = result.replaceAll("བྱང་ཁོ་རེ་ཡ", "བྱང་ཀོ་རེ་ཡ");
                  result = result.replaceAll(
                    "ཁོ་རེ་ཡ་ལྷོ་བྱང་གཉིས",
                    "ཀོ་རེ་ཡ་ལྷོ་བྱང་གཉིས"
                  );
                  result = result.replaceAll(
                    "ཀྲུང་དབྱང་ལྷན་ཁང་",
                    "དབུས་གཞུང་ལྷན་ཁང་"
                  );
                  result = result.replaceAll(
                    "ཀྲུང་དབྱང་མི་དམངས",
                    "དབུས་གཞུང་མི་དམངས"
                  );
                  result = result.replaceAll("ཧ་རན་སུ", "ཧྥ་རན་སི");
                  result = result.replaceAll("ཤིན་ཅིན་ཕིན", "ཞིས་ཅིན་ཕིན");
                  result = result.replaceAll("མའོ་སི་ཁཱོ", "མོ་སི་ཁཱོ");
                  result = result.replaceAll("པེ་ཅིན་གྱི", "པེ་ཅིང་གི");
                  result = result.replaceAll("ཧཱ་ཝེ", "ཧྭ་ཝེ");
                  result = result.replaceAll("ཆབ་སྲིད་པུའུ", "ཆབ་སྲིད་ལྷན་ཁང");
                  result = result.replaceAll(
                    " བྱང་ཨ་མེ་རི་ཁ",
                    " བྱང་ཨ་མེ་རི་ཀ"
                  );
                  result = result.replaceAll(
                    "རྒྱ་ནག་ལྷོ་ཕྱོགས་ཀྱི་ཞོགས་པའི་སྦྲག་ཁང",
                    "རྒྱ་ནག་ལྷོ་ཕྱོགས་ཞོགས་པའི་ཚགས་པར"
                  );
                  result = result.replaceAll(
                    "ཨ་ལ་བྷ་བྷ་དྲྭ་ཚིགས",
                    "ཨ་ལི་བྷ་བྷ་དྲྭ་ཚིགས"
                  );
                  result = result.replaceAll("ཡོ་རོབ", "ཡུ་རོབ");
                  result = result.replaceAll("ཨ་ལ་བྷ་བྷ", "ཨ་ལི་བྷ་བྷ");
                  result = result.replaceAll("ཨ་ལི་བྷ་བྷཱ་", "ཨ་ལི་བྷ་བྷ");
                  result = result.replaceAll("ཡོ་རོབ་ནུབ་མ", "ཡུ་རོབ་ནུབ་མ");
                  result = result.replaceAll("ཨོ་སི་ཊི་ལི་ཡ", "ཨོ་སི་ཁྲུ་ལི་ཡ");
                  result = result.replaceAll(
                    "རིག་གནས་གསར་བརྗེའི་སྐབས་སུ་གྲགས་ཆེ་བའི་མིག་དཔེར་འོས་པའི་ལྷ་མོའི་འཁྲབ་གཞུང་བརྒྱད",
                    "རིག་གནས་གསར་བརྗེའི་སྐབས་སུ་གྲགས་ཆེ་བའི་མིག་དཔེར་འོས་པའི་ཟློས་གར་འཁྲབ་གཞུང་བརྒྱད"
                  );
                  result = result.replaceAll(
                    "སྲིད་བློན་ལི་ཁྲེང",
                    "སྲིད་བློན་ལི་ཆང་"
                  );
                  result = result.replaceAll(
                    "ཀྲུང་དབྱང་དམག་དོན་ལྷན་ཁང",
                    "དབུས་གཞུང་དམག་དོན་ལྷན་ཁང"
                  );
                  result = result.replaceAll("ཊོག་ཀྱེ", "ཊོག་ཀྱོ");
                  result = result.replaceAll(" པེ་ཅིན་ན་ཡོད", " པེ་ཅིང་ན་ཡོད");
                  result = result.replaceAll(
                    "ཕ་རེ་སིའི་གྲོས་མཐུན",
                    "ཕེ་རེ་སིའི་གྲོས་མཐུན"
                  );
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
                  result = result.replaceAll(
                    "ཨ་ཧི་གྷ་ནི་སི་ཐན",
                    "ཨ་ཧྥི་གྷ་ནི་སི་ཐན"
                  );
                  result = result.replaceAll(
                    "ཨཕ་གྷ་ནི་སི་ཐན",
                    "ཨ་ཧྥི་གྷ་ནི་སི་ཐན"
                  );
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
                  result = result.replaceAll(
                    "གཞིས་ལེན་གཟབ་རྒྱས",
                    "གཞིས་ལེན་གཟབ་རྒྱས"
                  );
                  result = result.replaceAll(
                    "སྐེད་རགས་དང་གཞུང་ལམ",
                    "རྒྱུད་གཅིག་ལམ་གཅིག"
                  );
                  result = result.replaceAll(
                    "ཨང་ཀིའི་ཞབས་ཞུ",
                    "གྲངས་འཛིན་ཞབས་ཞུ"
                  );
                  result = result.replaceAll(
                    "ཨང་ཀིའི་སྤྱི་ཚོགས",
                    "གྲངས་འཛིན་སྤྱི་ཚོགས"
                  );
                  result = result.replaceAll(
                    "ཨང་ཀིའི་འགྱུར་ལྡོག",
                    "གྲངས་འཛིན་འགྱུར་ལྡོག"
                  );
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
                  result = result.replaceAll(
                    "ཧིན་དྷུ་ཉི་ཞི་ཡ",
                    "ཧིན་དྷུ་ནེ་ཤི་ཡ"
                  );
                  result = result.replaceAll(
                    "ཇུ་ལཱི་པིས་ཞ་ཕུ",
                    "ཇུ་ལེའུ་བྷིས་ཞིབ"
                  );
                  result = result.replaceAll(
                    "ཨན་ཊོ་ནི་ཨེལ་བྷན་ནེ་སི",
                    "ཨན་ཐོ་ནི་ཨེལ་བྷན་ནེ་སི"
                  );
                  result = result.replaceAll("ཧོ་ཝེ་མེ་ཊེ", "ཧྭ་ཝི་མེ་ཊེ");
                  result = result.replaceAll(
                    "འཛམ་གླིང་དུས་བབ་ཚགས་པར",
                    "གོ་ལའི་དུས་བབ་གསར་ཤོག"
                  );
                  result = result.replaceAll("ཧུའུ་ཝེ", "ཧྭ་ཝི");
                  result = result.replaceAll(
                    "ཧུ་མེ་ཨོ་ཀི་ཤི་ཌ",
                    "ཧྥུ་མོའི་ཀི་ཤི་ད"
                  );
                  result = result.replaceAll("ཀི་ཤི་ཌ", "ཀི་ཤི་ད");
                  result = result.replaceAll("ཀི་ཞ་དྷ", "ཀི་ཤི་ད");
                  result = result.replaceAll("ཕུའུ་ཁུ་ཤི་མ", "ཕུ་ཁུ་ཞི་མ");
                  result = result.replaceAll(
                    "ཧིན་རྡུ་ཉི་ཞི་ཡ",
                    "ཨིན་ཌོ་ནེ་ཤི་ཡ"
                  );
                  result = result.replaceAll(
                    "ཧིན་རྡུ་ཉི་ཞི་ཡའི",
                    "ཨིན་ཌོ་ནེ་ཤི་ཡའི"
                  );
                  result = result.replaceAll("ཨ་ཧེ་རི་ཀ", "ཨ་ཧྥི་རི་ཀ");
                  result = result.replaceAll(
                    "ཨན་ཐོ་ནེ་ཤི་ཨལ་བྷན",
                    "ཨན་ཐོ་ནི་ཨེལ་བྷན་ནེ་སི"
                  );
                  result = result.replaceAll("ཨལ་བྷན་ཉི", "ཨེལ་བྷན་ནེ་སི");
                  result = result.replaceAll(
                    "ཁི་རེག་ཨེ་མིར་སོན",
                    "ཁི་རེ་གྷན་ཨེ་མིར་སོན"
                  );
                  result = result.replaceAll(
                    "ཇུ་ལེ་པིས་ཞ་ཕུ",
                    "ཇུ་ལེའུ་བྷིས་ཞིབ"
                  );
                  result = result.replaceAll(
                    "ཨན་ཐོ་ཉི་ཨལ་བྷན་ནེ་སི",
                    "ཨན་ཐོ་ནི་ཨེལ་བྷན་ནེ་སི"
                  );
                  result = result.replaceAll(
                    "ཁ་ལི་ཧྥོར་ནི་ཡ",
                    "ཁཱ་ལེ་ཧྥོར་ནི་ཡ"
                  );
                  result = result.replaceAll("ཁེན", "ཁིང");
                  result = result.replaceAll("ཧོར་དྷོ", "བྷོར་དྷོ");
                  result = result.replaceAll(
                    "གོ་ལ་གསར་འགྱུར་ཁང",
                    "གོ་ལའི་དུས་བབ་གསར་ཤོག"
                  );
                  result = result.replaceAll(
                    "འཛམ་གླིང་དུས་བབ་གསར་ཁང",
                    "གོ་ལའི་དུས་བབ་གསར་ཤོག"
                  );
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
                  result = result.replaceAll(
                    "འཛམ་གླིང་དུས་བབ་ཚགས་པར",
                    "གོ་ལའི་དུས་བབ་གསར་ཤོག"
                  );
                  result = result.replaceAll(
                    "ཧིན་དྷུ་ཉི་ཞི་ཡ",
                    "ཨིན་ཌོ་ནེ་ཤི་ཡ"
                  );
                  result = result.replaceAll("ེག་ས་སི", "ཌེག་ས་སི");
                  result = result.replaceAll(
                    "འཇོར་ཇི་བྷོ་ཤི",
                    "འཇོར་ཇི་བྷུ་ཤུ"
                  );
                  result = result.replaceAll("ཞིས་ཅིན་ཕིང", "ཞི་ཅིན་ཕིན");
                  result = result.replaceAll(
                    "ཌོ་ནོལ་ི་ཁྲེམ་ཕུ",
                    "ཌོ་ནལ་ཋོམ་ཕུ"
                  );

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

                  result = result.replaceAll(
                    "ཨེ་ལོན་མཱས་ཁི",
                    "ཨེ་ལོན་མཱ་སི་ཁི"
                  );
                  result = result.replaceAll("མའེ་ཁོ་སཱཊ", "མེག་རོ་སོ་ཧྥི");
                  result = result.replaceAll("བྷིལ་གྷལ་ཚི", "བྷིལ་གྷེ་ཚི");
                  result = result.replaceAll("གྷོ་གྷལ", "གྷུས་གྷུལ");
                  result = result.replaceAll("མཱས་ཁི", "མཱ་སི་ཁི");
                  result = result.replaceAll("ས་གྱི", "ས་ཀྱི");
                  result = result.replaceAll("མའེ་ཁུ་སི་ཀྲོ", "མེག་རོ་སོ་ཧྥི");
                  result = result.replaceAll(
                    "མེག་རོ་སོ་ཧྥི་ཧུ",
                    "མེག་རོ་སོ་ཧྥི"
                  );
                  result = result.replaceAll(
                    "གྷུས་གྷུལ་གྱི་འཁྲིག་ལྡན་མ",
                    "གྷུས་གྷུལ་གྱི་ཇ་མན་ནཱཡེ"
                  );
                  result = result.replaceAll("འཆར་འགོད་པར་ཌི", "བྷར་ཌི་ཁ་བརྡ");
                  result = result.replaceAll(
                    "ཡོ་ཊོ་ཀླད་ཀྱི་བརྙན་ཐག",
                    "ཡུས་ཊུབ་བརྙན་རིས"
                  );
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
                  result = result.replaceAll("ལྷ་ས་ལྷོ་བྱང་ལྷན་ཁང", "ལ་དྭགས་རང་སྐྱོང་རི་ལྗོངས་ཡར་རྒྱས་ལྷན་ཚོགས་གླེ");
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
                  result = result.replaceAll("data: Your request is a little bit too short. Please try again as MITRA can only work reliably on complete sentences.", "Your request is a little bit too short. Please try again as MLMT can only work reliably on complete sentences.\n ཁྱེད་ཀྱི་རེ་སྐུལ་དེ་ཅུང་ཟད་ཐུང་དྲགས་འདུག་ཡང་བསྐྱར་ཐབས་ཤེས་ཤིག་གནང་རོགས། སྨོན་ལམ་རིག་ནུས་གྱིས་ཚིག་གྲུབ་ཧྲིལ་པོ་ཁོ་ན་མ་གཏོགས་ཡིག་སྒྱུར་བྱེད་མི་ཐུབ།");
                  result = result.replaceAll("ཙུང་ཐུང", "སྲིད་འཛིན");
                  result = result.replaceAll("ཉུང་ཟད་", "ཅུང་ཟད་");
                  result = result.replaceAll("ཇ་ཝིཊ", "ཇ་ཝ་སི་ཁི (JavaScript)");
                  //ཇ་ཝིཊ
                  result = result.replaceAll("\n\n\n", "\n\n");
                  result = result.replaceAll("།", "། ");
                  result = result.replaceAll("།  ", "། ");
                  result = result.replaceAll("པ་འོ། །", "པའོ།།");
                  result = result.replaceAll(", being developed at the Berkeley AI Research Lab", "");
                  result = result.replaceAll("We are sorry. Monlam AI is not able to translate '' with sufficient quality.", "\n(འདི་ལ་ཡིག་སྒྱུར་ཚད་ལྡན་ཞིག་བྱུང་ཡོད་མེད་ལ་བསྐྱར་ཞིབ་གནང་རོགས།)");
                  result = result.replaceAll("We are sorry. Monlam AI is not able to translate ", "\n(དགོངས་དག་སྨོན་ལམ་རིག་ནུས་ཀྱིས་འདི་ ");
                  result = result.replaceAll("with sufficient quality.", "ཡག་པོ་ཞིག་སྒྱུར་ཐུབ་མ་སོང་།)");
                  result = result.replaceAll("We are sorry. MITRA is not able to translate", "\n(དགོངས་དག་སྨོན་ལམ་རིག་ནུས་ཀྱིས་འདི་ ");
                  result = result.replaceAll("<br /><br /><small><i>This translation is generated by the MITRA model v9-22, currently in alpha testing phase in collaboration with our principal data provider, monlam.ai.</i></small>", "");
                  
                  
                  
                  
                  
                  result = result.replaceAll("(དགོངས་དག་སྨོན་ལམ་རིག་ནུས་ཀྱིས་འདི་  '' ཡག་པོ་ཞིག་སྒྱུར་ཐུབ་མ་སོང་།)", "");
                  result = result.replaceAll("(དགོངས་དག་སྨོན་ལམ་རིག་ནུས་ཀྱིས་འདི་   ཡག་པོ་ཞིག་སྒྱུར་ཐུབ་མ་སོང་།)", "");
                  result = result.replaceAll("<br /><br /><small><i>This translation is generated by the MITRA model v9-22, currently in alpha testing phase, being developed at the Berkeley AI Research Lab in collaboration with our principal data provider, monlam.ai.</i></small>", "");
                  
                  result = result.replaceAll("བཅོམ་ལྡན་འདས་ཀྱིས་བཀའ་སྩལ་པ། རབ་འབྱོར་འདི་ཇི་སྙམ་དུ་སེམས། བྱང་ཆུབ་སེམས་དཔའ་སེམས་དཔའ་ཆེན་པོ་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་འཚང་རྒྱ་བར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟ", "");
                  result = result.replaceAll("བྱང་ཆུབ་སེམས་དཔའ་སེམས་དཔའ་ཆེན་པོ་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་འཚང་རྒྱ་བར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་", "");
                  result = result.replaceAll("རབ་འབྱོར་གཞན་ཡང་བྱང་ཆུབ་སེམས་དཔའ་སེམས་དཔའ་ཆེན་པོ་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་འཚང་རྒྱ་བར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་པར་བྱ་རབ་ཏུ་གདོན་པར་བྱ་བསྟན་པར་བྱ་ཉེ་བར་བསྟན་པར་བྱ་ལུང་དབོག་པར་བྱ་ཁ་ཏོན་དུ་བྱ་གཞན་དག་ལ་ཡང་རྒྱ་ཆེར་ཡང་དག་པར་སྟོན་པར་འདོད་པས་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་ཉིད་མཉན་པར་བྱ་གཟུང་བར་བྱ་བཅང་བར་བྱ་ཀླག་པར་བྱ་ཀུན་ཆུབ་ རིགས་ཀྱི་བུའམ་རིགས་ཀྱི་བུ་མོ་གང་ལ་ལ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་འདི་འཛིན་པ་དང་འཆང་བ་དང་ཀློག་པ་དང་ཀུན་ཆུབ་པར་བྱེད་པ་དང་རབ་ཏུ་འདོན་པ་དང་སྟོན་པ་དང་ཉེ་བར་སྟོན་པ་དང་ལུང་འབོགས་པ་དང་ཁ་ཏོན་དུ་བྱེད་པར་འགྱུར་བའི་རིགས་ཀྱི་བུའམ་རིགས་ཀྱི་བུ་མོ་དེ་དེའི་གཞི་ལས་བསོད་ནམས་ཆེས་མང་དུ་སྐྱེད་དོ། །", "");
                  result = result.replaceAll("མདོ་སྡེ་རྒྱན་གྱི་འགྲེལ་པ་ཉི་མའི་སྙིང་པོ་ཞེས་བྱ་བའི་ཚིག་ལེའུར་བྱས་པ་འཕགས་པ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའི་མན་ངག་གི་བསྟན་བཅོས་མངོན་པར་རྟོགས་པའི་རྒྱན་གྱི་ཚིག་ལེའུར་བྱས་པའི་རྣམ་པར་བཤད་པ་དེ་ཁོ་ན་ཉིད་སྣང་བར་བྱེད་པ་ཞེས་བྱ་བ་མཛོད་ཀྱི་གནས་བདུན་པ་རྫོགས་སོ། ། ། ། རྒྱ་གར་གྱི་མཁན་པོ་ཤཱི་ལེནྡྲ་བོ་དྷི་དང་། ཞུ་ཆེན་གྱི་ལོ་ཙཱ་བ་བནྡེ་ཡེ་ཤེས་སྡེས་བསྒྱུར་ཅིང་ཞུས་ཏེ་གཏན་ལ་ཕབ་པ། ། ༄༅། ། ན་མོ་གུ་རུ་མཉྫུ་གྷོ་ཱ་ཡ། ༄༅། ། རྒྱ་གར་སྐད་དུ། ཨ་བྷི་ས་མ་ཡ་ཨ་ལངྐཱ་ར་ནཱ་མ་པྲཛྙཱ་པཱ་ར་མི་ཏཱ་མ་ཧཱ་ཡཱ་ན་སཱུ་ཏྲ། བོད་སྐད་དུ། འཕགས་པ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའི་མན་ངག་གི་བསྟན་བཅོས་མངོན་པར་རྟོགས་པའི་རྒྱན་གྱི་ཚིག་ལེའུར་བྱས་པ་འཕགས་པ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའི་མན་ངག་གི་བསྟན་བཅོས་མངོན་པར་རྟོགས་པའི་རྒྱན་གྱི་ཚིག་ལེའུར་བྱས་པ་འཕགས་པ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའི་མན་ངག་གི་བསྟན་བཅོས་མངོན་པར་རྟོགས་པའི་རྒྱན་གྱི་ཚིག་ལེའུར་བྱས་པ།", "");
                  result = result.replaceAll("རབ་འབྱོར་འདི་ཇི་སྙམ་དུ་སེམས། དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་པའི་ཆོས་དེ་གང་ཡང་ཡོད་དམ། གསོལ་པ། བཅོམ་ལྡན་འདས་དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་པའི་ཆོས་དེ་གང་ཡང་མ་མཆིས་སོ། ། དེ་ཅིའི་སླད་དུ་ཞེ་ན། དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་པའི་ཆོས་དེ་གང་ཡང་མ་མཆིས་སོ། ། དེ་ཅིའི་སླད་དུ་ཞེ་ན། དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་པའི་ཆོས་དེ་གང་ཡང་མ་མཆིས་སོ། ། དེ་ཅིའི་སླད་དུ་ཞེ་ན། དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་པའི་ཆོས་དེ་གང་ཡང་མ་མཆིས་སོ། ། དེ་ཅིའི་སླད་དུ་ཞེ་ན། དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་པའི་ཆོས་དེ་གང་ཡང་མ་མཆིས་སོ། ། དེ་ཅིའི་སླད་དུ་ཞེ་ན། དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་རྫོགས་པར་སངས་རྒྱས་པའི་ཆོས་དེ་གང་ཡང་མ་མཆིས་སོ། ། དེ་ཅིའི་སླད་དུ་ཞེ་ན། དེ་བཞིན་གཤེགས་པས་གང་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་མངོན་པར་", "");
                  result = result.replaceAll("རབ་འབྱོར་འདི་ལྟ་སྟེ་དཔེར་ན་དེ་བཞིན་གཤེགས་པ་དགྲ་བཅོམ་པ་ཡང་དག་པར་རྫོགས་པའི་སངས་རྒྱས་ཀྱི་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་ནི་འདི་ལྟ་སྟེ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའོ། ། རབ་འབྱོར་འདི་ལྟ་སྟེ་དཔེར་ན་དེ་བཞིན་གཤེགས་པ་དགྲ་བཅོམ་པ་ཡང་དག་པར་རྫོགས་པའི་སངས་རྒྱས་ཀྱི་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་ནི་འདི་ལྟ་སྟེ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའོ། ། རབ་འབྱོར་འདི་ལྟ་སྟེ་དཔེར་ན་དེ་བཞིན་གཤེགས་པ་དགྲ་བཅོམ་པ་ཡང་དག་པར་རྫོགས་པའི་སངས་རྒྱས་ཀྱི་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་ནི་འདི་ལྟ་སྟེ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའོ། ། རབ་འབྱོར་འདི་ལྟ་སྟེ་དཔེར་ན་དེ་བཞིན་གཤེགས་པ་དགྲ་བཅོམ་པ་ཡང་དག་པར་རྫོགས་པའི་སངས་རྒྱས་ཀྱི་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་ནི་འདི་ལྟ་སྟེ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའོ། ། རབ་འབྱོར་འདི་ལྟ་སྟེ་དཔེར་ན་དེ་བཞིན་གཤེགས་པ་དགྲ་བཅོམ་པ་ཡང་དག་པར་རྫོགས་པའི་སངས་རྒྱས་ཀྱི་བླ་ན་མེད་པ་ཡང་དག་པར་རྫོགས་པའི་བྱང་ཆུབ་ནི་འདི་ལྟ་སྟེ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའོ། ། རབ་འབྱོར་དེ་བཞིན་དུ་བྱང་ཆུབ་སེམས་དཔའ་སེམས་དཔའ་ཆེན་པོ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་", "");
                  result = result.replaceAll("༄༅། ། དབུ་མ་རྩ་བའི་ཚིག་ལེའུར་བྱས་པ་ཤེས་རབ་ཅེས་བྱ་བ་ཐེག་པ་ཆེན་པོའི་མདོ་རྫོགས་སོ། ། ། ། རྒྱ་གར་གྱི་མཁན་པོ་ཤཱི་ལེནྡྲ་བོ་དྷི་དང་། ཞུ་ཆེན་གྱི་ལོ་ཙཱ་བ་བནྡེ་ཡེ་ཤེས་སྡེ་ལ་སོགས་པས་བསྒྱུར་ཅིང་ཞུས་ཏེ་གཏན་ལ་ཕབ་པ། ། ། ། ༄༅། ། ཨོཾ་སྭ་སྟི་སིདྡྷི་རཏྣ་པྲ་བྷ་ཝཱ་ཧེ་ཏུནྟེ་ཱནྟེ་ཱནྟེ་ཱནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེནྟཱེ", "");
                  
                  
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
                  result = result.replaceAll("སི་ཀོང་སྤེན་པ་ཚེ་རིང", "སྲིད་སྐྱོང་སྤེན་པ་ཚེ་རིང");
                  result = result.replaceAll("ཚིན་ཧྭ", "ཆིན་ཧ");
                  result = result.replaceAll("ཨེད་ཁུ་སི", "ཨེག་སི");
                  result = result.replaceAll("ས་ཡ་མང་པོ་བོད་གཞུང་གི་དབང་སྒྱུར", "ས་ཡ་མང་པོ་རྒྱ་གཞུང་གི་དབང་སྒྱུར");
                  result = result.replaceAll("༄༅། ། ", "");
                  result = result.replaceAll("༄༅། །", "");
                  result = result.replaceAll("མཐོ་སྒང་ཨིན་ཆི་ཐེ་རུ", "ཨེིན་ཤོན་མཐོ་སྒང་དུ");
                  result = result.replaceAll("དབྱི་སི་ལན", "ཨི་སི་ལམ");

                  result = result.replaceAll("གྷ་ཟ", "གྷ་ཛ");
                  result = result.replaceAll("གྷ་སའི", "གྷ་ཛའི");
                  result = result.replaceAll("དབྱི་སི་རལ", "ཨི་སི་རལ");
                  result = result.replaceAll("ཞི་ཅིན་ཕིན་གསར་འགྱུར་ཁང་", "ཤིན་ཧྭ་གསར་འགྱུར་ཁང་");
                  result = result.replaceAll("བསམ་སྡོང་རིན་པོ་ཆེ", "ཟམ་གདོང་རིན་པོ་ཆེ");
                  result = result.replaceAll("བསམ་སྡོང་བསམ་བློ", "ཟམ་གདོང་བསམ་བློ");
                  result = result.replaceAll("བསམ་རྡོང་རིན་པོ་ཆེ", "ཟམ་གདོང་རིན་པོ་ཆེ");
                  result = result.replaceAll("བསམ་རྡོང་གི་ལྟ་བ", "ཟམ་གདོང་གི་ལྟ་བ");
                  result = result.replaceAll("བྷ་རཱ་ཁཱ་ཨོ་བྷ་མ", "བྷ་རག་ཨོ་བྷ་མ");
                  result = result.replaceAll("བྷ་རཱ་ཁེ་ཨོ་བྷ་མ", "བྷ་རག་ཨོ་བྷ་མ");
                  result = result.replaceAll("སྲིད་འཛིན་སྐུ་ཕྲེང་བཞི་བཅུ་ང་གསུམ", "སྲིད་འཛིན་ཞེ་གསུམ");
                  result = result.replaceAll("སྲིད་འཛིན་སྐུ་ཕྲེང་བཞི་བཅུ་ང་བཞི", "སྲིད་འཛིན་ཞེ་བཞི");
                  result = result.replaceAll("སྲིད་འཛིན་སྐུ་ཕྲེང་བཞི་བཅུ་ང་ལྔ", "སྲིད་འཛིན་ཞེ་ལྔ");
                  result = result.replaceAll("ཐོག་མའི་ལྕམ", "ལྕམ་སྐུ་དང་པོ");
                  result = result.replaceAll("བུད་མེད་སྐུ་ཕྲེང་དང་པོ་གཉིས་པ", "ལྕམ་སྐུ་དང་པོ་གཉིས་པ");

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
                  result = result.replaceAll("༈ཨོཾ་སརྦ་ཏ་ཐཱ་ག་ཏ་ཨ་བྷི་ེ་ཀ་ཏ་ས་མ་ཡ་ཤྲཱི་ཡེ་ཧཱུྃ།", "");
                  result = result.replaceAll("ཅིག་གྱི", "ཅིག་གི");
                  result = result.replaceAll("་ ", "་");

                  //་ 
                  
                  //འདི་དག་ནི་དམིགས་བསལ་ཚོར་བ་རྣོ་བའི་སྐོར་ཡིན།
                  result = result.replaceAll("ཏཱ་ལའི་བླ་མ་མཆོག་གིས", "ཁོང་གིས");
                  result = result.replaceAll("བོད་དབུས་ཤར་ཁུལ", "དབུས་ཤར་ཁུལ");
                  result = result.replaceAll("ཨིན་ཇིའི་རྒྱལ་ཁབ་མང་པོ", "རྒྱལ་ཁབ་མང་པོ");
                  result = result.replaceAll("ཨིན་ཅི་གྲོས་ཚོགས", "གྲོས་ཚོགས");
                  result = result.replaceAll("ངོས་རང་", "ང་རང་");
                  result = result.replaceAll("བྱང་གི་སྒྲ་མི་སྙན་གྱི་བར་གྱི་ལམ་པོ་ཆེ", "ནཱ་ལནྡཱ་བར་གྱི་ལམ་པོ་ཆེ");
                  result = result.replaceAll("བྱང་གི་སྒྲ་མི་སྙན", "ནཱ་ལནྡཱ");
                  result = result.replaceAll("བསྟོད་བསྔགས་མི་འདྲ་བ་མང་དུ་བྱས་ཀྱང", "བསྔགས་པ་མ་ཡིན་པ་མང་དུ་བྱས་ཀྱང");
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
                  
                  
                  //མེད་མིན་གྱི་

                  //ཏཱ་ལའི་བླ་མ་མཆོག་གིས
                  //སྲིད་འཛིན་སྐུ་ཕྲེང་བཞི་བཅུ་ང་བཞི
                  result = result.replaceAll(/(\d+)([^\d]+)/g, '$1 $2');
                  result = result.replaceAll(/([\u0F20-\u0F33]+)([^\u0F20-\u0F33]+)/g, '$1 $2');
                  
                  // Split the text into lines
                  const lines = result.trim().split('\n');

                  // Remove the character "།" from the beginning of each line
                  const cleanedLines = lines.map((line) => {
                    
                    if (line.charAt(0) === "།") {
                      return line.substring(1);
                    } else {
                      return line;
                    }
                  });
                  result = cleanedLines.join('\n');
                  
                 // result = removeDuplicateTibetanSentences(result);
                  // རྣམ་པ་ཉུང་ཟད་ཅིག
                  //<br /><br /><small><i>This translation is generated by the MITRA model v9-22, currently in alpha testing phase in collaboration with our principal data provider, monlam.ai.</i></small>
                  
                  result = result.replaceAll("<br /><br /><small><i>This translation is generated by the MITRA model v10 -16 , currently in alpha testing phase in collaboration with our principal data provider, monlam.ai.</i></small>", "");
                  
                  $("#textarea-2").val(result);
                  console.log(enTbfanaltext);
                  
                  document.getElementById("loader").style.display = "none";
                }

                //console.log(response);
              },
              error: function (error) {
                // Handle any errors here
                console.error(error);
              },
            });

            //console.log(enTbfanaltext);

            //console.log(i + " Result " + combinedData + "འདི་ལེགས་པར་གྲུབ།");
          } else {
            // console.log("Empty Line" + i);
          }
        }
        //ཟླ་ཚེས་འཚོལ་བྱེད།
          // Sample usage
         

          
          
      }
      function convertToLowerCaseIfAllUppercase(inputString) {
      return inputString === inputString.toUpperCase() ? inputString.toLowerCase() : inputString;
      }
      function removeDuplicateTibetanSentences(inputText) {
      // Split the input text into Tibetan sentences using Tibetan punctuation as separators
      const sentences = inputText.split(/[།༎]+/);
      

      // Create an object to store the frequency of each Tibetan sentence
      const sentenceFrequency = {};

      // Count the frequency of each Tibetan sentence
      sentences.forEach((sentence) => {
        const trimmedSentence = sentence.trim();
        if (trimmedSentence) {
          if (trimmedSentence in sentenceFrequency) {
            sentenceFrequency[trimmedSentence]++;
          } else {
            sentenceFrequency[trimmedSentence] = 1;
          }
        }
      });

      // Filter out Tibetan sentences that appear less than or equal to two times
      const uniqueSentences = sentences.filter((sentence) => {
        const trimmedSentence = sentence.trim();
        return sentenceFrequency[trimmedSentence] <= 2;
      });

      // Join the unique Tibetan sentences back into a single string
      const resultText = uniqueSentences.join('། ');

      return resultText;
    }
    </script>

    <script>
      function changeLangValue2() {
        var LabgValue1 = lang1;
        var LabgValue2 = lang2;
        if (LabgValue1 === LabgValue2) {
          alert(
            "\nཁྱེད་ཀྱིས་སྐད་གཅིག་པ་གཉིས་བདམས་འདུག \nཡིག་སྒྱུར་བྱེད་པ་ལ་ངེས་པར་དུ་སྐད་ཡིག་མ་འདྲ་གཉིས་གདམ་དགོས།"
          );
        } else {
          lang1 = LabgValue2;
          lang2 = LabgValue1;
          console.log(lang1 + "-" + lang2);
          const selectElement1 = document.getElementById("languageSelect1");
          const selectElement2 = document.getElementById("languageSelect2");

          // Get the selected options from each select element
          const selectedOption1 =
            selectElement1.options[selectElement1.selectedIndex];
          const selectedOption2 =
            selectElement2.options[selectElement2.selectedIndex];

          // Swap the text content of the selected options
          const tempText = selectedOption1.textContent;
          selectedOption1.textContent = selectedOption2.textContent;
          selectedOption2.textContent = tempText;

          // const textarea1 = document.getElementById("textarea-1");
          // const textarea2 = document.getElementById("textarea-2");

          // // Add an input event listener to textarea1
          // textarea1.addEventListener("input", () => {
          //   textarea2.value = textarea1.value; // Mirror text from textarea1 to textarea2
          // });

          // // Add an input event listener to textarea2
          // textarea2.addEventListener("input", () => {
          //   textarea1.value = textarea2.value; // Mirror text from textarea2 to textarea1
          // });
          const textarea1 = document.getElementById("textarea-1");
          const textarea2 = document.getElementById("textarea-2");

          var textareaText1 = textarea1.value;
          var textareaText2 = textarea2.value;
          textarea1.value = textareaText2;
          textarea2.value = textareaText1;
        }
      }
      function changeSelectValue() {
        // Get the select element
        const selectElement1 = document.getElementById("languageSelect1");
        const selectElement2 = document.getElementById("languageSelect2");

        const selectedValue1 = selectElement1.value;
        const selectedValue2 = selectElement2.value;
        lang1 = selectedValue1;
        lang2 = selectedValue2;

        console.log(lang1 + "-" + lang2);
      }
      function changeSelectValue2() {
        // Get the select element
        const selectElement1 = document.getElementById("languageSelect1");
        const selectElement2 = document.getElementById("languageSelect2");

        const selectedValue1 = selectElement1.value;
        const selectedValue2 = selectElement2.value;
        lang1 = selectedValue1;
        lang2 = selectedValue2;

        console.log(lang1 + "-" + lang2);
      }
      $(document).ready(function () {
        const textarea = document.getElementById("textarea-1");
        const wordCountDisplay = document.getElementById("display_count");
        const textSpan = document.getElementById("display_count");
        dolma();
        //སྐད་ཡིག་ངོས་འཛིན་བྱེད་བྱེ་མཁན།

        //const franc = require("franc-min");

        // const langs = require("langs");

        // const text = "this is english";
        // const langCode = franc(text);

        // const language = langs.where("3", langCode);

        // if (language) {
        //   console.log("སྐབས་འདིའི་སྐད་ཡིག་ནི། " + language.name + " རེད།"); // Outputs: "French"
        // } else {
        //   console.log("Unknown language");
        // }

        textarea.addEventListener("input", () => {
          const text = textarea.value;
          const words = text.trim().split(/\s+/);
          const wordCount =
            words.length > 0 && words[0] !== "" ? words.length : 0;
          wordCountDisplay.textContent = wordCount;

          if (wordCount > 1500) {
            textSpan.style.color = "red";
          } else {
            textSpan.style.color = "#808080";
            console.log(textSpan);
          }
        });

        

      });
    </script>
    <script>
     // Sample paragraph containing Tibetan dates and numbers
      function tibetandate(tbdate){
        const paragraph = tbdate;
        // Use Unicode character ranges for Tibetan script
        const tibetanScriptRegex = /[\u0F00-\u0FFF]+/g;

        // Arrays to store Tibetan dates and numbers
        const tibetanDates = [];
        const tibetanNumbers = [];

        // Find Tibetan dates and numbers in the paragraph
        let match;
        while ((match = tibetanScriptRegex.exec(paragraph)) !== null) {
          const word = match[0];
          // Check if it's a date or number based on your specific criteria
          // You might need additional logic to distinguish between dates and numbers
          if (/\d+/.test(word)) {
            tibetanNumbers.push(word);
          } else {
            tibetanDates.push(word);
          }
        }

        // Process Tibetan dates step by step
        tibetanDates.forEach((date) => {
          // Perform date-related operations here
          console.log(`Tibetan Date: ${date}`);
        });

        // Process Tibetan numbers step by step
        tibetanNumbers.forEach((number) => {
          // Perform number-related operations here
          console.log(`Tibetan Number: ${number}`);
        });

      }
      function updateTibetanNumbers(englishStr, tibetanStr) {
    // Function to detect numbers in a string and return them as an array
    
    function detectNumbers(str) {
    return String(str).match(/\d+/g) || [];
    }
    // Function to convert English numbers to Tibetan
    function englishToTibetan(num) {
        const tibetanNumbers = {
            '0': '༠',
            '1': '༡',
            '2': '༢',
            '3': '༣',
            '4': '༤',
            '5': '༥',
            '6': '༦',
            '7': '༧',
            '8': '༨',
            '9': '༩'
        };
        
        return num.split('').map(digit => tibetanNumbers[digit]).join('');
    }

    const englishNumbers = detectNumbers(englishStr);
    const tibetanNumbersCorrected = englishNumbers.map(englishToTibetan);

    // Replace Tibetan numbers with the corrected ones
    const tibetanNumberRegex = /[\u0F20-\u0F29]+/g;
    let index = 0;

    return tibetanStr.replace(tibetanNumberRegex, match => {
        return tibetanNumbersCorrected[index++];
    });
}
    </script>
    <script>
      function dolma(){
        const englishTextFromTextarea1 = document.getElementById('textarea-1').value;
          const tibetanTextFromTextarea2 = document.getElementById('textarea-2').value;

        //const correctedTibetanStr = correctTibetanNumbers(englishTextFromTextarea1, tibetanTextFromTextarea2);
        // Setting the corrected text back to the second textarea
        const correctedTibetanStr = updateTibetanNumbers(englishTextFromTextarea1, tibetanTextFromTextarea2);
        document.getElementById('textarea-2').value = correctedTibetanStr;  
          console.log("sfsdf "+correctedTibetanStr);
      }
    </script>