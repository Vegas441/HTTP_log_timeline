/**
 * Server communication object 
 */
class serverComm {
    constructor(addr, name) {
        this.address = addr;
        this.name = name;
        this.messages = [];
    }
    addMessage(msg) {
        this.messages.push(msg);
    }
}

/**
 * Send a request to server 
 * @returns Response test from server  
 */
function httpGet() {
    const url = "https://gist.githubusercontent.com/hajda14/8da0b313b0503b0faee7a8d7fe63d9ca/raw/2eb3eb138e8307af00c0c64f20c97e3c802d54a2/testlog";
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.send( null );

    var rText;
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState === XMLHttpRequest.DONE) {
            var status = httpRequest.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              // The request has been completed successfully
              processResponse(httpRequest.responseText);
              return;
            } else {
              // Oh no! There has been an error with the request!
              console.log("An error occured");
            }
          }

    }
}

/**
 * Separates log into names of servers, adresses and messages 
 * @param {string} log 
 */
function processResponse(log) {
    
    // Add style to log section 
    var logSection = document.getElementById("log-section");

    // Process log into correct variables
    var lines = log.split('\n');
    var connections = new Array(); // Server connections by server adresses
    for(var i = 0; i < lines.length - 1; i++) {
        let line = lines[i].split(" ");
        var lastConnection;

        // Split line 
        const typeOfComm = line[9];
        if(typeOfComm === "SENT:") {
            var addr = line[16].split("://");
            addr = addr[1].split("/");
            addr = addr[0]; // Server address

            // Check if communication object exists
            var commObject = connections.find(obj => { return obj.address === addr});    

            // Message to new server 
            if(typeof commObject == 'undefined') { 
                var serverName = line[4];
                let newComm = new serverComm(addr, serverName);
                var message = lines[i].substring(lines[i].search("SENT:"), lines[i].length);
                newComm.addMessage(message);
                connections.push(newComm);
                lastConnection = newComm;
            } else {    // Add message to existing object
                var message = lines[i].substring(lines[i].search("SENT:"), lines[i].length);
                commObject.addMessage(message);
                lastConnection = commObject;
            }

        // RECIEVED
        } else {
            var message = lines[i].substring(lines[i].search("RECEIVED:"), lines[i].length);
            if(connections.length != 0)
                lastConnection.addMessage(message);
        }
    }

    // Create new div
    connections.forEach(function (item){
        let div = generateDiv(item);
        logSection.appendChild(div);
    });
}

/**
 * 
 * @param {serverComm} commObject Communication object
 * @returns 
 */
function generateDiv(commObject) {
    div = document.createElement("div");
    div.id = "comm_" + commObject.address;
    div.innerHTML = commObject.name + " -> " + commObject.address;
    div.style.margin = "10px";
    div.style.padding = "5px";
    div.style.border = "2px solid grey";
    //div.addEventListener('click', generateSubdiv(commObject));
    div.onclick = 
        function() {
            div = document.getElementById("comm_" + commObject.address);
            div.innerHTML = "";
            for(var i = 0; i < commObject.messages.length-1; i++) {
                div.innerHTML += commObject.messages[i];
                div.innerHTML += "<br>";
            }
        };
    return div;
}

/**
 * Deletes generated log
 */
function deleteLog() {
    var logSection = document.getElementById("log-section");
    var child = logSection.lastElementChild;
    while(child) {
        logSection.removeChild(child);
        child = logSection.lastElementChild;
    }
}
