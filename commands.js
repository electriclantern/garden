gardencommands = ['help', 'handbook', 'plant', 'plots', 'harvest', 'deal'];
brewshopcommands = ['help', 'handbook', 'mix', 'brew', 'deal'];
antiglobalroots = ['mix>name', 'brew>name'];
ss = [];

function respond(s) {
  ss = document.getElementById('command').value.split(" ");
  commandoverlay.textContent = "";
  //console.log("input: " + s);

  //global commands
  if (antiglobalroots.indexOf(commandroot) == -1 && s == "clear") {
    outputs = document.getElementsByClassName("o_"+window.screen);
    while (outputs.length > 0) {
      outputs[0].parentNode.removeChild(outputs[0]);
    }
    commandoverlay.textContent = "";
    commandroot = "";
  } else if (antiglobalroots.indexOf(commandroot) == -1 && s == 'inventory' || s == 'inv') {
    commandoverlay.textContent = "";
    commandroot = "";
    createInventoryResponse(inventory);
  } else if (antiglobalroots.indexOf(commandroot) == -1 && s == 'garden') {
    menu('gardenarea');
  } else if (antiglobalroots.indexOf(commandroot) == -1 && s == 'brewshop') {
    menu('brewshop');
  } else if (antiglobalroots.indexOf(commandroot) == -1 && s == ":(") {
    createResponse("things will work out, friend.")
  } else if (antiglobalroots.indexOf(commandroot) == -1 && s == ":)") {
    createResponse(":)")
  } else if (antiglobalroots.indexOf(commandroot) == -1 && s == 'dark' || s == 'light') {
    toggleTheme();
  }

  else if (window.screen == 'handbook') {
    processTwo('help', ss[0])
  }

  else if (window.screen == 'gardenarea') { //GARDEN COMMANDS :)
    if (gardencommands.indexOf(ss[0]) != -1 && ss.length == 5) {
      processFive(ss[0], ss[1], ss[2], ss[3], ss[4]);
    } else if (gardencommands.indexOf(ss[0]) != -1 && ss.length == 4) {
      processFour(ss[0], ss[1], ss[2], ss[3]);
    } else if (gardencommands.indexOf(ss[0]) != -1 && ss.length == 3) {
      processThree(ss[0], ss[1], ss[2]);
    } else if (gardencommands.indexOf(ss[0]) != -1 && ss.length == 2) {
      processTwo(ss[0], ss[1]);
    } else if (gardencommands.indexOf(ss[0]) != -1 && ss.length == 1) {
      processOne(ss[0]);
    } else if (brewshopcommands.indexOf(ss[0]) != -1) {
      createResponse('error: that command can only be used in the brewshop.')
    }

    else if (commandroot == "plant") {
      if (s && isNaN(ss[0])==false && isNaN(ss[1])==true && ss.length==2) {
        plant(parseInt(ss[0], 10), ss[1]);
      } else if (isNaN(s)==true && ss.length==1) {
        plant(1, s);
      } else { createError(); }
    }
    else if (commandroot == "harvest") {
      if (s && isNaN(ss[0])==false && isNaN(ss[1])==true && ss.length==3) {
        commandroot = "";
        harvest(parseInt(ss[0], 10), ss[1], ss[2]);
      } else if (isNaN(s)==true && ss.length==2) {
        commandroot = "";
        harvest(1, ss[0], ss[1]);
      } else { createError(); }
    }
    else if (commandroot == 'deal') {
      if (ss.length==4) {
        commandroot = "";
        processFive('deal', ss[0], ss[1], ss[2], ss[3]);
      } else if (ss.length==3) {
        commandroot = "";
        processFour('deal', ss[0], ss[1], ss[2]);
      } else { createError() }
    }

    else { createError() }
    //console.log("slice 'n dice it: "+ss);
    //console.log("processing: " + ss[0] +" "+ ss[1] +" "+ ss[2]);
  }

  else if (window.screen == 'brewshop') { //BREWSHOP COMMANDS :)
    if (commandroot == 'mix>name' && s.replace(/[^a-zA-Z0-9]+/, '') != '' && s.replace(/[^a-zA-Z0-9]+/, '') != 'potion' && !inventory.hasOwnProperty(s.replace(/[^a-zA-Z0-9]+/, ''))) {
      mixaftername(s.replace(/[^a-zA-Z0-9]+/, ''));
      createInventoryResponse(inventory);
      commandroot = "";
    }
    else if (commandroot == 'brew>name' && s.replace(/[^a-zA-Z0-9]+/, '') != '' && s.replace(/[^a-zA-Z0-9]+/, '') != 'potion' && !inventory.hasOwnProperty(s.replace(/[^a-zA-Z0-9]+/, ''))) {
      mixaftername(s.replace(/[^a-zA-Z0-9]+/, ''))
      brewaftername(s.replace(/[^a-zA-Z0-9]+/, ''));
      createInventoryResponse(inventory);
      commandroot = "";
    }
    else if ((commandroot == 'mix>name' || commandroot == 'brew>name') && inventory.hasOwnProperty(s.replace(/[^a-zA-Z0-9]+/, ''))) {
      createResponse("can't name two potions the same thing")
    }

    else if (brewshopcommands.indexOf(ss[0]) != -1 && ss.length == 7) {
      processSeven(ss[0], ss[1], ss[2], ss[3], ss[4], ss[5], ss[6]);
    } else if (brewshopcommands.indexOf(ss[0]) != -1 && ss.length == 6) {
      processSix(ss[0], ss[1], ss[2], ss[3], ss[4], ss[5]);
    } else if (brewshopcommands.indexOf(ss[0]) != -1 && ss.length == 5) {
      processFive(ss[0], ss[1], ss[2], ss[3], ss[4]);
    } else if (brewshopcommands.indexOf(ss[0]) != -1 && ss.length == 4) {
      processFour(ss[0], ss[1], ss[2], ss[3]);
    } else if (brewshopcommands.indexOf(ss[0]) != -1 && ss.length == 3) {
      processThree(ss[0], ss[1], ss[2]);
    } else if (brewshopcommands.indexOf(ss[0]) != -1 && ss.length == 2) {
      processTwo(ss[0], ss[1]);
    } else if (brewshopcommands.indexOf(ss[0]) != -1 && ss.length == 1) {
      processOne(ss[0]);
    } else if (gardencommands.indexOf(ss[0]) != -1) {
      createResponse('error: that command can only be used in the garden.')
    }

    else if (commandroot == 'mix') {
      if (ss.length==6) {
        commandroot = "";
        processSeven('mix', ss[0], ss[1], ss[2], ss[3], ss[4], ss[5]);
      } else if (ss.length==5) {
        commandroot = "";
        processSix('mix', ss[0], ss[1], ss[2], ss[3], ss[4]);
      } else if (ss.length==4) {
        commandroot = "";
        processFive('mix', ss[0], ss[1], ss[2], ss[3]);
      } else if (ss.length==3) {
        commandroot = "";
        processFour('mix', ss[0], ss[1], ss[2]);
      } else if (ss.length==2) {
        commandroot = "";
        processThree('mix', ss[0], ss[1]);
      } else { createError(); }
    }

    else if (commandroot == 'brew') {
      if (ss.length==6) {
        commandroot = "";
        processSeven('brew', ss[0], ss[1], ss[2], ss[3], ss[4], ss[5]);
      } else if (ss.length==5) {
        commandroot = "";
        processSix('brew', ss[0], ss[1], ss[2], ss[3], ss[4]);
      } else if (ss.length==4) {
        commandroot = "";
        processFive('brew', ss[0], ss[1], ss[2], ss[3]);
      } else if (ss.length==3) {
        commandroot = "";
        processFour('brew', ss[0], ss[1], ss[2]);
      } else if (ss.length==2) {
        commandroot = "";
        processThree('brew', ss[0], ss[1]);
      } else { createError() }
    }

    else if (commandroot == 'deal') {
      if (ss.length==4) {
        commandroot = "";
        processFive('deal', ss[0], ss[1], ss[2], ss[3]);
      } else if (ss.length==3) {
        commandroot = "";
        processFour('deal', ss[0], ss[1], ss[2]);
      } else { createError() }
    }
    else { createError() }
  }

  if (window.screen == 'gardenarea') { area = document.getElementById('garden') }
  else if (window.screen == 'brewshop') { area = document.getElementById('potions') }
  else if (window.screen == 'handbook') { area = document.getElementById('handbook') }
  if (isOverflown(area)) {
    area.scrollTop = area.scrollHeight;
  }

  document.getElementById('prompt').textContent = commandroot + ">";
}

function processSeven(command, a, b, c, d, e, f) {
  if (window.screen == 'brewshop') {
    if (command == 'mix') {
      mixing = true;
      mix(a, b, c, d, e, f)
    } else if (command == 'brew') {
      mixing = false;
      brew(a, b, c, d, e, f)
    }
  }
}
function processSix(command, a, b, c, d, e) {
  if (window.screen == 'brewshop') {
    if (command == 'mix') {
      mixing = true;
      if (isNaN(a)==true) {
        mix(1, a, b, c, d, e)
      } else if (typeof element_properties[b] != "undefined" && typeof element_properties[c] != "undefined" && isNaN(d)==true) {
        mix(a, b, c, 1, d, e)
      } else if (typeof element_properties[b] != "undefined" && typeof element_properties[c] != "undefined") {
        mix(a, b, c, d, e, 'potion')
      } else {
        mix(a, b, 'potion', c, d, e)
      }
    } else if (command == 'brew') {
      mixing = false;
      if (isNaN(a)==true) {
        brew(1, a, b, c, d, e)
      } else if (typeof element_properties[b] != "undefined" && isNaN(d)==true) {
        brew(a, b, c, 1, d, e)
      } else if (typeof element_properties[b] != "undefined") {
        brew(a, b, c, d, e, 'potion')
      } else {
        brew(a, b, 'potion', c, d, e)
      }
    }
  }
}
function processFive(command, a, b, c, d) {
  if (command == 'deal') {
    if (b == 'to') {
      deal(a, c, d);
    } else { createResponse("must include 'to' in a deal command")}
  }
  else if (window.screen == 'brewshop') {
    if (command == 'mix') {
      mixing = true;
      if (typeof element_properties[a] != "undefined" && typeof element_properties[c] != "undefined") {
        mix(1, a, b, 1, c, d)
      } else if (typeof element_properties[a] != "undefined" && !isNaN(c)) {
        mix(1, a, b, c, d, 'potion')
      } else if (!isNaN(b)) {
        mix(1, a, 'potion', b, c, d)
      } else if (!isNaN(a) && typeof element_properties[b] != "undefined") {
        mix(a, b, c, 1, d, 'potion')
      } else {
        mix(a, b, 'potion', 1, c, d)
      }
    } else if (command == 'brew') {
      mixing = false;
      if (typeof element_properties[a] != "undefined" && typeof element_properties[b] != "undefined" && typeof element_properties[c] != "undefined" && typeof element_properties[d] != "undefined") {
        brew(1, a, b, 1, c, d)
      } else if (typeof element_properties[a] != "undefined" && typeof element_properties[b] != "undefined" && !isNaN(c)) {
        brew(1, a, b, c, d, 'potion')
      } else if (isNaN(a)) {
        brew(1, a, 'potion', 1, c, d)
      } else {
        brew(a, b, c, 1, d, 'potion')
      }
    }
  }
}
function processFour(command, a, b, c) {
  if (command == 'deal') {
    if (b == 'to') {
      deal(a, c, '');
    } else { createResponse("must include 'to' in a deal command")}
  }
  else if (window.screen == 'gardenarea') {
    if (command == 'harvest') { harvest(a, b, c); }
    else { createError() }
  } else if (window.screen == 'brewshop') {
    if (command == 'mix') {
      mixing = true;
      if (!isNaN(a)) { //a is a number
        mix(a, b, 'potion', 1, c, 'potion')
      } else if (!isNaN(b)) {
        mix(1, a, 'potion', b, c, 'potion')
      } else if (typeof element_properties[a] != "undefined" && typeof element_properties[b] != "undefined") { // if a is a plant name
        mix(1, a, b, 1, c, 'potion')
      } else {
        mix(1, a, 'potion', 1, b, c)
      }
    } else if (command == 'brew') {
      mixing = false;
      if (!isNaN(a)) { //a is a number
        brew(a, b, 'potion', 1, c, 'potion')
      } else if (typeof element_properties[a] != "undefined" && typeof element_properties[b] != "undefined") { // if a is a plant number
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
      mixing = true;
      mix(1, a, 'potion', 1, b, 'potion')
    } else if (command == 'brew') {
      mixing = false;
      if (typeof element_properties[a] != "undefined" && typeof element_properties[b] != "undefined") { //if a is a plant name
        brew(1, a, b, 1, 'water', 'potion')
      } else if (isNaN(a)) { //a is a string but not a plant name
        brew(1, a, 'potion', 1, 'water', 'potion')
      } else {createError()}
    }
  }
}
function processTwo(command, a) {
  if (window.screen == 'gardenarea') {
    if (command == 'plant') { plant(1, a); }
    else if (command == 'help' || command == 'handbook') {help(a)}
    else { createError() }
  } else if (window.screen == 'brewshop') {
    if (command == 'brew') { mixing = false; brew(1, a, 'potion', 1, 'self', 'self') }
    else if (command == 'help' || command == 'handbook') {help(a)}
    else { createError() }
  } else if (window.screen == 'handbook') {
    help(a);
  }
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
    } else if (command == 'harvest') {
      commandroot = "harvest";
      commandoverlay.textContent = "[number] [plant] [status]";
    } else if (command == 'deal') {
      commandroot = 'deal';
      commandoverlay.textContent = "[potion] to [subject]";
      console.log(commandoverlay.textContent);
    } else if (command == 'help' || command == 'handbook') {
      commandroot = 'help';
      commandoverlay.textContent = '[chapter]'
      help();
    } else { createError() }
  } else if (window.screen == 'brewshop') {
    if (command == 'mix') {
      mixing = true;
      commandroot = "mix";
      commandoverlay.textContent = "[first element] [second element]";
    } else if (command == 'brew') {
      mixing = false;
      commandroot = "brew";
      commandoverlay.textContent = "[first element] [second element?]";
    } else if (command == 'deal') {
      commandroot = 'deal';
      commandoverlay.textContent = "[potion] to [subject]";
      console.log(commandoverlay.textContent);
    } else if (command == 'help' || command == 'handbook') {
      commandroot = 'help';
      commandoverlay.textContent = '[chapter]'
      help();
    } else { createError() }
  }
}
