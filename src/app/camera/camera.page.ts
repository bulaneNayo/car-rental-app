import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  photo: SafeResourceUrl;

  constructor(private camera: Camera) {}

  takePicture(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      allowEdit: false
    }).then((res)=> {
      this.photo = res;
    }).catch(err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
