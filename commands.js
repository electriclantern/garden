gardencommands = ['help', 'plant', 'plots', 'inventory', 'inv', 'harvest', ':)', ':(', 'dark', 'light'];
brewshopcommands = ['help'];
ss = [];

function respond(s) {
  ss = document.getElementById('command').value.split(" ");
  commandoverlay.textContent = "";
  //console.log("input: " + s);

  if (window.screen == 'gardenarea') { //GARDEN COMMANDS :)
    if (gardencommands.indexOf(ss[0]) != -1 && ss.length == 4) {
      processFour(ss[0], ss[1], ss[2], ss[3]);
    } else if (gardencommands.indexOf(ss[0]) != -1 && ss.length == 3) {
      processThree(ss[0], ss[1], ss[2]);
    } else if (gardencommands.indexOf(ss[0]) != -1 && ss.length == 2) {
      processTwo(ss[0], ss[1]);
    } else if (gardencommands.indexOf(ss[0]) != -1 && ss.length == 1) {
      processOne(ss[0]);
    }

    else if (commandroot == "plant") {
      if (s && isNaN(ss[0])==false && isNaN(ss[1])==true && ss.length==2) {
        plant(parseInt(ss[0], 10), ss[1]);
      } else if (isNaN(s)==true && ss.length==1) {
        plant(1, s);
      } else if (s != "clear"){
        createError();
      }
    } else if (commandroot == "harvest") {
      if (s && isNaN(ss[0])==false && isNaN(ss[1])==true && ss.length==3) {
        commandroot = "";
        harvest(parseInt(ss[0], 10), ss[1], ss[2]);
      } else if (isNaN(s)==true && ss.length==2) {
        commandroot = "";
        harvest(1, ss[1], ss[2]);
      } else if (s != "clear"){
        createError();
      }
    } else {
      createError();
    }
    //console.log("slice 'n dice it: "+ss);
    //console.log("processing: " + ss[0] +" "+ ss[1] +" "+ ss[2]);

    area = document.getElementById('garden');
    if (isOverflown(area)) {
      area.scrollTop = area.scrollHeight;
    }
  }

  else if (window.screen == 'brewshop') { //BREWSHOP COMMANDS :)
    if (brewshopcommands.indexOf(ss[0]) != -1 && ss.length == 4) {
      processFour(ss[0], ss[1], ss[2], ss[3]);
    } else if (brewshopcommands.indexOf(ss[0]) != -1 && ss.length == 3) {
      processThree(ss[0], ss[1], ss[2]);
    } else if (brewshopcommands.indexOf(ss[0]) != -1 && ss.length == 2) {
      processTwo(ss[0], ss[1]);
    } else if (brewshopcommands.indexOf(ss[0]) != -1 && ss.length == 1) {
      processOne(ss[0]);
    }

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
  } else if (s == 'inventory' || s == 'inv') {
    createInventoryResponse(inventory);
  } else if (s == 'garden') {
    menu('gardenarea');
  } else if (s == 'brewshop') {
    menu('brewshop');
  } else if (s == ":(") {
    createResponse("things will work out, friend.")
  } else if (s == ":)") {
    createResponse(":)")
  }

  document.getElementById('prompt').textContent = commandroot + ">";
}
function processFour(command, a, b, c) {
  if (window.screen == 'gardenarea') {
    if (command == 'harvest') { harvest(a, b, c); }
    else { createError() }
  } else { createError() }
}
function processThree(command, a, b) {
  if (window.screen == 'gardenarea') {
    if (command == 'plant') { plant(a, b); }
    else if (command == 'harvest') { harvest(1, a, b) }
    else { createError() }
  } else { createError() }
}
function processTwo(command, a) {
  if (window.screen == 'gardenarea') {
    if (command == 'plant') { plant(1, a); }
    else { createError() }
  } else { createError() }
}
function processOne(command) {
  commandoverlay.textContent = "";
  commandroot = "";
  if (window.screen == 'gardenarea') {
    if (command == 'plant') {
      commandroot = "plant";
      commandoverlay.textContent = "[number] [plant]";
      createInventoryResponse(inventory);
    } else if (command == 'plots') {
      togglePlots();
    } else if (command == 'help') {
      createResponse("help, inventory, plant, plots, clear. (tip: many of the words you see can be used as commands.)");
    } else if (command == 'dark' || command == 'light') {
      toggleTheme();
    } else if (command == 'harvest') {
      commandroot = "harvest";
      commandoverlay.textContent = "[number] [plant] [status]";
    } else { createError() }
  } else if (window.screen == 'brewshop') {
    if (command == 'help') {
      createResponse("help, inventory, clear")
    } else { createError() }
  }
}
