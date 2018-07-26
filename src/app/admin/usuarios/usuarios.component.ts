import { Component, OnInit } from '@angular/core';
import { FirestoreService, Query } from '../../services/firestore.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { Usuario } from '../../data/usuario';
import { Empresa } from '../../data/empresa';


//https://angular.io/guide/animations
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  displayedColumns = ['nombre', 'apellido', 'correo', 'permiso', 'empresa', 'actions'];
  public dataSource: any;
  public empresas: Empresa[];



  permisos: string[] = [
    'Administrador',
    'Fletes Administrador',
    'Fletes Conductor',
    'Cadena Administrador',
    'Cadena Recepcionista'
  ]

  ;


  constructor(private fs: FirestoreService) {
    this.fs.setEntity('usuarios');
    this.dataSource = this.fs.getAll().valueChanges();


  }

  ngOnInit() {
    this.fs.setEntity('empresas');
    this.fs.getAll().valueChanges().subscribe(data => {
      this.empresas = data;

    });
  }

  public guardarPermiso(usuario: Usuario, permiso: string) {

    usuario.permiso = permiso;
    this.fs.setEntity('usuarios');
    this.fs.update(usuario).subscribe(data => {

    });
  }

  public guardarEmpresa(usuario: Usuario, empresa: Empresa) {

    usuario.empresa_id = empresa.id;
    usuario['nombre_empresa'] = empresa.nombre;

    this.fs.setEntity('usuarios');
    this.fs.update(usuario).subscribe(data => {

    });

  }


  public print() {
    console.log("print");
  }


  public getEmpresa(empresa_id: string) {
    console.log("entroo")
    for (let empresa of this.empresas) {
      if (empresa.id == empresa_id) {
        return empresa.nombre;
      }
    }
  }



}
