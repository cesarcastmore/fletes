import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../data/usuario';
import { FirestoreService, Query } from '../../services/firestore.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Viaje } from '../../data/viaje';
import { Observable } from 'rxjs';
import { Empresa } from '../../data/empresa';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit {
  public current_location: any;


  public conductores: Observable < any > ;
  public empresa: Empresa;
  public servicioForm: FormGroup;
  public viajes:  Observable < any > ;

  constructor(private fb: FormBuilder,
    private fs: FirestoreService) {
    this.empresa = JSON.parse(localStorage.getItem("empresa"));

  }

  ngOnInit() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.initMap(position);
      });
    }

    this.fs.setEntity('usuarios');
    let query: Query = new Query();
    query._where('permiso', '==', 'Fletes Conductor');
    query._where('empresa_id', '==', this.empresa.id);

    this.conductores = this.fs.filter(query).valueChanges();

    this.fs.setEntity('viajes');
    this.viajes = this.fs.getAll().valueChanges();



  }



  public initMap(position: any) {

    console.log(position);

    this.current_location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };



  }

}
