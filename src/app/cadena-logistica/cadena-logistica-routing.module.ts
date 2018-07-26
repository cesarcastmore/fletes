import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalComponent } from './personal/personal.component';
import { CentrosComponent } from './centros/centros.component';
import { ViajesComponent } from './viajes/viajes.component';

const routes: Routes = [{
  path: 'centros',
  component: CentrosComponent
},{
  path: 'viajes',
  component: ViajesComponent
},{
  path: 'personal',
  component: PersonalComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadenaLogisticaRoutingModule { }
