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

// Create the map object with a center and zoom level and default layer.
let map = L.map('mapid',{
    center:[43.7,-79.3],
    zoom:11,
    layers:[streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the toronto neighborhoods GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/zaraxkhan/mapping-earthquake/main/torontoNeighborhoods.json";

//style var
let myStyle={
    color:"blue",
    weight: 1,
    fillColor:"yellow"
};
//Grabbing GeoJSON data
d3.json(torontoHoods).then(function(data){
    console.log(data);
    L.geoJson(data,{
        style: myStyle,
        onEachFeature: function(feature,layer){
            layer.bindPopup("<h3> Neighborhood: "+ feature.properties.AREA_NAME+"</h3>")
        }
    }).addTo(map);
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);