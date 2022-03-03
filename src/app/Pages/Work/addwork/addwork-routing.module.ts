import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddworkPage } from './addwork.page';

const routes: Routes = [
  {
    path: '',
    component: AddworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddworkPageRoutingModule {}
