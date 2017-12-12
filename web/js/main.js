//url till WebSocket
var url= "ws://localhost:8080/SankSkeppWebSocket/sankaskepp";
var ws = new WebSocket(url);
var username;
var outputs;
var output;
var yourTurn = true;
var full = false;
var usernames = [];

function sendHitOrMiss(text) {
    ws.send(text);
}

function sendUsername() {
    if(!full) {
      console.log("notfull");
      var usernameExists;
      username = $("#username").val();
      for (var i = 0; i < usernames; ++i) {
        if(usernames[i].username == username){
          usernameExists = true;
          console.log("exists");
          break;
        }
      }
      if(username != null && !usernameExists) {
        ws.send(username);
        $("#inputs").hide();
        setupYourTable(username);
        setupOpponentTable();
        makeTdclickable();
      }
    } else {
      console.log("full");
        $("#button").addClass("full");
        $("#inputs p").show();
    }
}

function sendIndex(text) {
    if(yourTurn) {
        yourTurn = false;
        ws.send(text);
    }
}

ws.onmessage = function processMessage(message) {
    var jsonData = JSON.parse(message.data);
    if(!Array.isArray(jsonData)) {
        output = jsonData.message;
        if(output.match("hit") && jsonData.username !== username) {
            var xy = splitOutput("hit");
            hit(xy[0].x, xy[0].y);
        } else if (output.match("miss") && jsonData.username !== username) {
            var xy = splitOutput("miss");
            miss(xy[0].x, xy[0].y);
        }
        else if (jsonData.username !== username) {
            yourTurn = true;
            var xy = splitOutput("");
            checkIfHit(xy[0].x, xy[0].y, username);
        }
    } else {
      usernames = jsonData;
      console.log("usernames");
      console.log(usernames);
        if(jsonData.length > 1) {
            full = true;
        }
    }
}

function splitOutput(replaceWord) {
    outputs = output.replace(replaceWord,"");
    outputs = outputs.split(",");
    var x = outputs[0];
    var y = outputs[1];
    return [{x: x, y: y}];
}
