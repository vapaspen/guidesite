//David Guides Assistances Site.

//Shorthand to make make typying document.getElementById quicker
//needs a string as Input and assumes the element already exist
//returns the ID of the element as a HTML object type. 
function byid(idname) {


    if(typeof(idname) != "string"){throw "byID Error. Not type String";}//check if input is a string
    var element = document.getElementById(idname);

    if(element == undefined){throw idname + " ID undefined";} // throw ID undefind if ID is not found
    return element;
}





//Function to Load XML Asynchronously. Based on the Load with timeout From developer.mozilla.org
//requires the args for URL, Timeout, and CallBack
//Well take anynumber of args after the required
//returns calls the callback on load and sends the Loaded XML and the Non-Required args Back. 
function loadFile(sURL, timeout, fCallback /*, argumentToPass1, argumentToPass2, etc. */) {
    //open the HTTP Request into a new Object
    var ReqObj = new XMLHttpRequest();

    //set the Timeout setting in the request 
    ReqObj.timeout = timeout;

    //set the object to store its callback 
    ReqObj.callback = fCallback;

    //Slice the first 3 args off and store the rest of the areguments of this function for later use
    ReqObj.arguments = Array.prototype.slice.call(arguments, 3);

    //Open the get request with the Load values
    ReqObj.open("get", sURL, true);

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



////---------------------////
//// Main Guide Object  ////

var GuideObj = function (current_page_space, xml_stub, is_debugmode_flage) {

    //Validate inputs
    //current_page_space
    if (typeof (current_page_space) != "string") { throw "current_page_space args Not type String"; }
    //is_debugmod
    if (typeof (is_debugmode_flage) != "boolean" && typeof (is_debugmode_flage) != undefined) { throw "is_debugmode args not valid type" }

    //Main Page Object variables
    this.name = current_page_space;

    this.pageobjects = new Array();

    this.pagespace = byid(current_page_space);

    this.buttonclass = "mainbox";

    this.timout = 2000;

    this.guideheading = "guide_heading";
    this.currentGuideXML = null;
    this.guideListXML = null;
    this.guideConfig = null;

    this.is_debugmode = is_debugmode_flage;

    this.guidelistXMLLoc = xml_stub;

    //add event handler to copy button
    this.pagespace.addEventListener("click", this, true);

}

//eventhandler for Heading 
GuideObj.prototype.handleEvent = function (event) {
        if (event.type != "click") { return false }

        try{// if the event is for one of our buttons catch aney errors those buttons functions throw. 

            if (event.target.id == "copybutton") { this.copyToClip() }
            if (event.target.id == "start_button") { this.findSelGuid() }

        }//end of try. Catch the errors and Run the error handler. 
        catch (err) {errhandler(err, this.is_debugmode);}

}

    ///////////////////////
    //General use methods//
    ///////////////////////

    //find objects by index
    GuideObj.prototype.PObj = function (indexin) {

        //check input 
        if (typeof (indexin) != 'number') { throw "indexin args Not type Number" } // check if indexin is a number
        if (this.pageobjects[indexin] == undefined) { throw "Page Object not found by Index" } //throw if item is not found

        //retun the found object
        return this.pageobjects[indexin];

    };



    //find object by name
    GuideObj.prototype.PObj = function (boxid) {

        if (typeof (boxid) != "string") { throw "indexin args Not type String" } // check if Box ID is a String
        var i = 0;

        //loop through the array of objects to try to find teh correct object. 
        while (this.pageobjects[i].name != boxid && i < this.pageobjects.length) {
            i++;
        }
        if (this.pageobjects[i] == undefined) { throw "Page Object not found by Index"} //throw if object is not found
        return this.pageobjects[i];

    };


    /////////////////
    //Guide methods//
    /////////////////


    //Function called to activate the Guide
    //Loads the XML for the Guide including the XML for the Settings. 
    //XML is triggered Asynchronously with a Timeout at the start.
    //all XML request use the next function as a Call back
    GuideObj.prototype.active_guide = function () {
        try {//try for Loading the Guide. Will catch errors and pass them to the error system.

            //Load guide for XML list with a timeout loaded from the config file.
            loadFile(this.guidelistXMLLoc, this.timout, this.xmlLoadHandler, 2, this)
            
        }
        catch (err) { errhandler(err, this.is_debugmode); }
    }



    //function that is used as the Callback for Asynchronous XML calls.
    //Loadsthe varible sent with the XML response. 
    //once Loaded, It will trigger the Make Guide display
    GuideObj.prototype.xmlLoadHandler = function (XML_in, loadID, objref) {

        //Takes the varible sent to the XML request and Load it
        switch (loadID) {

            //If Load ID is 1 Load Configuration Variable 
            case 1:
                objref.guideConfig = XML_in;
                //ToDo: - Parse and Load Config XML
                break;

            //If Load ID is 2 Set the guideListXML Var then Run the Make Guide Display
            case 2:
                objref.guideListXML = XML_in;
                objref.make_guide_display();
                break;

            //If Load ID is 3 Set the Current XML and Run the Function to statrt the guide 
            case 3:
                objref.currentGuideXML = XML_in;
                objref.start_guide();
                break;

            //Return false of this is called with a Load ID that is not listed
            default:
                return false;
        }


    }


    //Function for Building the display of the guide
    // Will not trigger the Next step in building the guide untill all calls are done.
    //Is called each time a XML load incerts into a varable
    //Will Return False untill all required varable ahve content 
    //calls functions to add Make and display Form. This will disply as
    GuideObj.prototype.make_guide_display = function () {




        //forum Heading
        this.pagespace.innerHTML += '<div class =' + this.guideheading + ' id=' + this.guideheading + ' >';
        this.pagespace.innerHTML += '</div>';

        //store the guide forum for a moment
        var myheading = byid(this.guideheading);

        // make a Box to Hold the Guide Helpdesk Code - this will Fload Right
        myheading.innerHTML += '<div class="ReplayCodeBox" id="ReplayCodeBoxDiv"></div>';

        //Load Div in to a temp var for repeated use
        var ReplayCodeBoxDiv = byid("ReplayCodeBoxDiv");

        //add the input Box to the Div
        ReplayCodeBoxDiv.innerHTML += '<lable> Guide Code:<input type = "text" class="ReplayCodeBox" id="ReplayCodeBox"></lable>';

        //add a submitt butt for the Guide Code
        ReplayCodeBoxDiv.innerHTML += '<input type="button" id="ReplayCode_submit" value="Launch Guide">';


        //Display title
        myheading.innerHTML += '<div class = "guide_head_heading">Welcome to the 24/7 Support agent Guided assistance Page!<div>';

        //Forum creation
        myheading.innerHTML += '<form class = "guide_selection_forum" id="guide_selection_forum" >';
        myheading.innerHTML += '</form>';
        myheading.innerHTML += '<br>';

        this.add_start_button();
        this.makeform("guide_selection_forum");
        this.pagespace.innerHTML += '<input type="button" class="copybutton" id="copybutton" value="copy guide"></input>';


    }


    //make a form to select what guide to load.
    GuideObj.prototype.makeform = function (location) {
        var guidenames = null;

        //validate input
        if (typeof location != "string") { throw "Cant make Guide select buttons, location not string" }
        if (typeof this.guideListXML === null || typeof this.guideListXML === undefined) { throw "Cant make Guide select buttons, guideListXML empty" }

        //initalize a var thats used to check if buttons are made. starts false and is set to ture when a button is made. checked at the end
        var made_buttons = false;

        //get the form
        var myform = byid(location);

        //Get Guide Names
        guidenames = this.guideListXML.getElementsByTagName("guidename");

        //check to make sure that Guide names are found
        if (guidenames === null || guidenames === undefined) { throw "Cant make Guide select buttons, guidenames empty" }

        //For each Guide Name that is Selectable make a button
        for (var i = 0; i < guidenames.length; i++) {
            if (guidenames[i].getAttribute("is_selectable") == "true") {
                //get values for buttons
                var input_name = guidenames[i].childNodes[0].nodeValue;
                var input_target = guidenames[i].getAttribute("guideloc");
                var input_guidID = guidenames[i].getAttribute("guideid");

                //validate data from XML file
                if (input_guidID == undefined) { throw "XML in Guide Names List not formatted Correctly. Guide ID is not found." }
                if (input_name == undefined) { throw "XML in Guide Names List not formated Correctly. Guide of ID: " + input_guidID + " is missing NodeValue"  }
                if (input_target == undefined) { throw "XML in Guide Names List not formated Correctly. Guide of ID: " + input_guidID + " is missing Guideloc" }

                //build buttons, add custome data for Guide target.
                myform.innerHTML += input_name + ': <input type = "radio" name="guideselect" id="guideselect_' + input_guidID + '" data-guidetarget="' + input_target + '">';
                myform.innerHTML += "<br>";

                //set made_buttons = ture as a last check to 
                made_buttons = true;
            }
        }

        //last check to ensure that buttons are made
        if (made_buttons == false) { throw "No Buttons were Made." }

    };



    //add the start button
    GuideObj.prototype.add_start_button = function () {

        //Find the Heading
        var myheading = byid(this.guideheading); //(throws undefind)
        // add button to start guide
        myheading.innerHTML += '<input id="start_button" type="button" value= "Start this Guide"></input>';
        
    };



//Look at the form to see what was selected. If something was selected, Load that Guide
//If nothing was seleted report an message. 
//this doesnt not check for speical cases. 
//If only one guide is found with the Context Engine its assumed the context Engine set it as the default.
GuideObj.prototype.findSelGuid = function(){
        var found_Guide = undefined; //Place to hold string for the found Guide
        var selected_found = false; //Bool used as a Trigger for valitaion

            //get guide select Buttons
            var guide_select_buttons = document.getElementsByName("guideselect");


            //look through list of buttons  and look for what is pressed
            for (var i = 0; i < guide_select_buttons.length; i++) {

                //if current button is selected store it and mark that a button was found. 
                if (guide_select_buttons[i].checked == true) {
                    
                    
                    //Check if XML has content in it before adding that content to the found_Guide var
                    if (guide_select_buttons[i].getAttribute("data-guidetarget") != undefined && guide_select_buttons[i].getAttribute("data-guidetarget") != ""){ 
                    //Set the found guide Var to the String of the Destination found in the XML
                        found_Guide = guide_select_buttons[i].getAttribute("data-guidetarget");
                    }
                }
            }
            //If found_Guide has no contents, assume it not selected and return a user error
            if(found_Guide == undefined) { alert("Please select a Guide."); return false}

            //call the Load function to get the XML content for the Guide
            //THis will Trigger Start_Guide() with the xmlLoadHandler. (Load ID 3)
            loadFile(found_Guide, this.timout, this.xmlLoadHandler, 3, this)

};


//Once the XML is Loaded for the Current Guide - Start the Guide
//This calls the Guide element Object to make the Guide Itself.
//Will also Hide buttons that should not be use after the Guide starts
GuideObj.prototype.start_guide = function () {
        var list_of_ele = null; //holder for the list of elements
        var firstelement = null; //holder for teh String naming the first element in the Guide.

            //Parses the Guide XML for all Elements and loads them. 
            list_of_ele = this.currentGuideXML.getElementsByTagName('element');

            //Load the firstelement with the first Node in the list. 
            firstelement = list_of_ele[0].getAttribute('elname');

            //Start the guide by its first element 
            this.make_guide_ele(firstelement);

            //hide the start button once the its been used so it can not me triggered again. 
            byid("start_button").setAttribute("style", "display: none");

            //Hide the Launch button for the Guide Repete function. 
            byid("ReplayCode_submit").setAttribute("style", "display: none");

            //Disable the Guide Code Input Box for Input
            byid("ReplayCodeBox").disabled = true;

};


    //make a guide element
    GuideObj.prototype.make_guide_ele = function (next_element) {

        // makes a new box object and adds it to the Page array
        this.pageobjects.push(new Guide_ele(this, this.pageobjects.length, this.buttonclass, next_element));

        //add an if statment to check if the Guide started By the replay tool to the start button
        //If it was started by the replay button

    };



    //Remove the box
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
            byid("ReplayCode_submit").setAttribute("style", "display: initial");

            //enable the guide Input box for use. 
             byid("ReplayCodeBox").disabled = false;

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
                    if (this.pageobjects[i].answerselected[1] != undefined) {
                        out_put_text += "Answer:  " + this.pageobjects[i].answerselected[1].trim() + "  ";
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
    var Guide_ele = function (mainPage_object_in, arrayindex, classin, my_element_name_in) {

        //assign object variables 
        this.name = my_element_name_in; //this objects name and This elements name in XML	

        this.mainPage_object = mainPage_object_in; //main Page reference

        this.myindex = arrayindex; //My Place in Page list array

        this.classname = classin; //class use to define this type of object

        this.answerbuttons = new Array(); // List of answer buttons
        this.answerselected = new Array(); //[0] is ID [1] is answer Text
        this.defultNoAnswewr = "Thank you for using the Helpdesk Guide System";

        this.question = "";

        this.bbox = undefined;
        this.questionSpace = undefined;
        this.aswerSpace = undefined;

        this.isdeleted = false;


        //populate this.question with the getquestion
        this.question = this.getquestion("question");

        // call the function to make the frame of this guide element display
        this.make_guide_ele_disp();

        //Assign the event handler for the all buttons. The event handler is tide to the box overall frame 
        this.bbox.addEventListener("click", this, true);


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
            if (event.target.className == this.classname + '_answerbutton') { this.answerClicked(event); }

            //check if what was clicked is a remove button - if it was, call the remove function of the main page object this  object
            if (event.target.className == "removecss") { this.mainPage_object.remove_box(this); }

            //check if what was clicked is a reset button - if it was, reload the Page
            if (event.target.className == "resetbutton") { location.reload(); }
    }
    catch (err) {errhandler(err, this.is_debugmode);}
}


Guide_ele.prototype.make_guide_ele_disp = function(){

        //make the main box
        this.mainPage_object.pagespace.innerHTML += '<div class="' + this.classname + '" id="' + this.name + '"></div>';

        //assign the main box Var to the Live element on the page
        this.bbox = byid(this.name);

        //make and draw the remove button
        this.bbox.innerHTML += '<input type="button"; value="X"; class="removecss" id="' + this.name + '_remove"></input>';

        //make and draw the Reset button
        this.bbox.innerHTML += '<input type="button"; value="Reset"; class="resetbutton" id="' + this.name + '_resetbutton"></input>';

        //make Question Space of the Box
        this.bbox.innerHTML += '<div class="' + this.classname + '_qspace" id=' + this.name + '_question_space></div>';

        //separate the question and answer spaces
        this.bbox.innerHTML += '<br>';

        //Make the Answer Space of the Box
        this.bbox.innerHTML += '<div id=' + this.name + '_aswer_space></div>';

        //Load the Question space var
        this.questionSpace = byid(this.name + '_question_space');

        //Update the 
        this.aswerSpace = byid(this.name + '_aswer_space');

}


    //parse XML for information
    //get Question text from XML
Guide_ele.prototype.getquestion = function (ele_to_find) {

            //Load a Temp Var with the Parsed Result of looking through the current XML for element to Search for. 
            var x = this.mainPage_object.currentGuideXML.getElementsByTagName(ele_to_find);

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
                var x = this.mainPage_object.currentGuideXML.getElementsByTagName('answer');

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
                        this.aswerSpace.innerHTML += '<div class="' + this.classname + '_answerbutton" id="' + mydivid + '" data-atarget="' + answertarget + '">' + answertext + '</div>';

                        //add this button to an array of buttons in the object for referance later.
                        this.answerbuttons.push(byid(mydivid));

                    }
                }
                //if the element has no Answers then display the end info in the Answer section 
                if (this.answerbuttons.length == 0) {
                    this.aswerSpace.innerHTML += this.defultNoAnswewr;
                }

}


Guide_ele.prototype.answerClicked = function(event){
                //make close Box disappear
                byid(this.name + '_remove').setAttribute("style", "display: none");

                byid(this.name + '_resetbutton').setAttribute("style", "display: none");

                //change the class for the clicked button so we can make it look different
                event.target.className = this.classname + "_answerbutton_selected";


                //go though the list of answer boxes and make all none clicked disappear
                for (var i = 0; i < this.answerbuttons.length; i++) {
                    if (byid(this.answerbuttons[i].id).className == this.classname + '_answerbutton') {
                        byid(this.answerbuttons[i].id).setAttribute("style", "display: none");
                    }
                }

                //put the name of the answer selected in the object
                this.answerselected[0] = event.target.id;
                this.answerselected[1] = event.target.innerHTML;

                //Trigger the Creation of the Next element
                this.mainPage_object.make_guide_ele(event.target.getAttribute('data-atarget'));


}


//// Guide Element Object  ////
////-----------------------////




















