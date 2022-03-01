import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./Pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'addwork',
    loadChildren: () => import('./Pages/Work/addwork/addwork.module').then( m => m.AddworkPageModule)
  }

  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
