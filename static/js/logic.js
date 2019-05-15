// Creating map object
var myMap = L.map("map", {
  center: [38.88, -77.11],
  zoom: 11
});

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
//console.log(url)


d3.json(url).then(function(response){

    var markers = L.markerClusterGroup();

    console.log(response.length)

    for (var i = 0; i < response.length; i++) {

      try {
        // code that throws the error
        var latitude = response[i].lat;
        var longitude = response[i].lgn;

        // L.circle([latitude,longitude], {
        //   color: 'red',
        //   fillColor: '#f03',
        //   fillOpacity: 0.5,
        //   radius: 50
        //     }).addTo(myMap);

      // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker([latitude, longitude])
          .bindPopup("<b> auction location: </b>" + response[i].auction_location + "<hr>" + "<b> auction time:  </b>" + response[i].auction_time + "<hr>" + "<b> auction date: </b>" + response[i].auction_date + "<hr>" + "<b> link to listing: </b>" + response[i].listing_url + "<hr>" + "<b> estimated equity: </b>" + "$"+response[i].estimated_equity + "<hr>")
        );

      } catch (e) {
        console.log(e);
        // exit the loop
        break;
      }
    }

    // Add our marker cluster layer to the map
    myMap.addLayer(markers);

  });
