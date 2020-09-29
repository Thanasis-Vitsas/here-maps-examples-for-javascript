

 // Adds a polygon to the map
 
function addPolygonToMap() {
  var lineString = new H.geo.LineString(
            markersArray,
          'values lat lng alt'
  );

  //remove previews polygon if exists
  var objects = map.getObjects().filter(function(item) {
    return item.type === H.map.Object.Type.SPATIAL;
  });

  //console.log(objects);
  map.removeObjects(objects);
  //create polygon
  polygon = new H.map.Polygon(lineString, {
    style: {
        fillColor: 'rgba(0, 0, 255, 0.3)',
        strokeColor: 'rgba(0, 0, 255, 0.6)',
        lineWidth: 3
    }
  });
            
  // ensure that the polygon can receive drag events
  polygon.draggable = true;

  // create indexes to markers for each polygon's vertice which will be used for dragging
  polygon.getGeometry().getExterior().eachLatLngAlt(function(lat, lng, alt, index) {
    markerS.setData({'verticeIndex': index})

  });


  map.addObject(polygon);

}