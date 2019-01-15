function respond(s) {
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
      } else if (s == "plant" || s == "p") {
        pcom = "plant";
        createResponse("your inventory:");
        createInventoryResponse(inventory);
      } else if (s == "):") {
        createResponse("things will work out, friend.")
      } else {
        createError();
      }
    } else if (pcom == "plant") {
      // get input and split it into number and plant
      // if input doesn't have a number, assume it's one
      if (s == "plant") {
        pcom = "plant";
        createResponse("your inventory:");
        createInventoryResponse(inventory);
      } else if (s && isNaN(s.split(" ")[0])==false && isNaN(s.split(" ")[1])==true && s.split(" ").length==2) {
        plant(parseInt(s.split(" ")[0], 10), s.split(" ")[1]);
      } else if (isNaN(s)==true && s.value.trim().split(" ").length==1) {
        plant(1, s);
      } else {
        createError();
      }
    }

    if (s == "clear") {
      outputs = document.getElementsByClassName("o_garden");
      while (outputs.length > 0) {
        outputs[0].parentNode.removeChild(outputs[0]);
      }
      pcom = "";
    } else if (s == "inventory" || s == "inv") {
      createInventoryResponse(inventory);
    }


  } else if (window.screen == 'brewshop') {
    //automatically delete top output if overflow
    //potions: 10
    outputs = document.getElementsByClassName("o_potions");
    if (outputs.length > 10) {
      outputs[0].parentNode.removeChild(outputs[0]);
    }

    // BREWSHOP COMMANDS :)
    if (s == "help") {
      createResponse("help, clear");
    } else if (s == "clear") {
      outputs = document.getElementsByClassName("o_potions");
      while (outputs.length > 0) {
        outputs[0].parentNode.removeChild(outputs[0]);
      }
    } else {
      createError();
    }
  }
}
