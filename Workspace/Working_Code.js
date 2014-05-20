//------------------Updated needed for this function to be possible

//Error handler for Guide Site.
//takes and error object as an argument and a Bool for debug mode. 
//Debug true will display an alert error to the User. it can be force passed when needed.
//Looks for the error message, a string of a numeric code, in the Error XML
//If the error code is found, It displays the found error else it displays a Defult error.
GuideObj.prototype.error_handler = function (error, debugmode) {
    //Local Variable for Error string.
    var disp_error = "The guide and enountered an error. Please reload the page and try again. If the problem presists, contact the helpdesk for further support.";

    var err_string = "";

    //Local var for Parsed Guide
    var parsed_errors = null;

    //Check if XML is null If not Parse it
    if (this.guide_errors_XML != null) {
        //Parse XML
        parsed_errors = this.guide_errors_XML.getElementsByTagName(error.message);

        //If the results are found load them
        if (parsed_errors[0].childNodes[0].nodeValue != null || parsed_errors[0].childNodes[0].nodeValue != undefined) {
            disp_error = parsed_errors[0].childNodes[0].nodeValue;
        }
    }

    //build the error message display
    err_string = 'Error Message: ' + disp_error;
    err_string += '\n Error Code: ' + error.message;
    err_string += '\n\n Error stack \n' + error.stack;

    //Check Debugmode - We ignore all None True values.
    //If true display a alert.
    //If false, display to console. 
    if (debugmode == true) { alert(err_string);}
    else {console.log(err_string);}

} 