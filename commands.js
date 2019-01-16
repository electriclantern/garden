var pcommands = ['plant', 'inventory', 'inv']
var ss = [];

function respond(s) {
  ss = document.getElementById('command').value.split(" ");

  commandoverlay.textContent = "";
  console.log("input: " + s);

  if (window.screen == 'garden') {
    //automatically delete top output if overflow
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
      }
    } else if (pcom == "plant") {
      // get input and split it into number and plant
      // if input doesn't have a number, assume it's one
      if (s && isNaN(ss[0])==false && isNaN(ss[1])==true && ss.length==2) {
        pcom = "";
        plant(parseInt(ss[0], 10), ss[1]);
      } else if (isNaN(s)==true && ss.length==1) {
        pcom = "";
        plant(1, s);
      } else {
        createError();
      }
    }

    // garden global commands
    // if ss[0] is in pcommands && there are 1-3 arguments
    if (pcommands.indexOf(ss[0]) != -1 && ss.length == 3) {
      processThree(ss[0], ss[1], ss[2]);
    } else if (pcommands.indexOf(ss[0]) != -1 && ss.length == 2) {
      processTwo(ss[0], ss[1]);
    } else if (pcommands.indexOf(ss[0]) != -1 && ss.length == 1) {
      processOne(ss[0]);
    } else if (s != "help" && s != "):") { //nonglobal pcom="" commands
      createError();
    }
    console.log(ss);
    console.log("processing: " + ss[0] +" "+ ss[1] +" "+ ss[2]);


  } else if (window.screen == 'brewshop') {
    //automatically delete top output if overflow
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
