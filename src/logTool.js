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
 * 
 * @param {*} log 
 */
function processResponse(log) {
    
    // Add style to log section 
    var logSection = document.getElementById("log-section");
    logSection.style.border = "1px solid grey"; // Add border

    // TODO -> process log into correct variables

    // Create new div
    div = generateDiv(/*add params*/);
    logSection.appendChild(div);
}

/**
 * 
 * @param {*} serverName 
 * @param {*} serverAddr 
 * @param {*} sent 
 * @param {*} recieved 
 */
function generateDiv(serverName, serverAddr, sent, recieved) {
    console.log("generating div")
    
    div = document.createElement("div");
    div.innerHTML = serverName + " -> " + serverAddr;
    return div;
}
