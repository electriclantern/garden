function menu(menu) {
  document.getElementById(menu).style.display = "block";
  if (menu=='garden') {
    document.getElementById('brewshop').style.display = "none";
    document.getElementById('gardenbutton').style.background = "lightyellow";
    document.getElementById('brewshopbutton').style.background = "none";
  } else {
    document.getElementById('garden').style.display = "none";
    document.getElementById('gardenbutton').style.background = "none";
    document.getElementById('brewshopbutton').style.background = "lightyellow";
  }
  window.screen = menu;
}

menu('garden');

function checkKey(e, textarea) {
  key = (e.keyCode ? e.keyCode : e.which);
  if (key == 13) { //hit enter key
    s = document.getElementById('command').value;
    document.getElementById('command').value = "";
    respond(s);
  }
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
    } else if (s != "") {
      createResponse("what you say")
    }
  } else if (window.screen == 'brewshop') {
    if (s == "help") {
      createResponse("help, inv, etc")
    }
  }
}
