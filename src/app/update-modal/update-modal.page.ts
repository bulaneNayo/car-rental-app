import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService,Vehicle} from '../services/data.service';

/* export interface Vehicle{
  id?: string;
  name: string;
  price: string;
  model:string
  mileage: string;
  image?: string;
  company: string;
  
} */

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.page.html',
  styleUrls: ['./update-modal.page.scss'],
})
export class UpdateModalPage implements OnInit {
@Input() id:string;
vehicle=null;
name:string;
  constructor(private dataService:DataService,private modalController:ModalController) { }

  ngOnInit() {
  this.vehicle= this.dataService.getDataById(this.id);
  
  }
 async updateVehicleDetails(){
    this.dataService.updateData(this.vehicle)
  }
  async deleteVehicleDetails(){
    this.dataService.deleteData(this.vehicle);
  }
}
