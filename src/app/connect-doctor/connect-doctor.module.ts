import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectDoctorPageRoutingModule } from './connect-doctor-routing.module';

import { ConnectDoctorPage } from './connect-doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectDoctorPageRoutingModule
  ],
  declarations: [ConnectDoctorPage]
})
export class ConnectDoctorPageModule {}
