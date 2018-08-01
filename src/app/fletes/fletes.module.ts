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
import { AgmDirectionModule } from 'agm-direction';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FletesRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBeOdQqfn5NvUzfEwD5Q5haXiBRR9wr7Eo'
    }),
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [ConductoresComponent, CamionesComponent, AsignacionComponent]
})
export class FletesModule {}
