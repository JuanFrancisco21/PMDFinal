import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkerEditorPage } from './worker-editor.page';

const routes: Routes = [
  {
    path: '',
    component: WorkerEditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkerEditorPageRoutingModule {}
