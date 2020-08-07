import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectDoctorPage } from './connect-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectDoctorPageRoutingModule {}
