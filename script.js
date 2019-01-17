var darktheme = false;
var pcom = "";
var commandoverlay = document.getElementById('commandoverlay');

var inventory = {mercury:6, venus:1, earth:0, mars:1, jupiter:0, saturn:0, uranus:0, neptune:0};
var plots = [[], [], [], [], []];

menu('gardenarea');
document.getElementById('command').focus();
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
  pcom = "";
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight;
}

function menu(menu) {
  pcom = "";
  commandoverlay.textContent = "";
  document.getElementById('prompt').textContent = pcom + ">";

  document.getElementById(menu).style.display = "block";
  if (menu=='gardenarea') {
    document.getElementById('brewshop').style.display = "none";
    document.getElementById('gardenbutton').style.background = "var(--highlight-color)";
    document.getElementById('brewshopbutton').style.background = "none";
  } else {
    document.getElementById('gardenarea').style.display = "none";
    document.getElementById('gardenbutton').style.background = "none";
    document.getElementById('brewshopbutton').style.background = "var(--highlight-color)";
  }
  window.screen = menu;
}

var s = document.getElementById('command');
var commandHistory = [];
function rememberCommand(string) {
  if (string != commandHistory[commandHistory.length-1]) {
    if (commandHistory.length <= 50) {
      commandHistory.push(string);
    } else {
      commandHistory.shift();
      commandHistory.push(string);
    }
  }
}
var histpos = -1;
function returnHistory() {
  commandoverlay.textContent = "";
  if (commandHistory.length > 0) {
    if (histpos < 0 || commandHistory == []) {
      histpos = -1;
      s.value = "";
    } else {
      if (histpos > commandHistory.length-1) {
        histpos--;
        s.value = commandHistory[commandHistory.length-1 - histpos];
      }
      s.value = commandHistory[commandHistory.length-1 - histpos];
    }
  }
}

function checkKey(e, textarea) {
  key = (e.keyCode ? e.keyCode : e.which);
  if (key >= 48 && key <= 90 || key >= 96 && key <= 105) {
    commandoverlay.textContent = "";
  }

  if (key == 13) { //hit enter key
    //remove "type help" thing
    s.value = s.value.trim();
    if (s != "" && document.getElementById('helpline')) {
      document.getElementById('helpline').parentNode.removeChild(document.getElementById('helpline'));
    }

    if (s.value != "") {
      s.value = s.value.trim();
      rememberCommand(s.value);
      histpos = -1;
      respond(s.value);
      s.value = "";
    }
  } else if (key == 38) { // up
    histpos++;
    returnHistory();
  } else if (key == 40) { // down
    histpos--;
    returnHistory();
  } else if (key == 27) { // escape
    histpos = -1;
    pcom = "";
    document.getElementById('prompt').textContent = pcom + ">";
    commandoverlay.textContent = "";
    s.value = "";
  }
}

function createResponse(string) {
  output = document.createElement('div');
  output.style.width = "400px";
  output.style.paddingBottom = "var(--margin-size)";
  output.textContent = string;
  if (window.screen == 'gardenarea') {
    document.getElementById('garden').appendChild(output);
    output.className = "o_gardenarea";
  }
  else if (window.screen == 'brewshop') {
    document.getElementById('potions').appendChild(output);
    output.className = "o_brewshop";
  }
}
function createError(){ createResponse("what you say"); }
function createInventoryResponse(obj) {
  inventoryresponse = "";
  for (i = 0; i < Object.keys(obj).length; i++) {
    if (obj[Object.keys(obj)[i]] > 0) {
      inventoryresponse += "(" + obj[Object.keys(obj)[i]] + ") " + Object.keys(obj)[i];
      if (i != Object.keys(obj).length - 1) {
        inventoryresponse += ". ";
      }
    }
  }
  if (Object.keys(inventory).length > 0) {
    createResponse("you've got: "+ inventoryresponse);
  } else {
    createResponse("you've got nothing.") //NOTHING, you hear?
  }
  console.log(inventoryresponse);
}

var plotsize = "";
function togglePlots() {
  if (document.getElementById('plots').style.display == 'block') {
    hidePlots();
  } else {
    getPlots();
  }
}
function hidePlots() {
	document.getElementById('plots').style.display = 'none';
  while(document.getElementsByClassName("o_plots").length > 0) {
    document.getElementsByClassName("o_plots")[0].parentNode.removeChild(document.getElementsByClassName("o_plots")[0]);
  }
  document.getElementById('plots').style.display = 'none';
  document.getElementById('garden').style.height = "450px";
}
function getPlots() {
	hidePlots();
  document.getElementById('plots').style.display = 'block';
  // change 'plot's height to 15*plots.length +15
  // change 'garden's height to 450-(15*plots.length +15)
  // insert plots

  newplotheight = 30*plots.length+3;
  document.getElementById('plots').style.height = newplotheight + "px";
  newgardenheight = 450-newplotheight-15;
  document.getElementById('garden').style.height = newgardenheight + "px";

  for (i = 0; i < plots.length; i++) {
		output = document.createElement('div');
    output.style.paddingBottom = "15px";//var(--margin-size)

    if (!Array.isArray(plots[i]) || !plots[i].length) {
      output.textContent = "[]";
    }
    else {
      output.textContent = "["+ plots[i][0]+" "+plots[i][1]+"]";
    }

    output.className = "o_plots";
    document.getElementById('plots').appendChild(output);
  }
}

function plant(num, plant) {
  emptyplots = [];
  successnum = 0;

  for (i=0; i < plots.length; i++) {
    if (plots[i].length==0) {
      emptyplots.push(i);
    }
  }

  if (num <= inventory[plant]) {
    console.log("emptyplots: " + emptyplots);
    for (i = 0; i < num; i++) {
      if (i < emptyplots.length) {
        plots[emptyplots[i]].push(plant);
        grow(plots[emptyplots[i]]);
        successnum++;
        inventory[plant]--;
      }
    }
    console.log(plots);
    if (successnum==num) { createResponse(num + " " + plant + " planted."); }
    else { createResponse("out of plots. "+successnum+" "+plant+" planted.") }
    getPlots();
    commandoverlay.textContent = "";
    pcom = "";
  } else if (num > inventory[plant]) {
    createResponse("you don't have enough of that.")
  } else {
    createResponse("what are you planting?")
    pcom = "plant";
    commandoverlay.textContent = "[number] [plant]";
  }
}
function grow(plot) {
  plot.push('sprout');
}
