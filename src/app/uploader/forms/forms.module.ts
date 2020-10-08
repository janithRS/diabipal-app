import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsPageRoutingModule } from './forms-routing.module';
import { FormsPage } from './forms.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [FormsPage]
})
export class FormsPageModule {}
