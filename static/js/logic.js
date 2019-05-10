// Creating map object
var myMap = L.map("map", {
  center: [38.88, -77.11],
  zoom: 11
});

console.log("myMap");
var circle = L.circle([38.80462,-77.04535], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);

var circle1 = L.circle([38.75131,-77.47908], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);


var circle2 = L.circle([38.81627,-76.75117], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);

var circle3 = L.circle([38.84343,-77.3088], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);

var circle4 = L.circle([38.96052,-77.08489], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);


var circle5 = L.circle([38.95931,-77.08444], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);

var circle6 = L.circle([38.751308,-77.47908], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);

var circle7 = L.circle([38.20099,-77.58743], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);


var circle8 = L.circle([39.1158,-77.5631], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);


var circle9 = L.circle([51.508, -0.11], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);

var circle10 = L.circle([38.42276,-77.40869], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);

var circle11 = L.circle([38.88987,-77.08319], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);

var circle12 = L.circle([38.91042,-76.98622], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);


var circle13 = L.circle([38.5299,-76.97846], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);

var circle14 = L.circle([38.94946,-77.08073], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);


var circle15 = L.circle([39.08351,-77.15099], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);


var circle16 = L.circle([38.5299,-76.978462], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);


var circle17 = L.circle([39.12132,-77.23799], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);

var circle18 = L.circle([38.94588,-77.0978], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 50
}).addTo(myMap);


// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
// var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
// var date = "$where=created_date between'2016-01-10T12:00:00' and '2017-01-01T14:00:00'";
// var complaint = "&complaint_type=Rodent";
// var limit = "&$limit=10000";

// // Assemble API query URL
// var url = baseURL + date + complaint + limit;

//set up to get csv data
var url = "/foreclosure_data"
console.log(url)

// Grab the data with d3
d3.json(url, function(response) {

  console.log(response)

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  console.log(response.lat)

  for (var i = 0;; i++) {
    try {
      // code that throws the error
      var latitude = response.lat[i];
      var longitude = response.lgn[i];

      // L.circle([latitude,longitude], {
      //   color: 'red',
      //   fillColor: '#f03',
      //   fillOpacity: 0.5,
      //   radius: 50
      //     }).addTo(myMap);

    // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([latitude, longitude])
        .bindPopup(response.auction_location[i] + "<hr>" + response.auction_time[i] + "<hr>" + response.city_url[i] + "<hr>" + response.auction_date[i] + "<hr>" + response.listing_url[i] + "<hr>" + response.estimated_equity[i] + "<hr>")
      );

    } catch (e) {
      // exit the loop
      break; 
    }
  }

  // Loop through data
  // for (var i = 0; i < 10; i++) {

  //   // Set the data location property to a variable
  //   var latitude = response.lat[i];
  //   var longitude = response.lgn[i];

  //   console.log(latitude)
  //   console.log(longitude)

  //   L.circle([latitude,longitude], {
  // color: 'red',
  // fillColor: '#f03',
  // fillOpacity: 0.5,
  // radius: 50
  //   }).addTo(myMap);

  //   // // Check for location property
  //   // if (latitude) {

  //   //   // Add a new marker to the cluster group and bind a pop-up
  //   //   markers.addLayer(L.marker([longitude, latitude]));
  //   // //     .bindPopup(response[i].descriptor + "<hr>" + response[i].cross_street_1 + "<br>" + response[i].cross_street_2));
  //   //  }

  // }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
