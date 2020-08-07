import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectDoctorPageRoutingModule } from './select-doctor-routing.module';

import { SelectDoctorPage } from './select-doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectDoctorPageRoutingModule
  ],
  declarations: [SelectDoctorPage]
})
export class SelectDoctorPageModule {}
