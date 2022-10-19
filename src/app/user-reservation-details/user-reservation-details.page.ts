import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user-reservation-details',
  templateUrl: './user-reservation-details.page.html',
  styleUrls: ['./user-reservation-details.page.scss'],
})
export class UserReservationDetailsPage implements OnInit {
  cars = [];
  vehicles=[];
  constructor(private dataService:DataService,private alertController:AlertController,private router:Router) { }

  ngOnInit() {
    this.dataService.getCars();
    this.dataService.getReservations();
  }
  
  async Logout(){
    this.dataService.logout();
    this.router.navigateByUrl('/',{replaceUrl: true})
  }

  async addFeeback(){
    const alert = await this.alertController.create({
      header: 'Feedback',
      inputs:[
        {
          name:'name',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
         text: 'Submit',
         handler: (res) =>{
           this.dataService.addFeeback({name:res.name})
         }
       }
      ]
   });
   await  alert.present();
  }

}
