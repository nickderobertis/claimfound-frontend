// TODO: Get google maps api key from org settings rather than environment
var script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${env.GOOGLE_MAPS_API_KEY}&libraries=places`;
script.type = "text/javascript";
window.googleMapsLoaded = false;
script.onload = () => {
  window.googleMapsLoaded = true;
};
document.head.appendChild(script);
