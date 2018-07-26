import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';



const Rutas: Routes = [{
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule'
},{
  path: 'fletes',
  loadChildren: 'app/fletes/fletes.module#FletesModule'
},{
  path: 'cadena-logistica',
  loadChildren: 'app/cadena-logistica/cadena-logistica.module#CadenaLogisticaModule'
}];


@NgModule({
  imports: [
    RouterModule.forRoot(Rutas)
  ],
  declarations: []
})
export class AppRoutingModule {}
