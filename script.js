darktheme.cookie = false;

function toggleTheme() {
  var html = document.getElementsByTagName('html')[0];
  if (darktheme.cookie==false) {
    html.style.setProperty("--text-color", "black");
    html.style.setProperty("--background-color", "white");
    document.getElementById('darktheme').textContent = "dark";
  } else {
    html.style.setProperty("--text-color", "white");
    html.style.setProperty("--background-color", "black");
    document.getElementById('darktheme').textContent = "light";
  }
}

function menu(menu) {
  document.getElementById(menu).style.display = "block";
  if (menu=='garden') {
    document.getElementById('brewshop').style.display = "none";
    document.getElementById('gardenbutton').style.background = "var(--highlight-color)";
    document.getElementById('brewshopbutton').style.background = "none";
  } else {
    document.getElementById('garden').style.display = "none";
    document.getElementById('gardenbutton').style.background = "none";
    document.getElementById('brewshopbutton').style.background = "var(--highlight-color)";
  }
  window.screen = menu;
}

//setup
menu('garden');

function checkKey(e, textarea) {
  key = (e.keyCode ? e.keyCode : e.which);
  s = document.getElementById('command').value;
  if (key == 13) { //hit enter key
    if (s != "") {
      respond(s);
      document.getElementById('command').value = "";
    }
  }
}

function createResponse(string) {
  output = document.createElement('div');
  output.style.width = "400px";
  output.style.height = "15px";
  output.style.paddingBottom = "10px";
  output.textContent = string;
  if (window.screen == 'garden') {
    document.getElementById('garden').appendChild(output);
    output.className = "o_garden";
  }
  else if (window.screen == 'brewshop') {
    document.getElementById('potions').appendChild(output);
    output.className = "o_potions";
  }
}
function respond(s) {
  if (window.screen == 'garden') {
    //automatically delete top output if overflow
    //garden: 18
    outputs = document.getElementsByClassName("o_garden");
    if (outputs.length > 18) {
      outputs[0].parentNode.removeChild(outputs[0]);
    }

    if (s == "help") {
      createResponse("help, plots");
    } else if (s == "clear") {
      outputs = document.getElementsByClassName("o_garden");
      while (outputs.length > 0) {
        outputs[0].parentNode.removeChild(outputs[0]);
      }
    } else {
      createResponse("what you say");
    }
  } else if (window.screen == 'brewshop') {
    //automatically delete top output if overflow
    //potions: 10
    outputs = document.getElementsByClassName("o_potions");
    if (outputs.length > 10) {
      outputs[0].parentNode.removeChild(outputs[0]);
    }

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
