import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationsModalPage } from './reservations-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationsModalPageRoutingModule {}
