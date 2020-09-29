var groupof = new H.map.Group({
			// mark the object as volatile for the smooth dragging
    		volatility: true
  			});
// Add the group to the map object (created earlier):
map.addObject(groupof);

map.addEventListener('tap', event => { 
					var position = map.screenToGeo(
				    event.currentPointer.viewportX,
				    event.currentPointer.viewportY);
		    //create a marker at the clicked position on the map
		    markerS = new H.map.Marker(position);
		    markerS.draggable = true;
    		

		    groupof.addObject(markerS);
		    
		    markersArray.push(position.lat,position.lng,0); 
		  	


			//polygon created when we place the third marker
			addPolygonToMap(); 

			

		  	  // disable the default draggability of the underlying map
			  // and calculate the offset between mouse and target's position
			  // when starting to drag a marker object:
			  map.addEventListener('dragstart', function(ev) {
			    var target = ev.target,
			        pointer = ev.currentPointer;
			    if (target instanceof H.map.Marker) {
			      var targetPosition = map.geoToScreen(target.getGeometry());
			      target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
			      behavior.disable();
			    }
			  }, false);

			  // re-enable the default draggability of the underlying map
			  // when dragging has completed
			  map.addEventListener('dragend', function(ev) {
			    var target = ev.target;
			    if (target instanceof H.map.Marker) {
			      behavior.enable();
			    }
			  }, false);

			  // Listen to the drag event and move the position of the marker and reshape polygon
			  // as necessary
			   map.addEventListener('drag', function(ev) {
			    var target = ev.target,
			        pointer = ev.currentPointer;
			        
        			
			    if (target instanceof H.map.Marker) {
			    	geoPoint = map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y);
			      target.setGeometry(geoPoint);
			      //console.log(Object.keys(polygon).length);
			      if (Object.keys(polygon).length>0){
			      	//change polygon

			        geoLineString = polygon.getGeometry().getExterior()

			      	// set new position for polygon's vertice
				     geoLineString.removePoint(ev.target.getData()['verticeIndex']);
				     geoLineString.insertPoint(ev.target.getData()['verticeIndex'], geoPoint);
				     polygon.setGeometry(new H.geo.Polygon(geoLineString));
			 		 }
		      	 
			      // stop propagating the drag event, so the map doesn't move
    			  ev.stopPropagation();
			    }
			  }, false);

});

// event listener for markers group to change the cursor to pointer
groupof.addEventListener('pointerenter', function(evt) {
document.body.style.cursor = 'pointer';
}, true);

// event listener for markers group to change the cursor to default
groupof.addEventListener('pointerleave', function(evt) {
document.body.style.cursor = 'default';
}, true);

 


