import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserReservationDetailsPage } from './user-reservation-details.page';

const routes: Routes = [
  {
    path: '',
    component: UserReservationDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserReservationDetailsPageRoutingModule {}
