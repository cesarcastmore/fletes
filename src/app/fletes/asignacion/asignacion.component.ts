import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../data/usuario';
import { FirestoreService, Query } from '../../services/firestore.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Viaje } from '../../data/viaje';
import { Observable } from 'rxjs';
import { Empresa } from '../../data/empresa';
import { Centro } from '../../data/centro';

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
  public viajes: Viaje[];

  public selectedViajes: Viaje[];

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
    this.fs.getAll().valueChanges().subscribe(vs => {
      this.viajes = vs;
    });



  }



  public initMap(position: any) {

    console.log(position);

    this.current_location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };



  }



  public origen: Centro;
  public destino: Centro;
  public showViajesCentro(viaje: Viaje) {

    this.selectedViajes = this.viajes.map(v => {

      if (viaje.origen_id == v.origen_id) {
        console.log("entroo");
        return v;
      }
    });


  }

  public elegirViaje(viaje: Viaje) {
    this.fs.setEntity('centros');
    this.fs.get(viaje.origen_id).subscribe(origen => {
      this.origen = origen;
    });

    this.fs.get(viaje.destino_id).subscribe(destino => {
      this.destino = destino;
    });

    
  }


  public cerrarViaje() {
    this.selectedViajes = [];
  }


}
