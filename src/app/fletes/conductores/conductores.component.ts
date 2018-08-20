import { Component, OnInit } from '@angular/core';
import { FirestoreService, Query } from '../../services/firestore.service';

import { Usuario, Empresa } from '../../data';


@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css']
})
export class ConductoresComponent implements OnInit {

  public displayedColumns = ['nombre', 'apellido', 'correo'];
  public empresa: Empresa;
  public dataSource: any;


  constructor(private fs: FirestoreService) {}

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem("empresa"));

    this.fs.setEntity('usuarios');

    let query: Query = new Query();

    query._where("empresa_id", "==", this.empresa.id);
    query._where("permiso", "==", "Fletes Conductor");
    this.dataSource = this.fs.filter(query).valueChanges();



    
  }

}
