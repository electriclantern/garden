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
    c = document.getElementById('command').value;
    c = "";
    respond()
  }
}

function respond() {
  if (c=="help") {
    output = document.createElement('output');
    output.style.width = "400px";
    output.style.height = "15px";
    output.textContent = "you typed help";
    document.getElementById('garden').appendChild(output);
  }
}
