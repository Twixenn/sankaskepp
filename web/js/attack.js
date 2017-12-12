var hits = 0;

function attack() {
  getIndex($(this));
}

function checkIfHit(x, y, username) {
    var ship = $('table#' + username + ' tr:eq(' + (y) + ') td:eq(' + (x) + ')');
    attacked(ship, x, y);
}

function attacked(ship, x, y) {
    if(ship.hasClass("ship")) {
        ship.addClass("hit");
        ship.css("background-color", "#108C8A");
        gotHit(x, y);
    } else {
        ship.addClass("miss");
        ship.css("background-color", "#A5B6BA");
        youMissed(x, y);
    }
}

function gotHit(x, y) {
  sendHitOrMiss("hit" + x + "," + y);
}

function youMissed(x, y) {
  sendHitOrMiss("miss" + x + "," + y);
}

function hit(x, y) {
  hits++;
  var ship = $('table#opponent tr:eq(' + (y) + ') td:eq(' + (x) + ')');
  ship.addClass("miss");
  ship.css("background-color", "#EE6055");
  if(hits === 17) {
    youWon();
  }
}

function miss(x, y) {
  var ship = $('table#opponent tr:eq(' + (y) + ') td:eq(' + (x) + ')');
  ship.addClass("miss");
  ship.css("background-color", "#2E282A");
}

function getIndex(ship) {
  var cell = ship.closest('td');
  var x = cell[0].cellIndex

  var row = cell.closest('tr');
  var y = row[0].rowIndex;
  sendIndex(x + "," + y);
}

function youWon() {
  console.log("You WON!");
}
