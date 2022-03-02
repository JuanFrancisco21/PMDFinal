import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./Pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'addwork',
    loadChildren: () => import('./Pages/Work/addwork/addwork.module').then(m => m.AddworkPageModule)
  },
  {
    path: 'worker-creator',
    loadChildren: () => import('./Pages/worker/worker-creator/worker-creator.module').then(m => m.WorkerCreatorPageModule)
  },
  {
    path: 'worker-editor',
    loadChildren: () => import('./Pages/worker/worker-editor/worker-editor.module').then( m => m.WorkerEditorPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
