import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import {Geolocation, Geoposition} from '@ionic-native/geolocation/ngx';

declare const google;
@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  map: any;
  marker: any;
  latitude: any = ' ';
  longitude: any= ' ';
  timestamp: any= ' ';

  constructor(public plaform: Platform, public geo: Geolocation) {

  this.plaform.ready().then(()=>{

    const mapoptions = {
      center: {lat:23.2366,lng:79.3822},
      zoom: 7
    };

    this.map = new google.maps.Map(document.getElementById('map'),mapoptions);
    this.getLocation();
  });
 }
  getLocation() {
     const ref = this;
     const watch =this.geo.watchPosition();
     watch.subscribe((position)=>{

    const gps = new google.maps.LatLng((position as Geoposition).coords.latitude,(position as Geoposition).coords.longitude);

       if(ref.marker == null){

         ref.marker = new google.maps.Marker({
           position: gps,
           map : ref.map,
           title : 'my position'
         });

       }
       else{
         ref.marker.setPosition(gps);
       }
      ref.map.panTo(gps);
      ref.latitude = (position as Geoposition).coords.latitude.toString();
      ref.longitude = (position as Geoposition).coords.longitude.toString();
      ref.timestamp = (new Date((position as Geoposition).timestamp)).toString();
     });
  }


 ngOnInit() {
  }

}
