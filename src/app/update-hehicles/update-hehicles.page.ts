import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { UpdateModalPage } from '../update-modal/update-modal.page';

@Component({
  selector: 'app-update-hehicles',
  templateUrl: './update-hehicles.page.html',
  styleUrls: ['./update-hehicles.page.scss'],
})
export class UpdateHehiclesPage implements OnInit {
  public vehicles: Observable<any>;

  constructor(private dataService:DataService,private modalController:ModalController) { }
  async openDetails(event,vehicle){
    event.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateModalPage,
      componentProps:{ id:vehicle.id},
      breakpoints:[0,0.5,0.8],
      initialBreakpoint:0.5
    });
    modal.present(); 

  }
  

  ngOnInit() {
    this.vehicles=this.dataService.getData()

  }

}
