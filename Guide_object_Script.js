 //David Guides Assistances Site.

//Shorthand to make make typying document.getElementById quicker
//needs a string or HTML obj as Input and assumes the element already exist
//returns the ID of the element as a HTML object type. 
function byid(idname) {
    //String of ID
    var working_ID = "";

    //check if input is a string
    if(typeof(idname) == "string")
    {
        working_ID = idname;
    }else{
        try{
            working_ID = idname.id;
        }
        catch(e)
        {throw new Error("gerr10");}
    }
        
    

    //get the Element 
    var element = document.getElementById(working_ID);

    // throw ID undefind if ID is not found
    if(element == undefined){throw new Error("gerr12");} 

    //Retrun the found element 
    return element;
}


//A function to make a Div that returns its ID as an HTML Object
//Takes the Following args as Required Args: Location: string or HTML OBJ, ID:string
//Takes the Following args as optional class:string, Text:string
makeDiv = function (location, id, class_in, text_in) {

	//Iniazlie a variable that will hold the string that is use to make the Div
	var outputstring = "";

    //validate the input of required Args
    //If the input is missing throw and error
    if (typeof(location) == "undefined") { throw new Error("gerr20"); }
    if (typeof(id) == "undefined") { throw new Error("gerr21"); }


    //make Local vars with strings
    var text = "";
    var class_store = "";

    //Overwrite the default value of the Local value and an input was given 
    if (class_in != undefined) { class_store = class_in; }
    if (text_in != undefined) { text = text_in; }

    //assign a Local variable for the Location the Div is being made. 
    var incertlocation = location;

    //if the input is a string then overright the incertlocation to me an object of based on the ID of the Loaction
    if(typeof (location) == "string"){incertlocation = byid(location);}
    

    //Make the Div The option componets will display but with "" in the value
	outputstring += '<div';
	outputstring += ' id="'+ id +'" ';
	outputstring += ' class="' + class_store + '"';
	outputstring += '>' + text;
    outputstring += '</div>';
	
    //Push the string into the incertlocation to make the new Div
	byid(incertlocation).innerHTML += outputstring;


    //Retun when done by sending back a reference to the Div we made. (HTML Object)
    return byid(id);
}



////---------------------////
//// Main Guide Object  ////

var GuideObj = function (current_page_space, config_file_loc, is_debugmode_flage) {

    //Validate inputs
    //current_page_space
    if (typeof (current_page_space) != "string") { throw new Error("gerr30"); }
    //is_debugmod
    if (typeof (is_debugmode_flage) != "boolean" && typeof (is_debugmode_flage) != undefined) { throw new Error("gerr31"); }

    //Main Page Object variables
    this.name = current_page_space;

    //Main array of all Guide elements on the Page
    this.pageobjects = new Array();

    //---Container Variables---//
    //Container the Guide displays in. 
    this.pagespace = byid(current_page_space);

    //Main Div for the whole heading. 
    //(ID: "guide_heading" Class: "guide_heading")
    this.myheading = undefined;

    //Div for holding the Replay section.
    //(ID:"ReplayCodeBoxDiv" Class: "ReplayCodeBox" )
    this.ReplayCodeBoxDiv = undefined;

    //Div Head for the Guide Heading 
    //(ID:"guide_head_heading" Class: "guide_head_heading" )
    this.guide_head_heading = undefined;

    //fourm for guide selection
    //(ID:"guide_selection_forum" Class: "guide_selection_forum" )
    this.guide_selection_forum = undefined;

    //Input Box for the Replay code
    //(ID:"ReplayCodeBox" Class: "" )
    this.replayinput = undefined;

    //-------------------//


    //---Button Variables---//
    /*--start button--*/
    //(ID:"start_button" Class: "start_button" ) 
    this.start_button = undefined;
    //Value:
    this.start_button_value = "Start this Guide";

    /*--Launch button--*/
    //(ID:"replay_code_submit" Class: "replay_code_submit" ) 
    this.replay_code_submit = undefined;
    //Value:
    this.replay_code_submit_value = "Launch Guide";

    /*--copy button--*/
    //(ID:"copy_button" Class: "copy_button" ) 
    this.copy_button = undefined;
    //Value:
    this.copy_button_value = "Copy Guide";

    /*--Remove button--*/
    //(ID:"" Class: "" )
    //Defined in Element OBj
    //Value:
    this.remove_button_value = "X";


    /*--Reset button--*/
    //Defined in Element OBj
    //Value:
    this.reset_button_value = "Reset";

    /*--Answer buttons--*/
    //Defined in Element OBj
    //Delimiter:
    this.answer_buttons_delimiter = "";

    //----------------------//


    //---General Text Variables---//
    //---------------------------//

    //Text displayed for the lable
    this.replayBox_lable = "Guide Code:";

    //heading Text 
    //this.heading_Text = "Welcome to the 24/7 Support agent Guided assistance Page!";
    this.heading_Text = "";

    //Guide elements for not having an answer. 
    this.no_Answewr = "Thank you for using the Helpdesk Guide System";

    //---------------------------//

    //---User Message Text Variables---//
    //replay code not entered user message
    this.replay_string_missing = "Please enter a Guide Support code";

    //Replay code Missing or improperly formated Guide Name
    this.replay_code_name_missing = "Guide name not entered correctly. Please reenter the guide code.";

    //Replay code Missing or improperly formated Guide version
    this.replay_code_ver_missing = "Guide Verion not found in Guide Code. Please reenter the guide code.";

    //Replay code Missing or improperly formated Path Code
    this.replay_code_path_missing = "Guide code not propely formated. Please reenter the guide code.";

    //Replay Guide Code Verion Unusable
    this.replay_code_ver_unusable = "The Guide code entered is based on a different verion of the guide then currently available. Unfortunately we can not replay this guide code. Please use the guides system again from the beginning."

    //Replay Guide Code Verion Warning
    this.replay_code_ver_warning = "The Guide code entered is based on a different verion of the guide then currently available. You can continue, but the guide may not display correctly."

    //Replay Guide Path Not Valided
    this.replay_code_path_unusable = "The Guide code entered not valid. Please check the code and try again."

    //---------------------------------//



    //-----XML Storage variables-----//

    //location of ConfigXML
    this.config_XML_path = config_file_loc;

    //Location of Error XML
    this.errors_XML_path = null;

    //Location of Guid Lists XML
    this.guide_list_XML_path = null;

    //Location of user messages XML
    this.user_msg_XML_path = null;

    //XML for Configuration file
    this.guide_config_XML = null;


    //XML that has a list of all Thrown error Messages. 
    this.guide_errors_XML = null;


    //XML that lists all Messages to the User that are not apart of the page set or thrown errors.
    this.guide_messages_XML = null;


    //XML for list of Guides and their Locations. 
    //This file is searched against by the context engine to find active guides.
    this.guide_List_XML = null;


    //XML for the Current working Guide
    this.current_Guide_XML = null;

    //-------------------------------//

    //-----configuration variables-----//

    //Global timeout for XML request.  
    this.timout = 2000;

    //Flag for verbos or covert errors. config file over rights this setting. 
    this.is_debugmode = is_debugmode_flage;

    //---------------------------------//

    //-----Replay variables-----//

    //Has the Reply mode been triggered. 
    this.isReplay = false;

    //Parse verion of the guide being viewed
    this.guideVersion = undefined;

    //Parsed ID of the guide being viewed
    this.guideID = undefined;

    //result Replcode currently displayed in Input box. 
    this.replaycode = undefined;

    //Object to hold the parsed Input.
    //Has a function for Parse the replay gide Input  
    this.usableinput = new Parseinput();

    //--------------------------//

    //----Context Engine Variables----//

    //Store the Calling URL passed into system.
    this.calling_URL = undefined;

    //Store when passed or found the Domain
    this.context_domain = undefined;

    //Store when passed or found the Location
    this.context_location = undefined;

    //Store when passed or found the Error
    this.context_error = undefined;

    //Array of found Guids to offer the user
    this.found_guides = new Array();

    //--------------------------------//


    //add event handler to copy button
    this.pagespace.addEventListener("click", this, true);

}

//eventhandler for Heading 
GuideObj.prototype.handleEvent = function (event) {
        if (event.type != "click") { return false }

        try{// if the event is for one of our buttons catch aney errors those buttons functions throw. 

            if (event.target.id == this.copy_button.id) { this.copyToClip(); }
            if (event.target.id == this.start_button.id) { this.findSelGuid(); }
            if (event.target.id == this.replay_code_submit.id) { this.loadreplay(); }

        }//end of try. Catch the errors and Run the error handler. 
        catch (err) {this.error_handler(err, this.is_debugmode);}

}

    ///////////////////////
    //General use methods//
    ///////////////////////


    //find object by name
    GuideObj.prototype.PObj = function (boxid) {

        if (typeof (boxid) != "string") { throw new Error("gerr40"); } // check if Box ID is a String
        var i = 0;

        //loop through the array of objects to try to find teh correct object. 
        while (this.pageobjects[i].name != boxid && i < this.pageobjects.length) {
            i++;
        }
        if (this.pageobjects[i] == undefined) { throw new Error("gerr41");} //throw if object is not found
        return this.pageobjects[i];

    };




//Function to Load XML Asynchronously. Based on the Load with timeout From developer.mozilla.org
//requires the args for URL, Timeout, and CallBack
//Well take anynumber of args after the required
//returns calls the callback on load and sends the Loaded XML and the Non-Required args Back. 
GuideObj.prototype.loadFile = function(sURL, timeout, fCallback /*, argumentToPass1, argumentToPass2, etc. */) {
    //open the HTTP Request into a new Object
    var ReqObj = new XMLHttpRequest();
    //set the object to store its callback 
    ReqObj.callback = fCallback;
    //Slice the first 3 args off and store the rest of the areguments of this function for later use
    ReqObj.arguments = Array.prototype.slice.call(arguments, 3);

    //Open the get request with the Load values
    ReqObj.open("get", sURL, true);

    //set the Timeout setting in the request 
    ReqObj.timeout = timeout;

    //Send the Request
    ReqObj.send(null);

    //set On Load to an aynomus function that triggers when onload event sent. 
    ReqObj.onload = function () {

        //check if the ready state is the state done.
        if (ReqObj.readyState === 4) {

            //If ready stat is done, check if there are any errors.
            if (ReqObj.status === 200) {

                //add the response to the Be of the arguments
                ReqObj.arguments.unshift(ReqObj.responseXML);

                //If all is well send they call the Callback with the stored args
                ReqObj.callback.apply(this, ReqObj.arguments);

            //if all is not well, throw an error 
            } else {
                console.error(ReqObj.statusText);
            }
        }
    };
}




//Error handler for Guide Site.
//takes and error object as an argument and a Bool for debug mode. 
//Debug true will display an alert error to the User. it can be force passed when needed.
//Looks for the error message, a string of a numeric code, in the Error XML
//If the error code is found, It displays the found error else it displays a Defult error.
GuideObj.prototype.error_handler = function (error, debugmode) {
    //Local Variable for Error string.
    var disp_error = "The guide has enountered an error. Please reload the page and try again. If the problem presists, contact the helpdesk for further support.";

    var err_string = "";

    //Local var for Parsed Guide
    var parsed_errors = null;

    //Check if XML is null If not Parse it
    if (this.guide_errors_XML != null && this.guide_errors_XML != undefined) {
        //Parse XML
        parsed_errors = this.guide_errors_XML.getElementsByTagName(error.message);

        //If the results are found load them
        if (parsed_errors[0] != null || parsed_errors[0] != undefined) {
            disp_error = parsed_errors[0].childNodes[0].nodeValue;
        }
    }

    //build the error message display
    err_string = 'Error Message: ' + disp_error;
    err_string += '\n\n Error stack \n' + error.stack;

    //Check Debugmode - We ignore all None True values.
    //If true display a alert.
    //If false, display to console.
    alert(err_string); 
            
        

} 

    /////////////////
    //Guide methods//
    /////////////////


//Function called to activate the Guide
//Takes context Engine variables as paramiters.
//Context Engine variables are not required, if none are entered a default guide list will be displayed. 
//XML load for the Config file is triggered with a default timeout of 2000ms
GuideObj.prototype.activate_guide = function (calling_URL_in, domain_in, location_in, error_in) {
    try {//try for Loading the Guide. Will catch errors and pass them to the error system.

        //store calling_URL_in only if a string has been sent into it.
        if (typeof (calling_URL_in) == "string") { this.calling_URL = calling_URL_in; }

        //store domain_in only if a string has been sent into it.
        if (typeof (domain_in) == "string") { this.context_domain = domain_in; }

        //store location_in only if a string has been sent into it.
        if (typeof (location_in) == "string") { this.context_location = location_in; }

        //store error_in only if a string has been sent into it.
        if (typeof (error_in) == "string") { this.context_error = error_in; }

        //Load the config file to start the guide
        this.loadFile(this.config_XML_path, this.timout, this.xmlLoadHandler, 1, this);

    }
    catch (err) { this.error_handler(err, this.is_debugmode); }
}



//function to parse config file and load guide variables. 
//will only load them if they are found.
//Starts the Load of 3 asycronus XML Loads.
GuideObj.prototype.parse_config_and_load = function () {


    //check if debug mode is defined
    if (this.guide_config_XML.getElementsByTagName("debug_mode")[0].childNodes[0] != null || this.guide_config_XML.getElementsByTagName("debug_mode")[0].childNodes[0] != undefined) {
        //if it is, store it.
        this.is_debugmode = this.guide_config_XML.getElementsByTagName("debug_mode")[0].childNodes[0].nodeValue;
    }


    //check if timeout is defined
    if (this.guide_config_XML.getElementsByTagName("max_timeout")[0].childNodes[0] != null || this.guide_config_XML.getElementsByTagName("max_timeout")[0].childNodes[0] != undefined) {
        //if it is, store it.
        this.timout = this.guide_config_XML.getElementsByTagName("max_timeout")[0].childNodes[0].nodeValue;

    }


    //check if Errors XML location is found
    if (this.guide_config_XML.getElementsByTagName("error_msg")[0].childNodes[0] != null || this.guide_config_XML.getElementsByTagName("error_msg")[0].childNodes[0] != undefined) {
        //If it is, store it and load it
        this.errors_XML_path = this.guide_config_XML.getElementsByTagName("error_msg")[0].childNodes[0].nodeValue;

        //load it
        this.loadFile(this.errors_XML_path, this.timout, this.xmlLoadHandler, 5, this)
    }
    else {
        //If it is not, throw an error.
        throw new Error("gerr50");
    }


    //check if Guide List XML location is found
    if (this.guide_config_XML.getElementsByTagName("guide_list")[0].childNodes[0] != null || this.guide_config_XML.getElementsByTagName("guide_list")[0].childNodes[0] != undefined) {
        //If it is, store it and load it
        this.guide_List_XML = this.guide_config_XML.getElementsByTagName("guide_list")[0].childNodes[0].nodeValue;

        //load it
        this.loadFile(this.guide_List_XML, this.timout, this.xmlLoadHandler, 2, this)
    }
    else {
        //If it is not, throw an error.
        throw new Error("gerr51");
    }
    

    //check if User messages XML location is found!!!!
    if (this.guide_config_XML.getElementsByTagName("user_msg")[0].childNodes[0] != null || this.guide_config_XML.getElementsByTagName("user_msg")[0].childNodes[0] != undefined) {
        //If it is, store it and load it
        alert(this.guide_config_XML.getElementsByTagName("user_msg")[0])
        this.guide_messages_XML = this.guide_config_XML.getElementsByTagName("user_msg")[0].childNodes[0].nodeValue;


        //load it
        this.loadFile(this.guide_messages_XML, this.timout, this.xmlLoadHandler, 6, this)
    }

    //check if heading_text is defined
    if (this.guide_config_XML.getElementsByTagName("heading_text")[0].childNodes[0] != null || this.guide_config_XML.getElementsByTagName("heading_text")[0].childNodes[0] != undefined) {
        //if it is, store it.
        this.heading_Text = this.guide_config_XML.getElementsByTagName("heading_text")[0].childNodes[0].nodeValue;
    }

    //check if replay_box_text is defined
    if (this.guide_config_XML.getElementsByTagName("replay_box_text")[0].childNodes[0] != null || this.guide_config_XML.getElementsByTagName("replay_box_text")[0].childNodes[0] != undefined) {
        //if it is, store it.
        this.replayBox_lable = this.guide_config_XML.getElementsByTagName("replay_box_text")[0].childNodes[0].nodeValue;
    }

    //check if no_answer is defined
    if (this.guide_config_XML.getElementsByTagName("no_answer")[0].childNodes[0] != null || this.guide_config_XML.getElementsByTagName("no_answer")[0].childNodes[0] != undefined) {
        //if it is, store it.
        this.no_Answewr = this.guide_config_XML.getElementsByTagName("no_answer")[0].childNodes[0].nodeValue;
    }

}




    //Primary controler function for the Guide. As XML is Loaded it triggers the next componet for most Guide actions
    //function that is used as the Callback for Asynchronous XML calls.
    //Loadsthe varible sent with the XML response. 
    //once Loaded, It will trigger the Make Guide display
GuideObj.prototype.xmlLoadHandler = function (XML_in, loadID, objref) {
    //Try for XML Loader. This will handle most Program errors. 
    try {

        //Takes the varible sent to the XML request and Load it
        switch (loadID) {

            //If Load ID is 1 Load Configuration Variable       
            case 1:
                objref.guide_config_XML = XML_in;
                objref.parse_config_and_load();
                break;

            //If Load ID is 2 Set the guide_List_XML Var then Run the Make Guide Display      
            case 2:
                objref.guide_List_XML = XML_in;
                objref.make_guide_display();
                break;

            //If Load ID is 3 Set the Current XML and Run the Function to statrt the guide       
            case 3:
                objref.current_Guide_XML = XML_in;
                objref.start_guide();
                break;

            //If Load ID is 4 Set the Current XML and Run the Replay.    
            case 4:
                objref.current_Guide_XML = XML_in;
                objref.replayGuide();
                break;

            //If id is 5, Set guide_errors_XML XML    
            case 5:
                objref.guide_errors_XML = XML_in;
                break;

            //If id is 6, Set guide_messages_XML XML    
            case 6:
                objref.guide_messages_XML = XML_in;
                //ToDo: - Parse and Load user messages
                break;

            //Return false of this is called with a Load ID that is not listed      
            default:
                return false;
        }

    }
    catch (err) { objref.error_handler(err, objref.is_debugmode); }
}


    //Function for Building the display of the guide
    // Will not trigger the Next step in building the guide untill all calls are done.
    //Is called each time a XML load incerts into a varable
    //Will Return False untill all required varable ahve content 
    //calls functions to add Make and display Form. This will disply as
    GuideObj.prototype.make_guide_display = function () {

        //forum Heading
        this.myheading = makeDiv(this.pagespace, "guide_heading", "guide_heading");

        // make a Box to Hold the Guide Helpdesk Code - this will Fload Right
        this.ReplayCodeBoxDiv = makeDiv(this.myheading, "ReplayCodeBoxDiv", "ReplayCodeBox");

        //add the input Box to the Div
        this.ReplayCodeBoxDiv.innerHTML += '<lable> ' + this.replayBox_lable + '<input type = "text" class="ReplayCodeBox" id="ReplayCodeBox"></lable>';

        //add a submitt butt for the Guide Code 
        this.replay_code_submit = makeDiv(this.ReplayCodeBoxDiv, "replay_code_submit", "replay_code_submit", this.replay_code_submit_value);

        //add the replay Code box as a object var for later referance. 
        this.replayinput = byid("ReplayCodeBox");


        //Make the Title box and Display title text 
        this.guide_head_heading = makeDiv(this.myheading, "guide_head_heading", "guide_head_heading", this.heading_Text);



        //Forum creation
        this.myheading.innerHTML += '<form class = "guide_selection_forum" id="guide_selection_forum" >';
        this.myheading.innerHTML += '</form>';

        this.myheading.innerHTML += '<br>';

        //add the start button
        this.start_button = makeDiv(this.myheading,"start_button","start_button",this.start_button_value)

        this.makeform("guide_selection_forum");
        this.myheading.innerHTML += '<br>';

        //make the copy button.
        this.copy_button = makeDiv(this.myheading, "copy_button", "copy_button", this.copy_button_value);

        //hide the copy button.
        byid(this.copy_button.id).setAttribute("style", "display: none");
    }


    //make a form to select what guide to load.
    GuideObj.prototype.makeform = function (location) {
        var guidenames = null;

        //Load the Globle var with the Location of the forum 
        this.guide_selection_forum = byid(location);

        //validate input
        if (typeof this.guide_List_XML === null || typeof this.guide_List_XML === undefined) { throw new Error("gerr80") }

        //initalize a var thats used to check if buttons are made. starts false and is set to ture when a button is made. checked at the end
        var made_buttons = false;

        //Get Guide Names
        guidenames = this.guide_List_XML.getElementsByTagName("guidename");

        //check to make sure that Guide names are found
        if (guidenames === null || guidenames === undefined) { throw new Error("gerr81") }

        //For each Guide Name that is Selectable make a button
        for (var i = 0; i < guidenames.length; i++) {
            if (guidenames[i].getAttribute("is_selectable") == "true") {
                //get values for buttons
                var input_name = guidenames[i].childNodes[0].nodeValue;
                var input_target = guidenames[i].getAttribute("guideloc");
                var input_guidID = guidenames[i].getAttribute("guideid");

                //validate data from XML file
                if (input_guidID == undefined) { throw new Error("gerr82") }
                if (input_name == undefined) { throw new Error("gerr83") }
                if (input_target == undefined) { throw new Error("gerr84") }

                //build buttons, add custome data for Guide target.
                this.guide_selection_forum.innerHTML += input_name + ': <input type = "radio" name="guideselect" id="guideselect_' + input_guidID + '" data-guidetarget="' + input_target + '">';
                this.guide_selection_forum.innerHTML += "<br>";

                //set made_buttons = ture as a last check to 
                made_buttons = true;
            }
        }
        //last check to ensure that buttons are made
        if (made_buttons == false) { throw new Error("gerr85"); }
    };


//Look at the form to see what was selected. If something was selected, Load that Guide
//If nothing was seleted report an message. 
//this doesnt not check for speical cases. 
//If only one guide is found with the Context Engine its assumed the context Engine set it as the default.
    GuideObj.prototype.findSelGuid = function () {

        var found_Guide = undefined; //Place to hold string for the found Guide
        var selected_found = false; //Bool used as a Trigger for valitaion

        //get guide select Buttons
        var guide_select_buttons = document.getElementsByName("guideselect");


        //look through list of buttons  and look for what is pressed
        for (var i = 0; i < guide_select_buttons.length; i++) {

            //if current button is selected store it and mark that a button was found. 
            if (guide_select_buttons[i].checked == true) {


                //Check if XML has content in it before adding that content to the found_Guide var
                if (guide_select_buttons[i].getAttribute("data-guidetarget") != undefined && guide_select_buttons[i].getAttribute("data-guidetarget") != "") {
                    //Set the found guide Var to the String of the Destination found in the XML
                    found_Guide = guide_select_buttons[i].getAttribute("data-guidetarget");
                }
            }
        }
        //If found_Guide has no contents, assume it not selected and return a user error
        if (found_Guide == undefined) { alert("Please select a Guide."); return false }

        //call the Load function to get the XML content for the Guide
        //This will Trigger Start_Guide() with the xmlLoadHandler. (Load ID 3)
        this.loadFile(found_Guide, this.timout, this.xmlLoadHandler, 3, this)

    };


//Once the XML is Loaded for the Current Guide - Start the Guide
//This calls the Guide element Object to make the Guide Itself.
//Will also Hide buttons that should not be use after the Guide starts
    GuideObj.prototype.start_guide = function () {

        var list_of_ele = null; //holder for the list of elements
        var firstelement = null; //holder for the String naming the first element in the Guide.

        //Update the Guide Info variables
        this.getGuideInfo();

        //Parses the Guide XML for all Elements and loads them. 
        list_of_ele = this.current_Guide_XML.getElementsByTagName('element');

        //Load the firstelement with the first Node in the list. 
        firstelement = list_of_ele[0].getAttribute('elname');

        //Start the guide by its first element 
        this.make_guide_ele(firstelement);

        //hide the start button once the its been used so it can not me triggered again. 
        byid("start_button").setAttribute("style", "display: none");

        //Hide the Launch button for the Guide Repete function. 
        byid("replay_code_submit").setAttribute("style", "display: none");

        //Display the Copy Button
        byid(this.copy_button.id).setAttribute("style", "display: initial");

    };


    //make a guide element
    GuideObj.prototype.make_guide_ele = function (next_element) {

        // makes a new box object and adds it to the Page array
        this.pageobjects.push(new Guide_ele(this, this.pageobjects.length, next_element));

        //update the replay codewhen we make a new box
        this.makeReplayCode()

    };



//look and the currentguide XML and find the Guidename and Find Guide Name and Guid Version
//Assumes Current Guide XML has already been Loaded. 
//Update the Guide object with the found Data.
    GuideObj.prototype.getGuideInfo = function () {
        //initialize a Local variable to holde the results of parsing for the Guide Name
        var guidename = undefined;

        //Pase the current guide XML for the guide name and add it to the local var
        guidename = this.current_Guide_XML.getElementsByTagName('guidename');

        //Check if we have data for the guide name and throw an error if its undefined
        if (guidename == undefined) { throw new Error("gerr100"); }


        //parse the Local for the guide ID atribute and add the Result to object level Varible
        this.guideID = guidename[0].getAttribute('guideid');

        //check if object level Varible Guide ID variable is no longer "undefind" throw an error if it is
        if (this.guideID === undefined) { throw new Error("gerr101"); }


        //parse the Local for the guide version atribute and add the Result to object level Varible 
        this.guideVersion = guidename[0].getAttribute("version");

        //check if object level Varible Guide version variable is no longer "undefind" throw an error if it is
        if (this.guideVersion == undefined) { throw new Error("gerr102"); }
    };



//update the Guide Replay Box.
//Will only Trigger if the Guide is not in replay Mode
//It will output to the Locked Input Box for Replay Code.
    GuideObj.prototype.makeReplayCode = function () {
        //Check if the guide is in replay mode, If yes, return False
        if (this.isReplay === true) { return false; }

        //local variable to hold the string out put to post to the Input box
        var dispStr = "";

        //intize it with ID of the Guide
        dispStr += this.guideID;

        //add the verion of the Guide.
        dispStr += this.guideVersion;

        //Loop through the List of Page Objects in order. 
        //For Each, Look at the answer Index and add it to the Out Put String
        for (var s = 0; s < this.pageobjects.length; s++) {
            //if the value is undefind it means it's the end of the current Tree - Do not add those values
            if (this.pageobjects[s].answerselected.index_of_ans != undefined) { dispStr += this.pageobjects[s].answerselected.index_of_ans; }
        }

        //Set the value of the replay Input Box = to the Temp String. 
        byid("ReplayCodeBox").value = dispStr;

        //Update the replay code
        this.replaycode =dispStr;
        
    };


//Reply a guide that a user has already viewed. 
//Will not be accessible once a guide has been started. 
//Requires a Guide reply code in the input box.
    GuideObj.prototype.loadreplay = function () {
        //local for holding parsing success/falure
        var parse_confirm = "";

        //local var for holding the guide name elements. 
        var guidenames = undefined;

        //Check that Reply code input box has a string in it.
        if (typeof (this.replayinput.value) != "string") {
            alert(this.replay_string_missing);
            return false;
        }

        //make a object var
        this.usableinput.string_to_parse = byid("ReplayCodeBox").value;

        //Call parse methode of the parseinput object. Store success/falure
        parse_confirm = this.usableinput.parse();

        //case the parseparse_confirm for errors and display a message if we get one
        switch (parse_confirm) {
            case "empty":
                alert(this.replay_string_missing);
                return false;

            case "guidename":
                alert(this.replay_code_name_missing);
                return false;

            case "guideVer":
                alert(this.replay_code_ver_missing);
                return false;

            case "guidecode":
                alert(this.replay_code_path_missing);
                return false;

            default:
                break;
        }

        //Load the elements of the guide names 
        guidenames = this.guide_List_XML.getElementsByTagName("guidename");

        //loop though guide names elements to find the matching Attibute. 
        for (var i = 0; i < guidenames.length; i++) {
            if (guidenames[i].getAttribute("guideid").toLowerCase() == this.usableinput.guidename) {
                //request the load of the current XML
                this.loadFile(guidenames[i].getAttribute("guideloc"), this.timout, this.xmlLoadHandler, 4, this)
                return true;
            }
        }

        //report a message that the Guide ID was not correct
        alert(this.replay_code_name_missing);
        return false;

    };

    
    //Once the XML is Loaded start the Replay
    //Requires Current guide XML be Loaded
    //Will Replay the Guide the based on the guide Code
    GuideObj.prototype.replayGuide = function () {
        //Flage we are doing a Replay
        this.isReplay = true;

        //Check the Version
        if(this.check_replay_ver() == false){return false}

        //start the guide
        if(this.start_replay() == false){return false}

        //make guide by path
        if(this.replay_path() == false){return false}
    };



    //Function to confirm all parces guide code is has a usable verion.
    //Requires current guide be loaded.
    //Confrims replay code can be used. 
    GuideObj.prototype.check_replay_ver = function () {

        //local to hold parsed Guidename
        var parsed_guidename = undefined;


        //Local var for parces guide Version
        var parsed_gude_ver = undefined;

        //Local Var for confriming decmal is found
        var dec_found = false;

        //Check if Current Guide XML is empty (if it is Thow an error)
        if (this.current_Guide_XML == null || this.current_Guide_XML == undefined) { throw new Error("gerr140"); }

        //Parse Guide name
        parsed_guidename = this.current_Guide_XML.getElementsByTagName("guidename");

        //Get the Guide version
        parsed_gude_ver = parsed_guidename[0].getAttribute("version");

        //Check Guide Version, If verion is Bad Send user a messsage.
        //let user try if verion difference is only a decmal difference. (try with a warning)
        for (i = 0; i < this.usableinput.guideVer.length; i++) {
            //check if each char in the string is the same until the . is hit
            if (this.usableinput.guideVer[i] != parsed_gude_ver[i] && dec_found == false) {
                //send user a message that the version is bad and return false on function
                alert(this.replay_code_ver_unusable);
                return false;
            }

            //when . is found set the flag 
            if (this.usableinput.guideVer[i] == parsed_gude_ver[i] && this.usableinput.guideVer[i] == ".") { dec_found = true; }

            //Check the last chars if they are not the same sed a Warning. 
            if (this.usableinput.guideVer[i] != parsed_gude_ver[i] && dec_found == true) { alert(this.replay_code_ver_warning); }

        }

        return true;
    };


    //make the first element and adujust the display to account for the guide starting
    //requires the Replay code version and ID be valid
    //Returns True once the Guide has started
    GuideObj.prototype.start_replay = function () {

        //Local variable to hold the Parsed XML.
        var parsedXML = undefined;

        //local for holding the first element 
        var firstelement = undefined;

        //Parse the Current Guide XML for the elements and Load the Local
        parsedXML = this.current_Guide_XML.getElementsByTagName('element');

        //Load the firstelement with the first Node in the list. 
        firstelement = parsedXML[0].getAttribute('elname');

        //Start the guide by its first element 
        this.make_guide_ele(firstelement);

        //hide the start button once the its been used so it can not me triggered again. 
        byid("start_button").setAttribute("style", "display: none");

        //Hide the Launch button for the Guide Repete function. 
        byid("replay_code_submit").setAttribute("style", "display: none");

        //Display the Copy button
        byid(this.copy_button.id).setAttribute("style", "display: initial");


        return true;
    };


    //make all remaining elements
    //requires the first element to be made
    // workes by calling the Clicked function from the work element
    GuideObj.prototype.replay_path = function () {
        //local variable to hold the working element.
        var working_ele = undefined;


        //for each element of the guide code string do the following:
        //get and store the HTML object that matches the index of the current string index to number.
        //Run the answer selected function passing the HTML object as the selected target.
        //If an element is not found, Throw an error that the Guide code is not correct and Reload the Page.
        for (t = 0; t < this.usableinput.guidecode.length; t++) {
            //current index
            var v = Number(this.usableinput.guidecode[t]);

            //check if answer button can be found
            if (v + 1 > this.pageobjects[t].answerbuttons.length) {
                //send user a message that the Path is bad and return false on function
                alert(this.replay_code_path_unusable);
                location.reload();
            }

            //Find the Next element 
            working_ele = this.pageobjects[t].answerbuttons[v];

            //call the next element to be built. 
            this.pageobjects[t].answerClicked(working_ele);
        }

        return true;
    };

    



    //Function to Remove a box from the display.
    //Takes the element that is being removed as a HTML object
    //Removes the found element and the element above it, then Re-makes that element above. 
    //If it is at the Top, it will reset the Display as if the Guide was not selected yet.
    //Checks beeing at the top by the index of the page Pag object. 
    GuideObj.prototype.remove_box = function (eleToRemove) {
        //find the old box
        var old_box = eleToRemove;

        //remove old box            
        var oldelement = byid(old_box.name);
        oldelement.parentNode.removeChild(oldelement);

        //delete current object
        this.pageobjects.splice(old_box.myindex, 1)

        //if this is not the first element remove prevous element and make it again.
        if (old_box.myindex != 0) {
            //find the new box name
            var newend = this.pageobjects[old_box.myindex - 1].name;

            //remove new box
            var newelement = byid(newend);
            newelement.parentNode.removeChild(newelement);

            //Delete old object
            this.pageobjects.splice(old_box.myindex - 1, 1)

            //remake new end
            this.make_guide_ele(newend);
        } else {

            //show the start button 
            byid("start_button").setAttribute("style", "display: initial");

            //Show the Guide Repete Button
            byid("replay_code_submit").setAttribute("style", "display: initial");

            //Hide the copy button:
            byid(this.copy_button.id).setAttribute("style", "display: none");

            //Empty the Reply box when we Delet the Last Box
            byid("ReplayCodeBox").value = "";
        }
    };


    //button to copy to clipboard function
    //this function will does not currently 
    GuideObj.prototype.copyToClip = function () {
            var out_put_text = ""

            for (var i = 0; i < this.pageobjects.length; i++) {
                if (this.pageobjects[i].isdeleted != true) {
                    //get the question of the element and add it to the copy string
                    out_put_text += "Question: " + this.pageobjects[i].question + "<br>";

                    //get the Answer element and add it to the copy
                    if (this.pageobjects[i].answerselected.id != undefined) {
                        out_put_text += "Answer:  " + byid(this.pageobjects[i].answerselected.id).innerHTML + "  ";
                    }
                    out_put_text += "<br><br>";
                }
            }

            //Open a window with to display the copy window
            var copy_window = window.open("", "Copy to clipboard: Ctrl+C", "width=400,height=400");

            //load the window with the text of the copy.
            copy_window.document.write('<p>' + out_put_text + '</p>');
    };
    


 //// Main Guide Object  ////
////---------------------////


////-----------------------////
//// Guide Element Object  ////

//Guide element object
    var Guide_ele = function (mainPage_object_in, arrayindex, my_element_name_in) {

        //assign object variables 
        this.name = my_element_name_in; //this objects name and This elements name in XML	

        this.myindex = arrayindex; //My Place in Page list array

        this.classname = "guide_element"; //class use to define this type of object

        //Referance to the main page object
        this.mainPage_object = mainPage_object_in;

        //---Container Variables---//

        //Div for the Guide element to display its content.
        //(ID: this.name Class: "guide_element") 
        this.guide_element = undefined;

        //Div that holds this elements question.
        //(ID:this.name + '_question_space' Class: this.classname + '_qspace')
        this.questionSpace = undefined;

        //Div to seperat the space that holds the answers.
        //(ID:this.name + '_aswer_space' Class: this.classname + '_aswer_space') 
        this.aswerSpace = undefined;

        //-------------------------//


        //---Button Variables---//
        /*--Remove button--*/
        //(ID:"" Class: "remove_button" )
        this.remove_button = undefined;


        /*--Reset button--*/
        //(ID:"this.name + '_reset_button" Class: "reset_button" )
        this.reset_button = undefined;

        /*--Answer buttons--*/
        //(ID:this.name + '_abutton' + i Class: this.classname + '_answerbutton" [And] this.classname + '_answerbutton_selected')
        this.answerbuttons = new Array(); 


    //----------------------//


        //object to hold the results of a selected anwser 
        this.answerselected = {
            id: undefined,
            answer_Text: undefined,
            index_of_ans: undefined
        };


        this.question = "";


        this.isdeleted = false;


        //populate this.question with the getquestion
        this.question = this.getquestion("question");

        // call the function to make the frame of this guide element display
        this.make_guide_ele_disp();

        //Assign the event handler for the all buttons. The event handler is tide to the box overall frame 
        this.guide_element.addEventListener("click", this, true);


        //Load the Question to the question Frame
        this.questionSpace.innerHTML += this.question;

        //Run the make Answers function
        this.makeAnswerbuttons();

    }


        //function to clean this object when answer is selected 
    Guide_ele.prototype.handleEvent = function (event) {
        try{//try for the main even object. this is this is the function tyaht returns the errors. 

            //only accept click events 
            if (event.type != "click") { return false }

            //check if what was clicked is an answer button - if it was, call the function for handling making the next element. 
            if (event.target.className == this.classname + '_answerbutton') { this.answerClicked(event.target); }

            //check if what was clicked is a remove button - if it was, call the remove function of the main page object this  object
            if (event.target.className == this.remove_button.className) { this.mainPage_object.remove_box(this); }

            //check if what was clicked is a reset button - if it was, reload the Page
            if (event.target.className == this.reset_button.className) { location.reload(); }
    }
    catch (err) {this.error_handler(err, this.is_debugmode);}
}


Guide_ele.prototype.make_guide_ele_disp = function () {

    //make the main box
    this.guide_element = makeDiv(this.mainPage_object.pagespace, this.name, this.classname);

    //make and draw the remove button
    this.remove_button = makeDiv(this.guide_element,this.name + '_remove_button',"remove_button",this.mainPage_object.remove_button_value)

    //make and draw the Reset button 
    this.reset_button = makeDiv(this.guide_element,this.name + '_reset_button',"reset_button",this.mainPage_object.reset_button_value)
    

    //make Question Space of the Box
    this.questionSpace = makeDiv(this.guide_element, this.name + '_question_space', this.classname + '_qspace',this.question);

    //separate the question and answer spaces
    this.guide_element.innerHTML += '<br>';

    //Make the Answer Space of the Box
    this.aswerSpace = makeDiv(this.guide_element, this.name + '_aswer_space', this.classname + '_aswer_space');

}


//parse XML for information
//get Question text from XML
Guide_ele.prototype.getquestion = function (ele_to_find) {

    //Load a Temp Var with the Parsed Result of looking through the current XML for element to Search for. 
    var x = this.mainPage_object.current_Guide_XML.getElementsByTagName(ele_to_find);

    //look through result XML for this element
    for (var i = 0; i < x.length; i++) {
        //Check if the current element has teh same name as this.name
        if (x[i].parentNode.getAttribute('elname') == this.name) {
            //if the current node is apart of the this.name
            return x[i].childNodes[0].nodeValue;
        }
    }

}


//add buttons to the Answer Space
Guide_ele.prototype.makeAnswerbuttons = function () {

    //Get the Current Loaded XML from the Main Page Object. Parse it for answers and Load it in to a Temp Var
    var x = this.mainPage_object.current_Guide_XML.getElementsByTagName('answer');

    //Look through the list of answers to find the answers for this element.
    for (var i = 0; i < x.length; i++) {

        //Look at each anwser element and see if it belongs to this element. If it does, make the button for it
        if (x[i].parentNode.getAttribute('elname') == this.name) {

            //Load the answer Text into a temp var
            var answertext = x[i].childNodes[0].nodeValue;

            //Load the target for the next element from into a temp Var
            var answertarget = x[i].getAttribute('atarget')

            //make a temp Var for the name of the button
            var mydivid = this.name + '_abutton' + i;

            //make the button with the loaded temp vars
            this.answerbuttons.push(makeDiv(this.aswerSpace, mydivid, this.classname + '_answerbutton', answertext));

            //add the atarget to the button for use when seleted. 
            this.answerbuttons[this.answerbuttons.length - 1].setAttribute("data-atarget", answertarget);

            //make the questions aline verticely 
            byid(this.aswerSpace).innerHTML += this.mainPage_object.answer_buttons_delimiter;
        }
    }
    //if the element has no Answers then display the end info in the Answer section 
    if (this.answerbuttons.length == 0) {
        byid(this.aswerSpace).innerHTML += this.mainPage_object.no_Answewr;
    }

}


Guide_ele.prototype.answerClicked = function (target) {
    //make close Box disappear
    byid(this.remove_button.id).setAttribute("style", "display: none");

    //Make the Reset button disappear
    byid(this.reset_button.id).setAttribute("style", "display: none");

    //change the class for the clicked button so we can make it look different
    byid(target).className = this.classname + "_answerbutton_selected";


    //go though the list of answer boxes and make all none clicked disappear
    //Look for the ID of the Selected answer and store it. 
    for (var i = 0; i < this.answerbuttons.length; i++) {
        //local for the current button element
        var current_ele = byid(this.answerbuttons[i].id)

        //Once we find the answer selected store its ID
        if (current_ele.className == this.classname + "_answerbutton_selected") {
            this.answerselected.index_of_ans = i;

        }
        //For everything that is not teh answer seleted set its display to none
        else {
            current_ele.setAttribute("style", "display: none");
        }
    }

    //put the name of the answer selected in the object
    this.answerselected.id = byid(target).id;
    this.answerselected.answer_Text = byid(target).innerHTML;


    //Trigger the Creation of the Next element
    this.mainPage_object.make_guide_ele(byid(target).getAttribute('data-atarget'));


}


//// Guide Element Object  ////
////-----------------------////


/// Replay Guide object///
///--------------------///

var Parseinput = function () {
    //guide var to hold the starting string
    this.string_to_parse = "";
    //guide var to hold the Parsed Guide name.
    this.guidename = "";
    //guide var to hold Parsed Guide Version.
    this.guideVer = "";
    //guide Var to hold Parsed Guide Code.
    this.guidecode = "";
}


//Parse input box. 
//First 2 are guide name
//Next find the . One after the. is the end of the version.
//All other numbers are the guide path.
//Will error out if any part is missing or not the format.
Parseinput.prototype.parse = function () {
    //local var to hold position of the . in the str
    var decpos = -1;

    //Check if input box has provided any content
    if (this.string_to_parse == undefined || this.string_to_parse == "") { return "empty"; }


    //Load the Guide name
    this.guidename = this.string_to_parse.slice(0, 2);

    //make guide name nto case sensitive 
    this.guidename = this.guidename.toLowerCase();

    //if Check if the guide name parse failed, return with just the name of the parse that failed. 
    if (this.guidename == undefined || this.guidename == "" || this.guidename.length != 2) { return "guidename"; }

    //update the string to remove the Guide name
    this.string_to_parse = this.string_to_parse.slice(2);

    //get the position of the . in the str
    decpos = this.string_to_parse.indexOf('.');

    //Load the guide version
    this.guideVer = this.string_to_parse.slice(0, decpos + 2);

    //if Check if the guide version parse failed, return with just the name of the parse that failed.
    if (this.guideVer == undefined || this.guideVer == "" || decpos == -1 || this.guideVer.length < 3) { return "guideVer"; }

    //update the string to remove the Guide Version.
    this.guidecode = this.string_to_parse.slice(decpos + 2);

    

    //Check that the remaining string is a number. If it is not, return with just the name of the parse that failed.
    if (this.guidecode == undefined || isNaN(this.guidecode) == true) { return "guidecode";}

    //at the end return True for success. 
    return true;
};

/// Replay Guide object///
///--------------------///














