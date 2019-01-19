darktheme = false;
commandroot = "";
commandoverlay = document.getElementById('commandoverlay');

menu('gardenarea');
document.getElementById('command').focus();
window.addEventListener("keydown", function(e) {
    // disable space and arrow keys
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
  commandroot = "";
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight;
}

function menu(menu) {
  commandroot = "";
  commandoverlay.textContent = "";
  document.getElementById('prompt').textContent = commandroot + ">";

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

s = document.getElementById('command');
commandHistory = [];
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
histpos = -1;
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
    commandroot = "";
    document.getElementById('prompt').textContent = commandroot + ">";
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

////////////////////////////////////////////
// PLANTING & GROWING //////////////////////
////////////////////////////////////////////
inventory = {mercury:6, venus:1, earth:0, mars:1, jupiter:0, saturn:0, uranus:0, neptune:0};
plots = [[], [], [], [], []];

var timer = setInterval(updatePlots, 3000);

function updatePlots() {
  fullplots = [];
  for (i = 0; i < plots.length; i++) { //get fullplots
    if (plots[i].length) {
      fullplots.push(i);
    }
  }

  for (i = 0; i < fullplots.length; i++) { //for each plot that is full
    growth = plots[fullplots[i]][2];
    plotelement = document.getElementsByClassName('o_plots_progress')[fullplots[i]];

  	if (growth < 100) { //increment
    	plots[fullplots[i]][2]++;
    }

    if (growth == 100) {
      changeGrowthLevel(plotelement, 'decaying');
      plots[fullplots[i]][1] = 'decaying';
    } else if (growth >= 80) {
      changeGrowthLevel(plotelement, 'wilting');
      plots[fullplots[i]][1] = 'wilting';
    } else if (growth >= 60) {
      changeGrowthLevel(plotelement, 'ripe');
      plots[fullplots[i]][1] = 'ripe';
    } else if (growth >= 40) {
      changeGrowthLevel(plotelement, 'in-bloom');
      plots[fullplots[i]][1] = 'in bloom';
    } else if (growth >= 20) {
      changeGrowthLevel(plotelement, 'seedling');
      plots[fullplots[i]][1] = 'seedling';
    } else {
      changeGrowthLevel(plotelement, 'sprout');
      plots[fullplots[i]][1] = 'sprout';
    }
  }

  if (document.getElementById('plots').style.display == 'block') {
    getPlots();
  }
}

function changeGrowthLevel(element, growthclass) {
  //if there are two classes in element then delete last class
  if (!element.classList.contains(growthclass)) {
    var classString = element.className;
    var newClass = classString.concat(' '+growthclass);
    element.className = newClass;
  }
}

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
  while(document.getElementsByClassName("o_plots_progress").length > 0) {
    document.getElementsByClassName("o_plots_progress")[0].parentNode.removeChild(document.getElementsByClassName("o_plots_progress")[0]);
  }
  document.getElementById('plots').style.display = 'none';
  document.getElementById('garden').style.height = "450px";
}
function getPlots() {
	hidePlots(); //start fresh

  //show plots and shorten garden
  document.getElementById('plots').style.display = 'block';
  newplotheight = 30*plots.length+4;
  document.getElementById('plots').style.height = newplotheight + "px";
  newgardenheight = 450-newplotheight-15;
  document.getElementById('garden').style.height = newgardenheight + "px";

  //draw
  for (i = 0; i < plots.length; i++) { //for each plot
		output = document.createElement('div'); //create name
    output.style.paddingBottom = "var(--margin-size)";

    progressbar = document.createElement('div'); //create progress bar
    progressbar.className = "o_plots_progress";
    progressbartop = i*30+1;
    progressbar.style.top = progressbartop+"px";

    if (!Array.isArray(plots[i]) || !plots[i].length) { //if there is no plant in this plot
      output.textContent = "[]";
    }
    else { //if there is plant in this plot
      output.textContent = "["+ plots[i][0]+" "+plots[i][1]+"]"; //write name
      progressbar.style.width = plots[i][2]+"%"; //draw progress bar
      console.log(plots[i][0]+plots[i][1]+plots[i][2]);
    }

    output.className = "o_plots";
    document.getElementById('plots').appendChild(output);
    document.getElementById('plots').appendChild(progressbar);
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
    commandroot = "";
  } else if (num > inventory[plant]) {
    createResponse("you don't have enough of that.")
  } else {
    createResponse("what are you planting?")
    commandroot = "plant";
    commandoverlay.textContent = "[number] [plant]";
  }
}
function grow(plot) {
  plot.push('sprout');
  plot.push(1);
}
