var table;
var color = "#17BEBB";
var ships = [
  {
    name: "Carrier",
    size: 5
  },
  {
    name: "Battleship",
    size: 4
  },
  {
    name: "Cruiser",
    size: 3
  },
  {
    name: "Submarine",
    size: 3
  },
  {
    name: "Destroyer",
    size: 2
  },
];



//placera skeppen
function placeShips() {
  for(var i = 0; i < ships.length; i++) {
    getPositions(ships[i]);
  }
}

//så positionen för skeppet
function getPositions(ship) {
  var newShip = false;
  var shipPosition = randomPosition(ship);
  //om skeppet är placerat vertikalt
  if(shipPosition[0].startY - shipPosition[0].stopY == 0) {
    for (var j = 0; j < ship.size; j++) {
      if(ifOccupied($('table tr:eq(' + (shipPosition[0].startY - 1) + ') td:eq(' + (shipPosition[0].startX  - 1 + j )+ ')'), ship) == true) {
        removeShip(ship);
        newShip = true;
        break;
      }
    }
  } else { //om skeppet är placerat horizontellt
    for (var j = 0; j < ship.size; j++) {
      if(ifOccupied($('table tr:eq(' + (shipPosition[0].startY - 1 + j) + ') td:eq(' + (shipPosition[0].startX  - 1 ) + ')'), ship) == true) {
        removeShip(ship);
        newShip = true;
        break;
      }
    }
  }
  //om newShip = true så ska skeppet placeras på nytt
  if(newShip) {
    newShip = false;
    getPositions(ship);
  }
}

//slumpmässig placering
function randomPosition(ship) {
  var rotation = Math.floor((Math.random() * 2) + 1);
  var maxX, maxY;

  //gör så att skeppet går antingen vertikalt eller horizontellt
  if (rotation%2 == 0) {
    maxX = 10 - ship.size;
    maxY = 10;
  } else {
    maxX = 10;
    maxY = 10 - ship.size;
  }
  var x = Math.floor((Math.random() * maxX) + 1);
  var y = Math.floor((Math.random() * maxY) + 1);

  //returnerar start- och slutvärde beroende på skeppets rotation
  if (rotation%2 == 0) {
    return [{startX: x, startY:y, stopX: x + ship.size - 1, stopY: y}];
  } else {
    return [{startX: x, startY:y, stopX: x, stopY: y + ship.size - 1}];
  }
}

//ändrar bakgrundsfärgen på selektorn
function changeBackgroundColor($selector, ship) {
  $selector.css("background-color", color).addClass(ship.name + " ship");
}

//ta bort skeppet
function removeShip(ship) {
  //ändrar alla td med skeppets namn som klass tillbaka till vit bakgrund
  $("td." + ship.name).each(function() {
    $(this).css("background-color", "white").removeClass(ship.name + " ship");
  });
}

//kollar om platsen redan har ändrat färg == upptagen
function ifOccupied($selector, ship) {
  if($selector.hasClass("ship")) {
    return true;
  } else {
    changeBackgroundColor($selector, ship);
  }
}
