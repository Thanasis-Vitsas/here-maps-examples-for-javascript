markersArray = [];
polygon = {};

//Initialize communication with the platform
// In your own code, replace variable your.apikey with your own apikey
var platform = new H.service.Platform({
  'apikey': your.apikey
});
var defaultLayers = platform.createDefaultLayers({
    lg: 'el-GR'
	});

//Initialize a map - this map is centered over Athens
var map = new H.Map(document.getElementById('mapContainer'),
  defaultLayers.vector.normal.map,{
  center: {lat: 37.98, lng: 23.72},
  zoom: 10,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);


//Remove default mapsettings control to create a custom one (this part can be skipped)
    ui.removeControl("mapsettings");
    // create custom mapsettings control with Truck vector
    var ms = new H.ui.MapSettingsControl( {
      layers : [{
            label: "Truck Restrictions", layer: defaultLayers.vector.normal.truck
        },
        {
            label: "Traffic", layer: defaultLayers.vector.normal.traffic
        },
        {
            label: "Traffic Incidents", layer: defaultLayers.vector.normal.trafficincidents
        }
        ]
      });
    ui.addControl("mapsettings",ms);

    //Reset the mapsettings and scalebar locations on the map
    var mapSettings = ui.getControl('mapsettings');
    var scalebar = ui.getControl('scalebar');

    mapSettings.setAlignment('bottom-right');
    scalebar.setAlignment('bottom-right');






