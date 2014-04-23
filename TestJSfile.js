














//A function to make a Div that returns its ID
//Takes the Following args as Required Args: Location: string, ID:string
//Takes the Following args as optional class:string, Text:string
makeDiv = function (location, id, class_in, text_in) {


    //validate the input of required Args
    if (location == undefined) { throw "Args location Undefind" }
    if (id == undefined) { throw "Args id Undefind" }

    //make Local vars with strings
    var text = "";
    var class_store = "";

    //Overwrite the default value of the Local value and an input was given 
    if (class_in != undefined) { class_store = class_in; }
    if (text_in != undefined) { class_store = text_in; }

    //assign a Local variable for the Location the Div is being made. 
    var incertlocation = byid(location);

    //Make the Div The option componets will display but with "" in the value
    incertlocation.innerHTML += "<div";
    incertlocation.innerHTML += " id=" + id;
    incertlocation.innerHTML += " class=" + class_store;
    incertlocation.innerHTML += ">" + text;
    incertlocation.innerHTML += "</div>";


    //Retun when done by sending back a referance to the Div we made. (HTML Object)
    return byid(id);
}















////------------------////
//// Time Out Object  ////


//constructor for making the timeout object. Requires Max time and display location.
//Max time is the Max time out
//Disploc is the where the Load animation will display
var TimeoutObj = function (maxtime_in, disploc_in) {

    //set window to display in any browser case
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    //varible assignmnt 
    this.maxtime = maxtime_in; //stores the Max time for teh timeout

    this.disploc_home = byid(disploc_in); // Stores the location the time out can happen

    this.start = true; //holds if the timer is currently running 

    this.time = 0; // holds elapsed time 

    this.timed_out = false; //holds if this object timed out 

    this.counter = 0; //counter used for loading animation display 

    var self = this; // hold a copy of this for use when passing to aynomons function calls


    //add a Space for the Loading Animation 
    this.disploc_home.innerHTML += '<div id="Load_in_' + disploc_in + '"> </div>';

    //Save that Space as a Varible 
    this.disploc = byid('Load_in_' + disploc_in);

    
    //Start the Loading animation and Timer. Us an aynomons function and send Self In
        //to referace this objects vareiables
    requestAnimationFrame(function () { self.step(self); });
}

//step function for what happens on each animation. 
//On each frame it will Keep Track of the number of Frames. This is use as the Timer. 
//Will check if the timer runs to the Max time and Throw an error. 
TimeoutObj.prototype.step = function (timeobject) {

    //increment the timer for the Timeout 
    timeobject.time += 1;

    //increment the counter for the Display
    timeobject.counter++;

    //display Loading in the Animation Box
    timeobject.disploc.innerHTML = "Loading";

    // Add a . for each counter. (this will add up to 5)
    for (i = 0; i < timeobject.counter; i++) { timeobject.disploc.innerHTML += " ."; }

    //if counter has added 5 reset to 0 to make it look like it is still working
    if (timeobject.counter >= 5) { timeobject.counter = 0; }

    //Check if our time has expired, If it is, set the object to Timed out and throw a Timeout.
    if (timeobject.time >= timeobject.maxtime) {
        timeobject.start = false;
        timeobject.timed_out = true;
        timeobject.stop();
    }

    //Animant the next step
    if (timeobject.start == true) { requestAnimationFrame(function () { timeobject.step(timeobject); }); }
}

//function to stop the cancel the timeout check 
//Returns the time that elapsed
TimeoutObj.prototype.stop = function(){
    this.start = false;//stop the time

    this.disploc.parentNode.removeChild(this.disploc); //remove the Loading animation box

    return this.time;//return the time
}

//// Time Out Object  ////
////------------------////