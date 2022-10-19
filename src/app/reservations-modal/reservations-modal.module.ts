import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationsModalPageRoutingModule } from './reservations-modal-routing.module';

import { ReservationsModalPage } from './reservations-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationsModalPageRoutingModule
  ],
  declarations: [ReservationsModalPage]
})
export class ReservationsModalPageModule {}
