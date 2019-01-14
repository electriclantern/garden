function menu(menu) {
  document.getElementById(menu).style.display = "block";
  if (menu=='garden') {
    document.getElementById('brewshop').style.display = "none";
  } else {
    document.getElementById('garden').style.display = "none";
  }
  document.getElementById('command').focus();
}

menu('garden');

function checkKey(e, textarea) {
  key = (e.keyCode ? e.keyCode : e.which);
  if (key == 13) { //hit enter key
    var s = document.getElementById('command').value;
    document.getElementById('command').value = "";
    respond();
  }
}

function createResponse(string) {
  output = document.createElement('output');
  output.style.width = "400px";
  output.style.height = "15px";
  output.textContent = string;
  document.getElementById('garden').appendChild(output);
}
function respond() {
  if (s=="help") {
    createResponse("you typed help");
  } else {
    createResponse("what you say")
  }
}
