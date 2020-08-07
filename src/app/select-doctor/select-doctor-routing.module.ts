import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectDoctorPage } from './select-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: SelectDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectDoctorPageRoutingModule {}
