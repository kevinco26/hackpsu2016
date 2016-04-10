$( document ).ready(function() {
    function initMap(position) {
       mapDiv = document.getElementById('map');
        console.log("here");
        var map = new google.maps.Map(mapDiv, {
          center: {lat: position.coords.latitude, lng: position.coords.longitude},
          scrollwheel: false,
          zoom: 8
        });
      }

    function getLocation() {
      if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(initMap);
       } else {
         console.log("geolocation not supported");
      }
    }

    getLocation();
});
