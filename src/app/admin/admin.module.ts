import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MenusComponent } from './menus/menus.component';

import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule
  ],
  declarations: [UsuariosComponent, MenusComponent]
})
export class AdminModule { }
