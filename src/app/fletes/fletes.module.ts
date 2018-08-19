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
import { AsigDestinoComponent } from './asignacion/asig-destino/asig-destino.component';
import { AsigOrigenComponent } from './asignacion/asig-origen/asig-origen.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AsigCentroComponent } from './asignacion/asig-centro/asig-centro.component';

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
    ReactiveFormsModule,
    AgmDirectionModule,
    ModalModule.forRoot()

  ],
  declarations: [ConductoresComponent, CamionesComponent, AsignacionComponent, AsigDestinoComponent, AsigOrigenComponent, AsigCentroComponent]
})
export class FletesModule {}
