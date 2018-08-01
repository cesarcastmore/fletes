import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConductoresComponent } from './conductores/conductores.component';
import { CamionesComponent } from './camiones/camiones.component';
import { AsignacionComponent } from './asignacion/asignacion.component';

const routes: Routes = [{
  path: 'conductores',
  component: ConductoresComponent
},{
  path: 'camiones',
  component: CamionesComponent
},
{
  path: 'asignacion',
  component: AsignacionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FletesRoutingModule { }
