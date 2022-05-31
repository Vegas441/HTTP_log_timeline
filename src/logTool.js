class serverComm {
    constructor(addr, name) {
        this.address = addr;
        this.name = name;
    }
    addMessage(msg) {
        this.messages.push(msg);
    }
}

/**
 * @brief Send a request to server 
 * @returns Response test from server  
 */
function httpGet() {
    const url = "https://gist.githubusercontent.com/hajda14/8da0b313b0503b0faee7a8d7fe63d9ca/raw/2eb3eb138e8307af00c0c64f20c97e3c802d54a2/testlog";
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.send( null );

    var rText;
    httpRequest.onreadystatechange = function () {
        console.log(httpRequest.responseText);
        processResponse(httpRequest.responseText);
    }
}

/**
 * Separates log into names of servers, adresses and messages 
 * @param {*} log 
 */
function processResponse(log) {
    
    // Add style to log section 
    var logSection = document.getElementById("log-section");
    logSection.style.border = "1px solid grey"; // Add border

    // Process log into correct variables
    var lines = log.split('\n');
    var connections; // Server connections by server adresses
    for(var i = 0; i < log.length; i++) {
        var line = lines[i];
        // TODO -> split line and check existence of communication
    }

    // Create new div
    for (const commObject in connections) {
        div = generateDiv(commObject);
        logSection.appendChild(div);
    }
}

/**
 * Function checks if communication with server has already been defined
 * @param {*} connections List of connections
 * @param {*} addr Server address
 * @returns True if connection is already declared
 */
function isCommDefined(connections, addr) {
    for(const commObject in connections) {
        if(commObject.address.localeCompare(addr) == 0) 
            return true;
    }
    return false;
}

/**
 * 
 * @param {*} commObject Communication object
 * @returns 
 */
function generateDiv(commObject) {
    console.log("generating div")
    
    div = document.createElement("div");
    //div.innerHTML = ;
    return div;
}
