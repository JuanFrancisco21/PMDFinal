import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListworkerPage } from './listworker.page';

const routes: Routes = [
  {
    path: '',
    component: ListworkerPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListworkerPageRoutingModule {}
