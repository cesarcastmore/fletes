import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';



const Rutas: Routes = [{
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule'
}];


@NgModule({
  imports: [
    RouterModule.forRoot(Rutas)
  ],
  declarations: []
})
export class AppRoutingModule {}
