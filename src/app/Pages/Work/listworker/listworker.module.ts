import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListworkerPageRoutingModule } from './listworker-routing.module';

import { ListworkerPage } from './listworker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListworkerPageRoutingModule
  ],
  declarations: [ListworkerPage]
})
export class ListworkerPageModule {}
