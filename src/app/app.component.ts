import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FirestoreService, Query } from './services/firestore.service';

import { Menu } from './data/menu';
import { Empresa } from './data/empresa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'app';
  public isAuthenticated = false;
  private user: any;

  public menus: Menu[];
  public empresa: Empresa;




  constructor(private authService: AuthService,
    private fs: FirestoreService) {

    this.authService.authState().subscribe(auth => {



      if (auth) {
        this.isAuthenticated = true;

        this.fs.setEntity('usuarios');

        let query: Query = new Query();
        query._where('uid', '==', this.authService.user.uid);

        this.fs.filter(query).valueChanges().subscribe(data => {
          this.user = data[0];
          console.log(this.user);

          this.menus = this.getMenus(this.user.permiso);
          console.log(this.menus);

          this.fs.setEntity('empresas');

          this.fs.get(this.user.empresa_id).subscribe(empresa => {
            this.empresa = empresa;
            localStorage.setItem("empresa", JSON.stringify(this.empresa));

          });

        });
      } else {
        this.isAuthenticated = false;
      }
    });

  }


  public getMenus(permiso: string): Menu[] {

    console.log(permiso);

    if (permiso == 'Administrador') {
      return [{
        icon: 'fa-user',
        nombre: 'Perfil',
        url: 'admin/perfil'
      }, {
        icon: 'fa-building',
        nombre: 'Empresas',
        url: 'admin/empresas'
      }, {
        icon: 'fa-users',
        nombre: 'Usuarios',
        url: 'admin/usuarios'
      }]
    } else if (permiso == 'Fletes Administrador') {
      return [{
        icon: 'fa-user',
        nombre: 'Perfil',
        url: 'admin/perfil'
      }, {
        icon: 'fa-users',
        nombre: 'Conductores',
        url: 'fletes/conductores'
      }, {
        icon: 'fa-briefcase',
        nombre: 'Asignacion Viajes',
        url: 'fletes/asignacion'
      },{
        icon: 'fa-truck',
        nombre: 'Camiones',
        url: 'fletes/camiones'
      }]
    } else if (permiso == 'Cadena Administrador') {
      return [{
        icon: 'fa-user',
        nombre: 'Perfil',
        url: 'admin/perfil'
      }, {
        icon: 'fa-map-marked',
        nombre: 'Centros',
        url: 'cadena-logistica/centros'
      }, {
        icon: 'fa-people-carry',
        nombre: 'Personal',
        url: 'cadena-logistica/personal'
      }, {
        icon: 'fa-map',
        nombre: 'Viajes',
        url: 'cadena-logistica/viajes'
      }]
    }



  }







}
