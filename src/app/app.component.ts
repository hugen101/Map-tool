import { Component } from '@angular/core';
import { MarkerService } from './services/marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MarkerService]
})
export class AppComponent {
  // zoom level
  zoom: number = 10;
  // start position
  lat: number = 51.678418;
  lng: number = 7.809007;
  // Values
  markerName: string;
  markerLat: string;
  markerLng: string;
  markerDraggable: string;
  // Markers
  markers: marker[];

  constructor(private _markerService: MarkerService) {
    this.markers = this._markerService.getMarkers();
  }

  clickedMarker(marker: marker, index: number) {
    console.log('Clicked Marker: '+marker.name+' at index' + index);
  }

  mapClicked($event:any) {
    console.log("Map Clicked");
    var newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }
    console.log(newMarker);
    this.markers.push(newMarker);
  }

  markerDragEnd(marker:any, $event:any) {
    console.log('dragEnd', marker, $event);

    var updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    }

    var newLat = $event.coords.lat;
    var newLng = $event.coords.lng;

    this._markerService.updateMarker(updMarker, newLat, newLng);
  }

  addMarker() {
    console.log('Adding MArker');
    if(this.markerDraggable == 'yes'){
      var isDraggable = true;
    } else {
      var isDraggable = false;
    }

    var newMarker = {
      name: this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable:isDraggable
    }

    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
  }

  removeMarker(marker) {
    for(var i = 0 ; i < this.markers.length; i++){
      if(marker.let == this.markers[i].lat && marker.lng == this.markers[i].lng){
        this.markers.splice(i, 1);
      }
    }
    this._markerService.removeMarker(marker);
  }
}

// Marker Type
interface marker {
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}
