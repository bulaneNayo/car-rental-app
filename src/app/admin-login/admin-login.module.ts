import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminLoginPageRoutingModule } from './admin-login-routing.module';

import { AdminLoginPage } from './admin-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AdminLoginPageRoutingModule
  ],
  declarations: [AdminLoginPage]
})
export class AdminLoginPageModule {}
