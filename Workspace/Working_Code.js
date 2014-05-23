//------------------Updated needed for this function to be possible

//function to parse config file and load guide variables. 
//will only load them if they are found.
//Starts the Load of 3 asycronus XML Loads.
GuideObj.prototype.parse_config_and_load = function () {
    //check if debug mode is defined
    if (this.guide_config_XML.getElementsByTagName("debug_mode")[0] != null || this.guide_config_XML.getElementsByTagName("debug_mode")[0] != undefined) {
        //if it is, store it.
        this.is_debugmode = this.guide_config_XML.getElementsByTagName("debug_mode")[0].childNodes[0].nodeValue;
    }


    //check if timeout is defined
    if (this.guide_config_XML.getElementsByTagName("max_timeout")[0] != null || this.guide_config_XML.getElementsByTagName("max_timeout")[0] != undefined) {
        //if it is, store it.
        this.timout = this.guide_config_XML.getElementsByTagName("max_timeout")[0].childNodes[0].nodeValue;

    }


    //check if Errors XML location is found
    if (this.guide_config_XML.getElementsByTagName("error_msg")[0] != null || this.guide_config_XML.getElementsByTagName("error_msg")[0] != undefined) {
        //If it is, store it and load it
        this.guide_errors_XML = this.guide_config_XML.getElementsByTagName("error_msg")[0].childNodes[0].nodeValue;

        //load it
        //this.loadFile(this.guide_errors_XML, this.timout, this.xmlLoadHandler, 5, this)
    }
    else {
        //If it is not, throw an error.
        throw new Error("gerr0");
    }


    //check if Guide List XML location is found
    if (this.guide_config_XML.getElementsByTagName("guide_list")[0] != null || this.guide_config_XML.getElementsByTagName("guide_list")[0] != undefined) {
        //If it is, store it and load it
        this.guide_List_XML = this.guide_config_XML.getElementsByTagName("guide_list")[0].childNodes[0].nodeValue;

        //load it
        //this.loadFile(this.guide_List_XML, this.timout, this.xmlLoadHandler, 2, this)
    }
    else {
        //If it is not, throw an error.
        throw new Error("gerr1");
    }

    //check if User messages XML location is found
    if (this.guide_config_XML.getElementsByTagName("user_msg")[0] != null || this.guide_config_XML.getElementsByTagName("user_msg")[0] != undefined) {
        //If it is, store it and load it
        this.guide_messages_XML = this.guide_config_XML.getElementsByTagName("user_msg")[0].childNodes[0].nodeValue;

        //load it
        //this.loadFile(this.guide_messages_XML, this.timout, this.xmlLoadHandler, 6, this)
    }


    //check if heading_text is defined
    if (this.guide_config_XML.getElementsByTagName("heading_text")[0] != null || this.guide_config_XML.getElementsByTagName("heading_text")[0] != undefined) {
        //if it is, store it.
        this.heading_Text = this.guide_config_XML.getElementsByTagName("heading_text")[0].childNodes[0].nodeValue;
    }

    //check if replay_box_text is defined
    if (this.guide_config_XML.getElementsByTagName("replay_box_text")[0] != null || this.guide_config_XML.getElementsByTagName("replay_box_text")[0] != undefined) {
        //if it is, store it.
        this.replayBox_lable = this.guide_config_XML.getElementsByTagName("replay_box_text")[0].childNodes[0].nodeValue;
    }

    //check if no_answer is defined
    if (this.guide_config_XML.getElementsByTagName("no_answer")[0] != null || this.guide_config_XML.getElementsByTagName("no_answer")[0] != undefined) {
        //if it is, store it.
        this.replayBox_lable = this.guide_config_XML.getElementsByTagName("no_answer")[0].childNodes[0].nodeValue;
    }

}

