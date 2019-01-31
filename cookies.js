if (readCookie('darktheme')==undefined) {
  console.log('darktheme cookie created');
  document.cookie = 'darktheme=false; expires=Tue, 19 Jan 2038 03:14:07 UTC;'
}
if (readCookie('darktheme') == 'true') {
  console.log('changing to darktheme based on settings');
  toggleTheme()
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
