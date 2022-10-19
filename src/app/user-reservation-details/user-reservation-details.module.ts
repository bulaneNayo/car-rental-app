import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserReservationDetailsPageRoutingModule } from './user-reservation-details-routing.module';

import { UserReservationDetailsPage } from './user-reservation-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserReservationDetailsPageRoutingModule
  ],
  declarations: [UserReservationDetailsPage]
})
export class UserReservationDetailsPageModule {}
