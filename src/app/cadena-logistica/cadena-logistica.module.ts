import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadenaLogisticaRoutingModule } from './cadena-logistica-routing.module';
import { PersonalComponent } from './personal/personal.component';
import { CentrosComponent } from './centros/centros.component';
import { ViajesComponent } from './viajes/viajes.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AgmCoreModule } from '@agm/core';
import { MatTableModule } from '@angular/material/table';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    CadenaLogisticaRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    FormsModule,
    AgmCoreModule
    .forRoot({
      apiKey: 'AIzaSyBeOdQqfn5NvUzfEwD5Q5haXiBRR9wr7Eo'
    }),
    MatTableModule,
    Angular2FontawesomeModule,
    MatMenuModule
  ],
  declarations: [PersonalComponent, CentrosComponent, ViajesComponent]
})
export class CadenaLogisticaModule {}
