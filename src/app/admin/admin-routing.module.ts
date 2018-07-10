import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { MenusComponent } from './menus/menus.component';

const routes: Routes = [{
  path: 'usuarios',
  component: UsuariosComponent
}, {
  path: 'menus',
  component: MenusComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
