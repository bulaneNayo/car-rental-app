import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateHehiclesPageRoutingModule } from './update-hehicles-routing.module';

import { UpdateHehiclesPage } from './update-hehicles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateHehiclesPageRoutingModule
  ],
  declarations: [UpdateHehiclesPage]
})
export class UpdateHehiclesPageModule {}
