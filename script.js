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

function checkKey(e) {
  if(e && e.keyCode==13) {
    c = document.getElementById('command').value
    var s = c.toLowerCase().replace(/[^a-z0-9]/g, '');
    c = "";
    respond()
  }
}

function respond() {
  if (s=="help") {
    output = document.createElement('output');
    output.style.width = "400px";
    output.style.height = "15px";
    output.textContent = "you typed help";
    document.getElementById('garden').appendChild(output);
  }
}
