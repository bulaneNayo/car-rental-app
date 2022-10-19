import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController,ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService, Vehicle } from '../services/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id:string;
  vehicle: Vehicle=null;
  vehicles:Observable<any>;

  constructor(private dataService: DataService,
    private toastController: ToastController,
    private modalController:ModalController,
    private alertController:AlertController,
    private loadingController:LoadingController) { }

 async ngOnInit() {/* 
    this.dataService.getDataById(this.id).subscribe(res=>{
      this.vehicle.name */
      const loading = await this.loadingController.create();
      await loading.present();
      this.vehicles=this.dataService.getData();
      await loading.dismiss();     
  
  }

  async update(){
    this.dataService.updateData(this.vehicle);
    const toast = await this.toastController.create({
      message:'Details updated',
      duration: 1000
    })
    toast.present();

  }

  /* async delete(){
    this.dataService.deleteData(this.vehicle);
     this.modalController.dismiss();
  }
 */
  /* async delete(){
    const alert = await this.alertController.create({
      cssClass: 'myAlert',
      header: 'Are you sure you want to delete this vehicle?',
       buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
         text: 'Confirm',
         handler: (vehcile) =>{
          this.dataService.deleteData(vehicle);
         }
       }
      ]
   });
   await  alert.present();

  }
 */
}