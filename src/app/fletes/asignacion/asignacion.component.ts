import { Component, OnInit } from '@angular/core';
import { FirestoreService, Query } from '../../services/firestore.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Centro, Empresa, Viaje, Usuario, Camion } from '../../data';
import * as firebase from 'firebase/app';
import { camiones } from '../../cadena-logistica/viajes/camion/camiones';

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
  public camiones: Camion[] = camiones;

  public selectedViajes: Viaje[] = [];

  public mostrar_direcciones: boolean = false;
  public mostrar_viajes: boolean = false;

  public origen: Centro;
  public destino: Centro;

  public filtroViajesForm: FormGroup;

  labelOptions = {
    'background-color': 'green'
  }

  constructor(private fb: FormBuilder,
    private fs: FirestoreService) {
    this.empresa = JSON.parse(localStorage.getItem("empresa"));


    this.filtroViajesForm = this.fb.group({
      conductor_id: new FormControl(),
      fecha_inicio: new FormControl(),
      camion_id: new FormControl()
    });


    this.filtroViajesForm.valueChanges.subscribe((data: Viaje) => {

      this.fs.setEntity('viajes');
      let query: Query = new Query();
      console.log("DATA ", data);

      if (data.fecha_inicio) {
        query._where('fecha_inicio', '>', new Date(data.fecha_inicio));
      }

      if (data.camion_id) {
        query._where('camion_id', '==', data.camion_id);
      }

      this.fs.filter(query).valueChanges().subscribe(vs => {
        vs['visible'] = true;
        this.viajes = vs;
      });
    });

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
      vs['visible'] = true;
      this.viajes = vs;
    });



  }


  //Inicializar el mapa

  public initMap(position: any) {

    this.current_location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };



  }



  //Mostrar los centro al momento de darle clic a icono de google maps
  public showViajesCentro(viaje: Viaje) {

    this.fs.setEntity('centros');
    this.fs.get(viaje.origen_id).subscribe(origen => {
      this.origen = origen;

    });

    for (let i = 0; i < this.viajes.length; i++) {
      if (viaje.id != this.viajes[i].id) {
        this.viajes[i]['visible'] = false;
      }
    }


    this.selectedViajes = this.viajes.filter(v => {
      if (viaje.origen_id == v.origen_id) {
        v['is_show'] = true;
        return v;
      }
    });

    this.mostrar_viajes = true;



  }

  //Colocar la ruta desde el origen a su destino  
  public mostrarRuta(destino: Centro) {
    this.destino = destino;
    this.mostrar_direcciones = true;

    for (let i = 0; i < this.selectedViajes.length; i++) {
      if (destino.id != this.selectedViajes[i].destino_id) {
        this.selectedViajes[i]['is_show'] = false;
      }
    }

  }


  //Volvera mostrar todos los centros o los origenes
  public cerrarOrigen(event) {
    this.selectedViajes = [];
    this.mostrar_direcciones = false;
    this.mostrar_viajes = false;

    for (let i = 0; i < this.viajes.length; i++) {
      this.viajes[i]['visible'] = true;

    }
  }

  //Esto es para quitar los destinos y volver a escoger 
  public cerrarDestino(event) {
    this.mostrar_direcciones = false;
    for (let i = 0; i < this.selectedViajes.length; i++) {
      this.selectedViajes[i]['is_show'] = true;

    }

  }



}
