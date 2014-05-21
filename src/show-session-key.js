(function () {
  var fanplayr = window.fanplayr;
  if ( fanplayr && fanplayr.Utils ) {
    var session = fanplayr.Utils.initSession("fanplayr_genius_session");
    if ( session ) {
      var key = session('key');
      alert("Fanplayr Session Key:\n\n\"" + key + "\".");
    } else {
      alert("There is no Fanplayr Session key.");
    }
  } else {
    alert("The website doesn't appear to use Fanplayr.");
  }
}());
