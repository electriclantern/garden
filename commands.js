gardencommands = ['help', 'plant', 'plots', 'inventory', 'inv', 'harvest'];
brewshopcommands = ['help', 'mix', 'brew', 'inventory'];
ss = [];

function respond(s) {
  ss = document.getElementById('command').value.split(" ");
  commandoverlay.textContent = "";
  //console.log("input: " + s);

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
    if (Object.keys(stock).length > 0) { createInventoryResponse(stock); }
  } else if (s == 'garden') {
    menu('gardenarea');
  } else if (s == 'brewshop') {
    menu('brewshop');
  } else if (s == ":(") {
    createResponse("things will work out, friend.")
  } else if (s == ":)") {
    createResponse(":)")
  } else if (s == 'dark' || s == 'light') {
    toggleTheme();
  }

  else if (window.screen == 'gardenarea') { //GARDEN COMMANDS :)
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
        harvest(1, ss[0], ss[1]);
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

    else if (commandroot == 'mix>name') {
      console.log('mixaftername: '+s);
      mixaftername(s);
    }

    area = document.getElementById('potions');
    if (isOverflown(area)) {
      area.scrollTop = area.scrollHeight;
    }
  }

  document.getElementById('prompt').textContent = commandroot + ">";
}

//brew soup.
//brew mercury sprout.
//brew soup soup.
//brew 2 soup.
//brew 1 mercury sprout. brew 1 mercury sprout mars sprout. brew 1 mercury sprout 1 mercury sprout.
function processSeven(command, a, b, c, d, e, f) {
  if (window.screen == 'brewshop') {
    if (command == 'mix') {
      mix(a, b, c, d, e, f)
    } else if (command == 'brew') {
      brew(a, b, c, d, e, f)
    }
  }
}
function processSix(command, a, b, c, d, e) {
  if (window.screen == 'brewshop') {
    if (command == 'mix') {
      if (isNaN(a)==true) {
        mix(1, a, b, c, d, e)
      } else if (Object.keys(element_properties[b]).length > 0 && isNaN(d)==true) {
        mix(a, b, c, 1, d, e)
      } else if (Object.keys(element_properties[b]).length > 0) {
        mix(a, b, c, d, e, 'potion')
      } else {
        mix(a, b, 'potion', c, d, e)
      }
    } else if (command == 'brew') {
      if (isNaN(a)==true) {
        brew(1, a, b, c, d, e)
      } else if (Object.keys(element_properties[b]).length > 0 && isNaN(d)==true) {
        brew(a, b, c, 1, d, e)
      } else if (Object.keys(element_properties[b]).length > 0) {
        brew(a, b, c, d, e, 'potion')
      } else {
        brew(a, b, 'potion', c, d, e)
      }
    }
  }
}
function processFive(command, a, b, c, d) {
  if (window.screen == 'brewshop') {
    if (command == 'mix') {
      if (Object.keys(element_properties[a]).length > 0 && Object.keys(element_properties[c]).length > 0) {
        mix(1, a, b, 1, c, d)
      } else if (Object.keys(element_properties[a]).length > 0 && isNaN(c) == false) {
        mix(1, a, b, c, d, 'potion')
      } else if (isNaN(a)==true) {
        mix(1, a, 'potion', 1, c, d)
      } else {
        mix(a, b, c, 1, d, 'potion')
      }
    } else if (command == 'brew') {
      if (Object.keys(element_properties[a]).length > 0 && Object.keys(element_properties[c]).length > 0) {
        brew(1, a, b, 1, c, d)
      } else if (Object.keys(element_properties[a]).length > 0 && isNaN(c) == false) {
        brew(1, a, b, c, d, 'potion')
      } else if (isNaN(a)==true) {
        brew(1, a, 'potion', 1, c, d)
      } else {
        brew(a, b, c, 1, d, 'potion')
      }
    }
  }
}
function processFour(command, a, b, c) {
  if (window.screen == 'gardenarea') {
    if (command == 'harvest') { harvest(a, b, c); }
    else { createError() }
  } else if (window.screen == 'brewshop') {
    if (command == 'mix') {
      if (isNaN(a) == false) { //a is a number
        mix(a, b, 'potion', 1, c, 'potion')
      } else if (isNaN(b) == false) {
        mix(1, a, 'potion', b, c, 'potion')
      } else if (Object.keys(element_properties[a]).length > 0) { // if a is a plant name
        mix(1, a, b, 1, c, 'potion')
      } else {
        mix(1, a, 'potion', 1, b, c)
      }
    } else if (command == 'brew') {
      if (isNaN(a) == false) { //a is a number
        brew(a, b, 'potion', 1, c, 'potion')
      } else if (Object.keys(element_properties[a]).length > 0) { // if a is a plant number
        brew(1, a, b, 1, c, 'potion')
      } else {
        brew(1, a, 'potion', 1, b, c)
      }
    }
  }
}
function processThree(command, a, b) {
  if (window.screen == 'gardenarea') {
    if (command == 'plant') { plant(a, b); }
    else if (command == 'harvest') { harvest(1, a, b) }
    else { createError() }
  } else if (window.screen == 'brewshop') {
    if (command == 'mix') {
      mix(1, a, 'potion', 1, b, 'potion')
    } else if (command == 'brew') {
      if (Object.keys(element_properties[a]).length > 0) { //if a is a plant name
        brew(1, a, b, 1, 'water', 'potion')
      } else if (isNaN(a) == true) { //a is a string but not a plant name
        brew(1, a, 'potion', 1, 'water', 'potion')
      }
    }
  }
}
function processTwo(command, a) {
  if (window.screen == 'gardenarea') {
    if (command == 'plant') { plant(1, a); }
    else { createError() }
  } else if (window.screen == 'brewshop') {
    brew(1, a, 'potion', 1, 'water', 'potion')
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
    } else if (command == 'harvest') {
      commandroot = "harvest";
      commandoverlay.textContent = "[number] [plant] [status]";
    } else { createError() }
  } else if (window.screen == 'brewshop') {
    if (command == 'help') {
      createResponse("help, inventory, clear")
    } else if (command == 'mix') {
      commandroot = "mix";
      commandoverlay.textContent = "[first element] [second element]";
    } else if (command == 'brew') {
      commandroot = "brew";
      commandoverlay.textContent = "[first element] [second element?]";
    } else { createError() }
  }
}
