import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkerEditorPageRoutingModule } from './worker-editor-routing.module';

import { WorkerEditorPage } from './worker-editor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkerEditorPageRoutingModule
  ],
  declarations: [WorkerEditorPage]
})
export class WorkerEditorPageModule {}
