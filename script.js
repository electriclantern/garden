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

    html.style.setProperty("--sprout", "#7af442");
    html.style.setProperty("--seedling", "#4bc910");
    html.style.setProperty("--blooming", "#f767d7");
    html.style.setProperty("--ripe", "#d30ad3");
    html.style.setProperty("--wilting", "#c08bd6");
    html.style.setProperty("--decaying", "#b2b2b2");
    document.getElementById('darktheme').textContent = "dark";
    darktheme = false;
  } else { // turn dark
    html.style.setProperty("--text-color", "white");
    html.style.setProperty("--background-color", "black");
    html.style.setProperty("--border-color", "#4f4f4f");
    html.style.setProperty("--highlight-color", "#673ab7");

    html.style.setProperty("--sprout", "#48bf11");
    html.style.setProperty("--seedling", "#318709");
    html.style.setProperty("--blooming", "#e05cc3");
    html.style.setProperty("--ripe", "purple");
    html.style.setProperty("--wilting", "#654572");
    html.style.setProperty("--decaying", "#6d6d6d");
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
      rememberCommand(s.value);
      histpos = -1;
      s.value = s.value.toLowerCase();
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
  output.innerHTML = string;
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
  var inventoryresponse = "";
  var potionsresponse = "";
  for (i = 0; i < Object.keys(obj).length; i++) {
    if (obj[Object.keys(obj)[i]] > 0) {
      inventoryresponse += "(" + obj[Object.keys(obj)[i]] + ") " + Object.keys(obj)[i]+". ";
    } else if (typeof obj[Object.keys(obj)[i]] === 'object') {
      if (obj[Object.keys(obj)[i]].stock > 1) {
        potionsresponse += "(" + obj[Object.keys(obj)[i]].stock + ") "+"< " + Object.keys(obj)[i] + " >" +". ";
      } else {
        potionsresponse += "< " + Object.keys(obj)[i] + " >" +". ";
      }
    }
  }
  if (potionsresponse != "") { inventoryresponse+="<br />potions: "+potionsresponse }
  if (Object.keys(obj).length > 0) {
    createResponse("inventory: "+inventoryresponse)
  } else {
    createResponse("inventory: empty.")
  }
}

////////////////////////////////////////////
// PLANTING & GROWING //////////////////////
////////////////////////////////////////////
inventory = {mercury:6, venus:1, earth:0, mars:1, jupiter:0, saturn:0, uranus:0, neptune:0};
inventory['venus sprout'] = 1;
inventory['mercury sprout'] = 1;
plots = [[], [], []];

var timer = setInterval(updatePlots, 3000);

function updatePlots() {
  var fullplots = [];
  for (i = 0; i < plots.length; i++) { //get fullplots
    if (plots[i].length) {
      fullplots.push(i);
    }
  }

  for (i = 0; i < fullplots.length; i++) { //for each plot that is full
    var growth = plots[fullplots[i]][2];
    var plotelement = document.getElementsByClassName('o_plots_progress')[fullplots[i]];

  	if (growth < 100) { //increment
    	plots[fullplots[i]][2]++;
    }

    var growth = plots[fullplots[i]][2];

    if (growth == 100) {
      plots[fullplots[i]][1] = 'decaying';
    } else if (growth >= 80) {
      plots[fullplots[i]][1] = 'wilting';
    } else if (growth >= 60) {
      plots[fullplots[i]][1] = 'ripe';
    } else if (growth >= 40) {
      plots[fullplots[i]][1] = 'blooming';
    } else if (growth >= 20) {
      plots[fullplots[i]][1] = 'seedling';
    } else {
      plots[fullplots[i]][1] = 'sprout';
    }
  }

  if (document.getElementById('plots').style.display == 'block') {
    getPlots();
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
var firstplant = false;
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

    output.className = "o_plots";
    document.getElementById('plots').appendChild(output);
    document.getElementById('plots').appendChild(progressbar);

    if (!Array.isArray(plots[i]) || !plots[i].length) { //if there is no plant in this plot
      output.textContent = "[ ]";
      if (i == 0 && firstplant == false) { output.innerHTML += "<p style='display:inline; color:var(--border-color)'> plant something!</p>" }
    }
    else { //if there is plant in this plot
      output.textContent = "["+ plots[i][0]+" "+plots[i][1]+"]"; //write name
      progressbar.style.width = plots[i][2]+"%"; //draw progress bar
      //console.log(plots[i][0]+plots[i][1]+plots[i][2]);

      var growth = plots[i][2];
      var plotelement = document.getElementsByClassName('o_plots_progress')[i];

      if (growth == 100) {
        plotelement.className = 'o_plots_progress '+plots[i][1];
      } else if (growth >= 80) {
        plotelement.className = 'o_plots_progress '+plots[i][1];
      } else if (growth >= 60) {
        plotelement.className = 'o_plots_progress '+plots[i][1];
      } else if (growth >= 40) {
        plotelement.className = 'o_plots_progress '+plots[i][1];
      } else if (growth >= 20) {
        plotelement.className = 'o_plots_progress '+plots[i][1];
      } else {
        plotelement.className = 'o_plots_progress '+plots[i][1];
      }
    }
  }
}
function plant(num, plant) {
  firstplant = true;

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

////////////////////////////////////////////
// HARVESTING /////// //////////////////////
////////////////////////////////////////////
function harvest(num, plant, status) {
  getPlots();

  var harvesting = plant+' '+status;
  var harvestableplots = [];

  var numofharvestable = 0;
  for (i=0; i<plots.length; i++) {
    if (plots[i][0] == plant && plots[i][1] == status) {
      numofharvestable++;
      harvestableplots.push(i);
    }
  }

  if (numofharvestable >= num) {
    for (n=0; n<num; n++) {
      if (plots[harvestableplots[n]][0] == plant && plots[harvestableplots[n]][1] == status) {
        plots[harvestableplots[n]] = [];
        if (harvesting in inventory) {
          inventory[harvesting] += 1;
        } else { inventory[harvesting] = 1; }
        if (status == 'blooming') {
          inventory[plant] += 1;
        }
      }
    }
    commandoverlay.textContent = "";
    commandroot = "";
    createInventoryResponse(inventory);
    getPlots();
  } else { createResponse("what are you harvesting?") }
}

////////////////////////////////////////////
// MIXING & BREWING ////////////////////////
////////////////////////////////////////////
element_properties = {
  sprout:1,
  seedling:1,
  blooming:2,
  ripe:3,
  wilting:1,
  decaying:0,

  mercury: {
    state: 0, //static
    repulsion: 0
  },
  venus: {
    state: 1,
    repulsion: -1 //attraction
  },
  saturn: {
    state: -1,
    repulsion: -1
  }
};
var potionbeingnamed = "";

function mix(n1, a, a_status, n2, b, b_status) {
  //check if ingredients are in inventory
  var ingredients = false;
  if (a in inventory && b in inventory) {
    //if it's a potion, it should have more than zero. if it's a
    if (a_status == 'potion' && inventory[a].stock >= n1) { ingredients = true; }
    else if (inventory[a] >= n1) { ingredients = true; }
    if (b_status == 'potion' && inventory[a].stock >= n2) { ingredients = true; }
    else if (inventory[b] >= n2) { ingredients = true; }

    if (ingredients == true) {
      createResponse('mixing '+n1+' '+a+' '+a_status+' + '+n2+' '+b+' '+b_status+'...');

      astate = [];
      bstate = [];
      potionstate = [];
      potionrepulsion = 0;

      aeffect = element_properties[a_status];
      beffect = element_properties[b_status];

      // the state of an element is its state in an array [effect] times
      // FUTURE NOTE: MAKE N1 and N2 COME INTO PLAY
      if (a_status == 'potion') { astate = inventory[a].state }
      else {
        for (i=0; i<aeffect; i++) {
          astate.push(element_properties[a].state);
        }
      }
      if (b_status == 'potion') { bstate = inventory[b].state }
      else {
        for (i=0; i<beffect; i++) {
          bstate.push(element_properties[b].state);
        }
      }
      console.log(astate);
      console.log(bstate);
      potionstate = astate.concat(bstate);
      console.log('potionstate: '+potionstate);

      //get repulsion
      if (typeof element_properties[a_status] != "undefined") { potionrepulsion += element_properties[a_status] }
      else if (a_status == 'potion') { potionrepulsion += inventory[a].repulsion }
      console.log(potionrepulsion);
      if (typeof element_properties[b_status] != "undefined") { potionrepulsion += element_properties[b_status] }
      else if (b_status == 'potion') { potionrepulsion += inventory[b].repulsion }
      console.log(potionrepulsion);
      potionrepulsion = potionrepulsion/2;
      console.log('potionrepulsion: '+potionrepulsion);

      potionrecipe = [n1, a, a_status, n2, b, b_status];

      for (i=0; i<Object.keys(inventory).length; i++) {
        if (inventory[Object.keys(inventory)[i]]['recipe'] == potionrecipe) { //if potion is the same as an existing potion
          inventory[Object.keys(inventory)[i]].stock += 1;
        } else {
          potion = 'unnamed_potion';
        }
      }

      //remove n1 a and n2 b
      if (a_status == 'potion') { delete inventory[a] }
      else { inventory[a]--; }
      if (b_status == 'potion') { delete inventory[b] }
      else { inventory[b]--; }

      if (potion == 'unnamed_potion') {
        inventory[potion] = {};
        inventory[potion].state = potionstate;
        inventory[potion].repulsion = potionrepulsion;
        inventory[potion].recipe = potionrecipe;
        inventory[potion].stock = 1;
        potionbeingnamed = potion;

        s.value = "";
        createResponse('name the potion');
        commandoverlay = "[only includes a-z, _, and -.]";
        commandroot = "mix>name";
      }
    } else { createResponse("you haven't got enough of that") }
  } else {
    createResponse('what are you mixing?')
  }
}
function mixaftername(s) {
  potionbeingnamed = s.replace(/[^a-zA-Z0-9]+/, '');
  inventory[potionbeingnamed] = inventory['unnamed_potion'];
  delete inventory['unnamed_potion'];
  react(potionbeingnamed);

  console.log(inventory);
  createInventoryResponse(inventory);
}
function react(potion) {
  console.log(potion);
}
function brew(n1, a, a_status, n2, b, b_status) {
  console.log('brew');
  //if (b != 'water') { mix(n1, a, a_status, n2, b, b_status) }
  //else {  }

  //if (b==false && a==) {
//
  //}
}
