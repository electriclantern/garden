if (readCookie('darktheme')==undefined) {
  console.log('darktheme cookie created');
  document.cookie = 'darktheme=false; expires=Tue, 19 Jan 2038 03:14:07 UTC;'
} else if (readCookie('darktheme') == 'true') {
  var html = document.getElementsByTagName('html')[0];
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
}

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
