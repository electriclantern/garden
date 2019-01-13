function menu(menu) {
  document.getElementById(menu).style.display = "block";
  if (menu=='garden') {
    document.getElementById('brewshop').style.display = "none";
  } else {
    document.getElementById('garden').style.display = "none";
  }
  document.getElementById('command').autofocus;
}

menu('garden');

function checkKey(e) {
  if(e && e.keyCode==13) {
    var s = q.toLowerCase().replace(/[^a-z0-9]/g, '');
    q = "";
    //function
  }
}

//function respond() {
//  if (s=="/seeds") {
//  }
//}
