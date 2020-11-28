import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/pages/home/home.module').then(mod => mod.HomeModule) },
  { path: 'editor', loadChildren: () => import('./components/pages/editor/editor.module').then(mod => mod.EditorModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
