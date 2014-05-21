(function () {
  var fanplayr = window.fanplayr;
  console.log('expire4: ', fanplayr, document, window);
  if ( fanplayr && fanplayr.Utils ) {
    var tags = document.getElementsByTagName("script");
    var session = fanplayr.Utils.initSession("fanplayr_genius_session")
    for ( var i = 0, len = tags.length; i < len; i++ ) {
      var match = tags[i].src.match(/(site\.fanplayr|stage\.fanplayr\.com|my\.fanplayr\.com)/i);
      if ( match ) {
        var script = document.createElement("script");
        script.async = true;
        script.src = "//" + match[1] + "/external.genius/?a=expire-session&sk=" + session("key");
        document.body.appendChild(script);
        return;
      }
    }
    alert("Can't determine Fanplayr server.");
  } else {
    alert("The website doesn't appear to use Fanplayr.");
  }
}());
