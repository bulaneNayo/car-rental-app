import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { ReservationsPageRoutingModule } from './reservations-routing.module';

import { ReservationsPage } from './reservations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ReservationsPageRoutingModule
  ],
  declarations: [ReservationsPage]
})
export class ReservationsPageModule {}
