var darktheme = false;

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([38, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function toggleTheme() {
  html = document.getElementsByTagName('html')[0];
  if (darktheme) { //turn light
    html.style.setProperty("--text-color", "black");
    html.style.setProperty("--background-color", "white");
    html.style.setProperty("--border-color", "lightgray");
    html.style.setProperty("--highlight-color", "yellow");
    document.getElementById('darktheme').textContent = "dark";
    darktheme = false;
  } else { // turn dark
    html.style.setProperty("--text-color", "white");
    html.style.setProperty("--background-color", "black");
    html.style.setProperty("--border-color", "#4f4f4f");
    html.style.setProperty("--highlight-color", "#673ab7");
    document.getElementById('darktheme').textContent = "light";
    darktheme = true;
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

menu('garden');

var s = document.getElementById('command');
var commandHistory = [];
function rememberCommand(string) {
  if (commandHistory.length <= 5) {
    commandHistory.push(string);
  } else {
    commandHistory.shift();
    commandHistory.push(string);
  }
  console.log(commandHistory)
}
var histpos = -1;
function returnHistory() {
  if (histpos < 0 || commandHistory == []) {
    if (histpos-1 > commandHistory.length) {
      histpos++;
      s.value = commandHistory[commandHistory.length-1 - histpos];
    }
    histpos = -1;
    s.value = "";
  } else {
    s.value = commandHistory[commandHistory.length-1 - histpos];
  }
}

function checkKey(e, textarea) {
  key = (e.keyCode ? e.keyCode : e.which);
  if (key == 13) { //hit enter key
    if (s.value != "") {
      rememberCommand(s.value); //command not being stored properly
      respond(s.value);
      s.value = "";
    }
  } else if (key == 38) { // up
    histpos++;
    returnHistory();
  } else if (key == 40) { // down
    histpos--;
    returnHistory();
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
