import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [{
  path: 'usuarios',
  component: UsuariosComponent
}, {
  path: 'empresas',
  component: EmpresasComponent
}, {
  path: 'perfil',
  component: PerfilComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
