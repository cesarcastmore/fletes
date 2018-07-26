import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConductoresComponent } from './conductores/conductores.component';
import { CamionesComponent } from './camiones/camiones.component';

const routes: Routes = [{
  path: 'conductores',
  component: ConductoresComponent
},{
  path: 'camiones',
  component: CamionesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FletesRoutingModule { }
