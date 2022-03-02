import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkerCreatorPageRoutingModule } from './worker-creator-routing.module';

import { WorkerCreatorPage } from './worker-creator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    WorkerCreatorPageRoutingModule
  ],
  declarations: [WorkerCreatorPage]
})
export class WorkerCreatorPageModule { }
