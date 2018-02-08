var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat; 
var lon;
var tempUnit = 'C';
var currentTempInCelsius;
$(document).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var lat = "lat=" + position.coords.latitude;
    var lon= "lon=" + position.coords.longitude;
    
   // $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
       //$("#data").html("latitude: " + lat + "<br>longitude: " + lon);
      getWeather(lat, lon);
  });    
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  
  $("#tempunit").click(function(){
      var currentTempUnit = $("#tempunit").text();
      var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempunit").text(newTempUnit);
    if (newTempUnit == "F"){
      var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
    }    
  });
}) 
 
function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;   
  $.ajax({
    url: urlString, success: function (result) {
      $("#city").text(result.name + ", ");
      $("#country").text(result.sys.country);
      currentTempInCelsius = Math.round(result.main.temp * 10) / 10;
       $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#tempunit").text(tempUnit);
     $("#desc").text(result.weather[0].main);
     // $("#icon").append(result.weather[0].icon);
    // $("#icon").html($("<img>").attr("src", weather[0].icon));
     $("#icon").html('<img src =' + "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366021399" + result.weather[0].icon + ".png" + '>');                 
 //$('#icon').append("<img src='http://openweathermap.org/img/w/" + result.weather[0].icon + ".png'>");
    }
    
  });
 }