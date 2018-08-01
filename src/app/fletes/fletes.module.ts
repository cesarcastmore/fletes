import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FletesRoutingModule } from './fletes-routing.module';
import { ConductoresComponent } from './conductores/conductores.component';
import { CamionesComponent } from './camiones/camiones.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AsignacionComponent } from './asignacion/asignacion.component';

@NgModule({
  imports: [
    CommonModule,
    FletesRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  declarations: [ConductoresComponent, CamionesComponent, AsignacionComponent]
})
export class FletesModule {}
