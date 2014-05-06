//------------------Updated needed for this function to be possible

//Once the XML is Loaded start the Replay
GuideObj.prototype.replayGuide = function () {
    //Local variable to hold the Parsed XML

    //local variable to hold the working element
    
    //Check if Current Guide XML is empty (if it is Thow an error)


    //Check Guide Version, If verion is Bad Send user a messsage
    //let user try if verion difference is only a decmal difference. (try with a warning)

    //Parse the Current Guide XML for the elements. and Load teh Local

    //Get First element from XML guide.
    
    //Make the guide element base on the first element  

    //for each element of the guide code string do the following:
    //get and store the HTML object that matches the index of the current string index to number
    //Run the answer selected function passing the HTML object as the selected target. 

}


var parseinput = function (inputstr) {
    //guide var to hold the starting string
    this.string_to_parse = inputstr;
    //guide var to hold the Parsed Guide name.
    this.guidename = "";
    //guide var to hold Parsed Guide Version.
    this.guideVer = "";
    //guide Var to hold Parsed Guide Code.
    this.guidecode = "";
}
