// Add console.log to check to see if our code is working.
console.log("working");

// Create the tile layer that will be the background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Add base layer that holds both maps
let baseMaps={
    "Street": streets,
    "Satellite Streets": satelliteStreets
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
  };

// Create the map object with a center and zoom level and default layer.
let map = L.map('mapid',{
    center:[39.5,-98.5],
    zoom:3,
    layers:[streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);

// Accessing the  GeoJSON URL
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//style
function myStyle(feature) {
    return {
    color:"#000000" ,
    fillColor: getColor(feature.properties.mag),
    opacity:1 ,
    fillOpacity: 1,
    stroke: true,
    weight:.5 ,
    radius: getRadius(feature.properties.mag) ,
    };
}

// get radius
function getRadius(magnitude){
    if (magnitude === 0){
        return 1;
    }
    return magnitude *4;
}

// get color
function getColor(magnitude){
    if (magnitude > 5){
        return "#ea2c2c";
    }
    if (magnitude > 4){
        return "#ea822c";
    }
    if (magnitude > 3){
        return "#ee9c00";
    }
    if (magnitude > 2){
        return "#eecc00";
    }
    if (magnitude > 1){
        return "#d4ee00";
    }
    return "#98ee00";
}

//Grabbing GeoJSON data
d3.json(earthquakeData).then(function(data){
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            console.log(data);
            return L.circleMarker(latlng);
        },
    style: myStyle,
    onEachFeature: function(feature,layer){
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br> Location: "+ feature.properties.place);
    }
    }).addTo(earthquakes);
    earthquakes.addTo(map);
    }
);



// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);