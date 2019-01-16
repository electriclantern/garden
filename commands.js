function respond(s) {
  commandoverlay.textContent = "";

  if (window.screen == 'garden') {
    //automatically delete top output if overflow
    //garden: 18
    outputs = document.getElementsByClassName("o_garden");
    if (outputs.length > 18) {
      outputs[0].parentNode.removeChild(outputs[0]);
    }

    // GARDEN COMMANDS :)
    if (pcom == "") {
      if (s == "help") {
        createResponse("help, inventory, plant, clear");
      } else if (s == "):") {
        createResponse("things will work out, friend.")
      } else {
        createError();
      }
    } else if (pcom == "plant") {
      // get input and split it into number and plant
      // if input doesn't have a number, assume it's one
      if (s && isNaN(s.split(" ")[0])==false && isNaN(s.split(" ")[1])==true && s.split(" ").length==2) {
        pcom = "";
        plant(parseInt(s.split(" ")[0], 10), s.split(" ")[1]);
      } else if (isNaN(s)==true && s.split(" ").length==1) {
        pcom = "";
        plant(1, s);
      } else {
        createError();
      }
    }

    //garden global commands
    if (s == "inventory" || s == "inv") {
      createInventoryResponse(inventory);
    } else if (s == "plant" || s == "p") {
      pcom = "plant";
      commandoverlay.textContent = "[number] [plant]";
      createInventoryResponse(inventory);
    }


  } else if (window.screen == 'brewshop') {
    //automatically delete top output if overflow
    //potions: 10
    outputs = document.getElementsByClassName("o_brewshop");
    if (outputs.length > 10) {
      outputs[0].parentNode.removeChild(outputs[0]);
    }

    // BREWSHOP COMMANDS :)
    if (s == "help") {
      createResponse("help, clear");
    } else {
      createError();
    }
  }

  //global commands
  if (s == "clear") {
    outputs = document.getElementsByClassName("o_"+window.screen);
    while (outputs.length > 0) {
      outputs[0].parentNode.removeChild(outputs[0]);
    }
    pcom = "";
  }

  document.getElementById('prompt').textContent = pcom + ">";
}
