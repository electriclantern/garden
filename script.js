function menu(menu) {
  document.getElementById(menu).style.display = "block";
  if (menu=='garden') {
    document.getElementById('brewshop').style.display = "none";
    document.getElementById('gardenbutton').style.background = "yellow";
    document.getElementById('brewshopbutton').style.background = "none";
  } else {
    document.getElementById('garden').style.display = "none";
    document.getElementById('gardenbutton').style.background = "none";
    document.getElementById('brewshopbutton').style.background = "yellow";
  }
  window.screen = menu;
}

//setup
menu('garden');
//var history = [];
//function aHistory(s) {
//  if (history.length <= 5) {
//    history.push(s);
//  } else {
//    history.shift();
//    history.push(s);
//  }
//}

function checkKey(e, textarea) {
  key = (e.keyCode ? e.keyCode : e.which);
  if (key == 13) { //hit enter key
    if (s != "") {
      s = document.getElementById('command').value;
      respond(s);
      //aHistory(s);
      s = "";
    }
  } //else if (key == 38) { // up key. get previous commands
    //s = history[history.length-1];
  //}
}

function createResponse(string) {
  output = document.createElement('div');
  output.style.width = "400px";
  output.style.height = "15px";
  output.style.paddingTop = "10px";
  output.textContent = string;
  if (window.screen == 'garden') { document.getElementById('garden').appendChild(output); }
  else if (window.screen == 'brewshop') {
    document.getElementById('potions').appendChild(output);
  }
}
function respond(s) {
  if (window.screen == 'garden') {
    if (s == "help") {
      createResponse("help, plots");
    } else {
      createResponse("what you say")
    }
  } else if (window.screen == 'brewshop') {
    if (s == "help") {
      createResponse("help, inv, etc")
    } else {
      createResponse("what you say")
    }
  }
}
