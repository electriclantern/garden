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
        createResponse("help, inventory, plant");
      } else if (s == "clear") {
        outputs = document.getElementsByClassName("o_garden");
        while (outputs.length > 0) {
          outputs[0].parentNode.removeChild(outputs[0]);
        }
      } else if (s == "plant") {
        pcom = "plant";
        createInventoryResponse(inventory);
      } else if (s == "inventory") {
        createInventoryResponse(inventory);
      } else {
        createResponse("what you say");
      }
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
      createResponse("help, inv, etc");
    } else if (s == "clear") {
      outputs = document.getElementsByClassName("o_potions");
      while (outputs.length > 0) {
        outputs[0].parentNode.removeChild(outputs[0]);
      }
    } else {
      createResponse("what you say");
    }
  }
}
