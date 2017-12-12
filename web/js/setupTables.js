/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var loaded = false;

$(document).ready(function() {
    loaded = true;
});

function setupYourTable(player) {
    if(loaded) {
    var body = $("main");
    var title = $("<h2>");
    title.text(player);
    var tableContainer = $("<div>");
    tableContainer.append(title);
    tableContainer.addClass("table");
    var table = $("<table>");
    table.attr("id",player);
    for(var i = 0; i < 10; i++) {
        var trow = $("<tr>");
        for(var j = 0; j < 10; j++) {
            var tcell = $("<td>");
            trow.append(tcell);
        }
        table.append(trow);
    }
    table.attr('align', 'center');
    tableContainer.append(table);
    body.append(tableContainer);

    placeShips();
    }
}

function setupOpponentTable() {
    if(loaded) {
    var body = $("main");
    var title = $("<h2>");
    title.text("Opponent");
    var tableContainer = $("<div>");
    tableContainer.append(title);
    tableContainer.addClass("table");
    var table = $("<table>");
    table.attr("id","opponent");
    for(var i = 0; i < 10; i++) {
        var trow = $("<tr>");
        for(var j = 0; j < 10; j++) {
            var tcell = $("<td>");
            trow.append(tcell);
        }
        table.append(trow);
    }
    table.attr('align', 'center');
    tableContainer.append(table);
    body.append(tableContainer);

    }
}

function makeTdclickable() {
    $("table td").click(attack);
}
