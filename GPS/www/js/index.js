function onSuccess(position) {
    var lat = position.coords.latitude;
    var lang = position.coords.longitude;
    var myLatlng = new google.maps.LatLng(lat, lang);
    var mapOptions = { zoom: 15, center: myLatlng };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var marker = new google.maps.Marker({ position: myLatlng, map: map });
}

function onError(error) {
    alert(error.message);
}

function showLocation() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });
}