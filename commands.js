globalgardencommands = ['help', 'plant', 'plots', 'inventory', 'inv', 'garden', 'brewshop', ':)', ':()']
ss = [];

function respond(s) {
  ss = document.getElementById('command').value.split(" ");

  commandoverlay.textContent = "";
  //console.log("input: " + s);

  if (window.screen == 'gardenarea') {
    // GARDEN COMMANDS :)
    // garden
    if (globalgardencommands.indexOf(ss[0]) != -1 && ss.length == 3) {
      processThree(ss[0], ss[1], ss[2]);
    } else if (globalgardencommands.indexOf(ss[0]) != -1 && ss.length == 2) {
      processTwo(ss[0], ss[1]);
    } else if (globalgardencommands.indexOf(ss[0]) != -1 && ss.length == 1) {
      processOne(ss[0]);
    }

    else if (commandroot == "plant") {
      if (s && isNaN(ss[0])==false && isNaN(ss[1])==true && ss.length==2) {
        commandroot = "";
        plant(parseInt(ss[0], 10), ss[1]);
      } else if (isNaN(s)==true && ss.length==1) {
        commandroot = "";
        plant(1, s);
      } else if (s != "clear"){
        createError();
      }
    } else {
      createError();
    }
    //console.log("slice 'n dice it: "+ss);
    //console.log("processing: " + ss[0] +" "+ ss[1] +" "+ ss[2]);

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
    commandroot = "";
  }

  document.getElementById('prompt').textContent = commandroot + ">";
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
  commandroot = "";

  if (command == 'plant') {
    commandroot = "plant";
    commandoverlay.textContent = "[number] [plant]";
    createInventoryResponse(inventory);
  } else if (command == 'inventory' || command == 'inv') {
    createInventoryResponse(inventory);
  } else if (command == 'plots') {
    togglePlots();
  } else if (command == 'help') {
    createResponse("help, inventory, plant, plots, clear. tip: many of the words you see are commands.");
  } else if (command == "):") {
    createResponse("things will work out, friend.")
  } else if (command == ":)") {
    createResponse(":)")
  } else if (command == 'garden') {
    menu('garden');
  } else if (command == 'brewshop') {
    menu('brewshop');
  } else { createError() }
}
