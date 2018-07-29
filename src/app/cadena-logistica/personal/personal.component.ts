import { Component, OnInit } from '@angular/core';
import { FirestoreService, Query } from '../../services/firestore.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { Usuario } from '../../data/usuario';
import { Empresa } from '../../data/empresa';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  displayedColumns = ['nombre', 'apellido', 'correo', 'permiso', 'empresa'];
  public dataSource: any;
  public empresas: Empresa[];
  public empresa: Empresa;

  constructor(private fs: FirestoreService) {


  }

  ngOnInit() {

    this.empresa = JSON.parse(localStorage.getItem("empresa"));

    this.fs.setEntity('usuarios');

    let query: Query = new Query();

    query._where("empresa_id", "==", this.empresa.id);
    query._where("permiso", "==", "Cadena Recepcionista");
    this.dataSource = this.fs.filter(query).valueChanges();


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



  public getEmpresa(empresa_id: string) {
    console.log("entroo")
    for (let empresa of this.empresas) {
      if (empresa.id == empresa_id) {
        return empresa.nombre;
      }
    }
  }
}
