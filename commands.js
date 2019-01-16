var pcommands = ['plant', 'inventory', 'inv', 'plots', 'harvest']
var ss = [];

function respond(s) {
  ss = document.getElementById('command').value.split(" ");

  commandoverlay.textContent = "";
  console.log("input: " + s);

  if (window.screen == 'garden') {
    // GARDEN COMMANDS :)
    //global
    if (pcommands.indexOf(ss[0]) != -1 && ss.length == 3) {
      processThree(ss[0], ss[1], ss[2]);
    } else if (pcommands.indexOf(ss[0]) != -1 && ss.length == 2) {
      processTwo(ss[0], ss[1]);
    } else if (pcommands.indexOf(ss[0]) != -1 && ss.length == 1) {
      processOne(ss[0]);
    }

    else if (pcom == "") {
      if (s == "help") {
        createResponse("help, inventory, plant, plots, clear");
      } else if (s == "):") {
        createResponse("things will work out, friend.")
      } else { createError() }
    } else if (pcom == "plant") {
      // get input and split it into number and plant
      // if input doesn't have a number, assume it's one
      if (s && isNaN(ss[0])==false && isNaN(ss[1])==true && ss.length==2) {
        pcom = "";
        plant(parseInt(ss[0], 10), ss[1]);
      } else if (isNaN(s)==true && ss.length==1) {
        pcom = "";
        plant(1, s);
      } else if (s != "clear"){
        createError();
      }
    }
    console.log("slice 'n dice it: "+ss);
    console.log("processing: " + ss[0] +" "+ ss[1] +" "+ ss[2]);

    //automatically delete 56 characters from top output if overflow
    area = document.getElementById('garden');
    if (isOverflown(area)) {
      area.scrollTop = area.scrollHeight;
    }
  } else if (window.screen == 'brewshop') {
    // BREWSHOP COMMANDS :)
    if (s == "help") {
      createResponse("help, clear");
    } else {
      createError();
    }

    //automatically delete top output if overflow
    area = document.getElementById('potions');
    if (isOverflown(area)) {
      area.scrollTop = area.scrollHeight;
    }
  }

  //global commands
  if (s == "clear") {
    outputs = document.getElementsByClassName("o_"+window.screen);
    while (outputs.length > 0) {
      outputs[0].parentNode.removeChild(outputs[0]);
    }
    commandoverlay.textContent = "";
    pcom = "";
  }

  document.getElementById('prompt').textContent = pcom + ">";
}

function processThree(command, a, b) {
  if (command == 'plant') { plant(a, b); }
  else { createError() }
}
function processTwo(command, a) {
  if (command == 'plant') { plant(1, a); }
  else { createError() }
}
function processOne(command) {
  commandoverlay.textContent = "";
  pcom = "";

  if (command == 'plant') {
    pcom = "plant";
    commandoverlay.textContent = "[number] [plant]";
    createInventoryResponse(inventory);
  } else if (command == 'inventory' || command == 'inv') {
    createInventoryResponse(inventory);
  } else if (command == 'plots') {
    getPlots();
  } else { createError() }
}
