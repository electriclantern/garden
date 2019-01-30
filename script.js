document.cookie = 'darktheme=false;'
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

function readCookie(c) {
  var allcookies = document.cookie;
  cookiearray = document.cookie.split(';');

  for (var i=0; i<cookiearray.length; i++) {
    name = cookiearray[i].split('=')[0];
    if (name == c) {
      return cookiearray[i].split('=')[1]
    }
  }
}

if (readCookie('darktheme') == 'true') { toggleTheme() }
function toggleTheme() {
  html = document.getElementsByTagName('html')[0];
  if (readCookie('darktheme') == 'true') { //turn light
    html.style.setProperty("--text-color", "#121615");
    html.style.setProperty("--background-color", "#f7f9f8");
    html.style.setProperty("--border-color", "#c4cecc");
    html.style.setProperty("--highlight-color", "yellow");

    html.style.setProperty("--sprout", "#7af442");
    html.style.setProperty("--seedling", "#4bc910");
    html.style.setProperty("--blooming", "#f767d7");
    html.style.setProperty("--ripe", "#d30ad3");
    html.style.setProperty("--wilting", "#c08bd6");
    html.style.setProperty("--decaying", "#b2b2b2");
    document.getElementById('darktheme').textContent = "dark";
    document.cookie = 'darktheme=false;'
  } else { // turn dark
    html.style.setProperty("--text-color", "#f7f9f8");
    html.style.setProperty("--background-color", "#121615");
    html.style.setProperty("--border-color", "#636666");
    html.style.setProperty("--highlight-color", "#673ab7");

    html.style.setProperty("--sprout", "#48bf11");
    html.style.setProperty("--seedling", "#318709");
    html.style.setProperty("--blooming", "#e05cc3");
    html.style.setProperty("--ripe", "purple");
    html.style.setProperty("--wilting", "#654572");
    html.style.setProperty("--decaying", "#6d6d6d");
    document.getElementById('darktheme').textContent = "light";
    document.cookie = 'darktheme=true;'
  }
  commandroot = "";
}

function isOverflown(element) {
    return element.scrollHeight > element.clientHeight;
}
function compareArray(a, b) {
  var i = a.length;
  while (i--) {
    if (a[i] !== b[i]) return false;
  }
  return true
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

  //if ((key >= 65 && key <= 90) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key >= 186 && key <= 192) || (key >= 219 && key <= 222) || key == 8 || key == 13 || key == 32) {
  //  var typesound = new Audio('pop.wav'); //:)
  //  typesound.play();
  //}

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
  } else if (key == 27 && antiglobalroots.indexOf(commandroot) == -1) { // escape
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
function createError(){ createResponse("error :("); }
function createInventoryResponse(obj) {
  var inventoryresponse = "";
  var potionsresponse = "";
  for (var i = 0; i < Object.keys(obj).length; i++) {
    if (obj[Object.keys(obj)[i]] > 0) {
      inventoryresponse += "(" + obj[Object.keys(obj)[i]] + ") " + Object.keys(obj)[i]+". ";
    } else if (typeof obj[Object.keys(obj)[i]] === 'object') {
      if (obj[Object.keys(obj)[i]].stock > 1) {
        potionsresponse += "(" + obj[Object.keys(obj)[i]].stock + ") "+"&lt;" + Object.keys(obj)[i] + "&gt;" +". ";
      } else {
        potionsresponse += "&lt;" + Object.keys(obj)[i] + "&gt;" +". ";
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
inventory['venus sprout'] = 2;
inventory['mercury sprout'] = 2;
plots = [[], [], []];

var timer = setInterval(updatePlots, 3000);

function updatePlots() {
  var fullplots = [];
  for (var i = 0; i < plots.length; i++) { //get fullplots
    if (plots[i].length) {
      fullplots.push(i);
    }
  }

  for (var i = 0; i < fullplots.length; i++) { //for each plot that is full
    var growth = plots[fullplots[i]][2];

  	if (growth < 100) { //increment
    	if (plots[fullplots[i]][3] == 1) { plots[fullplots[i]][2]++; }
      else if (plots[fullplots[i]][3] == -1) { plots[fullplots[i]][2]--; }
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
    } else if (growth >= 0) {
      plots[fullplots[i]][1] = 'sprout';
    } else if (growth < 0) {
      inventory[plots[fullplots[i]][0]]++;
      createResponse('the mercury you planted has ungrowed right back to your inventory!');
      createInventoryResponse(inventory);
      plots[fullplots[i]] = [];
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
  for (var i = 0; i < plots.length; i++) { //for each plot
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
      if (i == 0 && !firstplant) { output.innerHTML += "<p style='display:inline; color:var(--border-color)'> plant something!</p>" }
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

  for (var i=0; i < plots.length; i++) {
    if (plots[i].length==0) {
      emptyplots.push(i);
    }
  }

  if (num <= inventory[plant]) {
    console.log("emptyplots: " + emptyplots);
    for (var i = 0; i < num; i++) {
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
  for (var i=0; i<plots.length; i++) {
    if (plots[i][0] == plant && plots[i][1] == status) {
      numofharvestable++;
      harvestableplots.push(i);
    }
  }

  if (numofharvestable >= num) {
    for (var n=0; n<num; n++) {
      if (plots[harvestableplots[n]][0] == plant && plots[harvestableplots[n]][1] == status) {
        plots[harvestableplots[n]] = [];
        if (harvesting in inventory) {
          inventory[harvesting] += 1;
        } else { inventory[harvesting] = 1; }
        if (status == 'blooming') {
          inventory[plant]++;
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

  mercury: { //the base
    state: 0, //static
    repulsion: 1
  },
  venus: {
    state: 1,
    repulsion: 0
  },
  earth: { //living creature matter
    state: 1, //because humans are basically made of 30 earth
    repulsion: -1
  },
  mars: {
    state: 0,
    repulsion: -1
  },
  jupiter: {
    state: -1,
    repulsion: 1
  },
  saturn: {
    state: -1, //turns back time
    repulsion: 0
  },
  uranus: {
    state: 0,
    repulsion: 0
  },
  neptune: {
    state: 1, //underwater creatures
    repulsion: -1
  }
};
var potionbeingnamed = "";
var ingredients = false;

mixing = false;

function checkIngredients(n1, a, a_status, n2, b, b_status) {
  ingredients = false;
  if (a in inventory && b in inventory) {
    //get available a & b
    //if subtracting n1 from available_a > 0 then ingredients = true
    //else ingredients = false
    //if ingredients then do the same thing for b

    if (a == b && a_status == b_status) {
      if (a_status == 'potion') { available_a = inventory[a].stock }
      else { available_a = inventory[a+' '+a_status] }
      if (available_a-n1-n2 >= 0) { ingredients = true; }
    } else {
      if (a_status == 'potion') { available_a = inventory[a].stock }
      else { available_a = inventory[a+' '+a_status] }
      if (available_a-n1 >= 0) { ingredients = true; }
      if (ingredients) {
        if (b_status == 'potion') { available_b = inventory[b].stock }
        else { available_b = inventory[b+' '+b_status] }
        if (available_b-n1 >= 0) { ingredients = true; }
      }
    }
  } else { createResponse('what are you mixing?') }
}
function checkSingleIngredient(n, a, a_status) {
  ingredients = false;
  if (a in inventory) {
    if (a_status == 'potion') { available_a = inventory[a].stock }
    else { available_a = inventory[a+' '+a_status] }
    if (available_a-n >= 0) { ingredients = true; }
  }
}

function brew(n1, a, a_status, n2, b, b_status) {
  if (b == 'self' && b_status == 'self') {
    checkSingleIngredient(n1, a, a_status);
    if (ingredients && n1 > 0) {
      createResponse('brewing '+n1+' '+a+' '+a_status+'...');

      //state
      potionstate = [];
      aeffect = element_properties[a_status];
      if (a_status == 'potion') { for (var i=0;i<n1;i++){potionstate.push.apply(potionstate, inventory[a].state)} }
      else {
        for (var i=0; i<aeffect*n1; i++) {
          potionstate.push(element_properties[a].state);
        }
      }

      //repulsion
      potionrepulsion = [];
      if (typeof element_properties[a_status] != "undefined") { potionrepulsion.push(element_properties[a].repulsion) }
      else if (a_status == 'potion') { potionrepulsion.push(inventory[a].repulsion) }

      //remove n1 a and n2 b
      if (a_status == 'potion') { delete inventory[a] }
      else { inventory[a+' '+a_status]--; }

      potionrecipe = [n1, a, a_status, n2, b, b_status];

      potion = 'unnamed_potion';
      inventory[potion] = {};
      inventory[potion].state = potionstate;
      inventory[potion].repulsion = potionrepulsion;
      inventory[potion].recipe = potionrecipe;
      inventory[potion].stock = 1;

      s.value = "";
      createResponse('name the potion');
      commandoverlay = "[only includes a-z, _, and -.]";
      commandroot = "brew>name";
    }
  }
  else { mix(n1, a, a_status, n2, b, b_status) }
}
function brewaftername(potion) {
  //brew -> turning potionstate array and potionstate repulsion into one state & array
  //state
  var potionstate = [];
  for (var i = 0; i < inventory[potion].state.length; i++) {
    potionstate = potionstate.concat(inventory[potion].state[i]);
  }
  inventory[potion].state = potionstate;

  //repulsion
  var potionrepulsion = 0;
  var lengthofrep = 0;
  for (var i = 0; i < inventory[potion].repulsion.length; i++) {
    for (var x = 0; x < inventory[potion].repulsion[i].length; x++) {
      potionrepulsion += inventory[potion].repulsion[i][x];
      lengthofrep++;
    }
  }
  potionrepulsion = potionrepulsion / lengthofrep;
  inventory[potion].repulsion = potionstate;

  react('load', potion);
}

function mix(n1, a, a_status, n2, b, b_status) {
  checkIngredients(n1, a, a_status, n2, b, b_status);

  if (ingredients && n1 > 0 && n2 > 0) {
    if (mixing) { createResponse('mixing '+n1+' '+a+' '+a_status+' + '+n2+' '+b+' '+b_status+'...'); }
    else { createResponse('brewing '+n1+' '+a+' '+a_status+' + '+n2+' '+b+' '+b_status+'...'); }

    astate = [];
    bstate = [];
    potionstate = [];
    potionrepulsion = [];

    aeffect = element_properties[a_status];
    beffect = element_properties[b_status];

    // the state of an element is its state in an array [effect] times
    if (a_status == 'potion') { for (var i=0;i<n1;i++){astate.push.apply(astate, inventory[a].state)} }
    else {
      for (var i=0; i<aeffect*n1; i++) {
        astate.push(element_properties[a].state);
      }
    }
    if (b_status == 'potion') { for (var i=0;i<n2;i++){bstate.push.apply(bstate, inventory[b].state)} }
    else {
      for (var i=0; i<beffect*n2; i++) {
        bstate.push(element_properties[b].state);
      }
    }
    potionstate.push(astate);
    potionstate.push(bstate);

    //get repulsion
    if (typeof element_properties[a_status] != "undefined") { potionrepulsion.push([element_properties[a].repulsion]) }
    else if (a_status == 'potion') { potionrepulsion.push(inventory[a].repulsion) }
    if (typeof element_properties[b_status] != "undefined") { potionrepulsion.push([element_properties[b].repulsion]) }
    else if (b_status == 'potion') { potionrepulsion.push(inventory[b].repulsion) }

    //remove n1 a and n2 b
    if (a_status == 'potion') { delete inventory[a] }
    else { inventory[a+' '+a_status]--; }
    if (b_status == 'potion') { delete inventory[b] }
    else { inventory[b+' '+b_status]--; }

    potionrecipe = [n1, a, a_status, n2, b, b_status];
    //if potion is the same as an existing potion
    for (var i = 0; i < Object.keys(inventory).length; i++) {
      if (isNaN(inventory[Object.keys(inventory)[i]])) {
        if (compareArray(potionrecipe, inventory[Object.keys(inventory)[i]].recipe) && compareArray(potionstate, inventory[Object.keys(inventory)[i]].state) && compareArray(potionrepulsion, inventory[Object.keys(inventory)[i]].repulsion)) {
          //found same potion
          inventory[Object.keys(inventory)[i]].stock += 1;
          unnamed_potion = false;
          potion = Object.keys(inventory)[i];
          break
        }
      } else { //failed to find same potion
        unnamed_potion = true;
      }
    }

    if (unnamed_potion) {
      potion = 'unnamed_potion';
      inventory[potion] = {};
      inventory[potion].state = potionstate;
      inventory[potion].repulsion = potionrepulsion;
      inventory[potion].recipe = potionrecipe;
      inventory[potion].stock = 1;

      s.value = "";
      createResponse('name the potion');
      commandoverlay = "[only includes a-z, _, and -.]";
      if (mixing) { commandroot = "mix>name"; } else { commandroot = "brew>name"; }
    } else { createResponse('found same potion :D'); react('load', potion); createInventoryResponse(inventory) }
  }
}
function mixaftername(s) {
  potionbeingnamed = s;
  inventory[potionbeingnamed] = inventory['unnamed_potion'];
  delete inventory['unnamed_potion'];

  if (mixing) { react('load', potionbeingnamed); }
}

function statemode(array) {
	var modelist = {};
	for (var x=0; x<array.length; x++) {
  	el = array[x];
    if (modelist[el] == null) {
    	modelist[el] = 1
    } else { modelist[el]++ }
  }

  var maxel = Object.keys(modelist)[0];
  for (var c=1; c<Object.keys(modelist).length; c++) {
  	if (modelist[Object.keys(modelist)[c]] > modelist[Object.keys(modelist)[maxel]]) {
    	maxel = Object.keys(modelist)[c];
    } else if (modelist[Object.keys(modelist)[c]] == modelist[Object.keys(modelist)[maxel]]) {
    	if (Object.keys(modelist)[c] == modelist['0']) {
      	maxel = Object.keys(modelist)[c];
      } else if (Object.keys(modelist)[c] == modelist['1']) {
      	maxel = Object.keys(modelist)[c];
      }
    }
  }
  return maxel
}
function average(array) {
  var repulsion = 0;
  for (var x=0; x<array.length; x++) { repulsion += array[x] }
  repulsion = repulsion/array.length;
  return repulsion
}
function react(subject, potion) { //deal
  console.log(inventory[potion]);
  console.log('reacting '+potion);

  //if state does not contain arrays:
  if (Object.prototype.toString.call(inventory[potion].state[0]) != '[object Array]') {
    var effectstate = statemode(inventory[potion].state);
    var effectrepulsion = average(inventory[potion].repulsion);
    playeffect(subject, effectstate, effectrepulsion);
  } else {
    for (i=0; i<inventory[potion].state.length; i++) { //stacked effects
      var effectstate = statemode(inventory[potion].state[i]);
      var effectrepulsion = average(inventory[potion].repulsion[i]);
      playeffect(subject, effectstate, effectrepulsion);
    }
  }
}
function playeffect(subject, state, repulsion) {
  console.log('subject: '+subject);
  console.log('state: '+state);
  console.log('repulsion: '+repulsion);

  if (state == -1) {
    if (subject == 'load') { createResponse('the potion turns back into its original ingredients') }
    else if (subject == 'self') { createResponse("a strange feeling passes over you. it almost feels as if you're growing younger ????") }
    else if (typeof element_properties[subject] != "undefined") { effect_reverseGrowth(subject) }
  } else if (state == 1) {
    if (repulsion > 0) { console.log('effect_repel') }
    else if (repulsion < 0) { console.log('effect_attract') }
  }
}
function effect_reverseGrowth(plant) {
  //find first plot with plant
  for (var i=0; i<plots.length; i++) {
    if (plots[i][0] == plant) {
      var plotwithplant = plots[i];
      break
    }
  }

  if (plotwithplant) {
    plotwithplant[3] = -1;
    createResponse('the '+plotwithplant[0]+' '+plotwithplant[1]+' starts ungrowing.')
  } else { createError() }
}
function effect_repel(subject) {
  if (subject == 'load') {

  }
}

function deal(potion, subject, subject_status) {
  console.log('potion: '+potion);
  console.log('subject: '+subject);
  console.log('subject_status: "'+subject_status+'"');
  createResponse('dealing '+potion+' to '+subject+' '+subject_status+'...');

  //check if the potion exists & remove it from inventory
  checkSingleIngredient(potion);
  if (ingredient) {
    playeffect(subject, potion);
    inventory[potion].stock--;
    if (inventory[potion].stock <= 0) { delete inventory[potion] }
  } else { createResponse("no such potion") }
}
