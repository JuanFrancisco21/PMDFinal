import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkerCreatorPage } from './worker-creator.page';

const routes: Routes = [
  {
    path: '',
    component: WorkerCreatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkerCreatorPageRoutingModule {}
