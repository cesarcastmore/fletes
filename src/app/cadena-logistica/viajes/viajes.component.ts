import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService, Query } from '../../services/firestore.service';
import { Observable } from 'rxjs';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Viaje, Centro, Empresa } from '../../data';
import { CamionComponent } from './camion/camion.component';
@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent implements OnInit {
  public status: string = 'list';

  public centros: Centro[];

  public empresa: Empresa = JSON.parse(localStorage.getItem("empresa"));
  public directionsForm: FormGroup;
  public current_location: any;
  public viajes: Observable < any > ;

  public origen: any;
  public destino: any;


  constructor(private fs: FirestoreService,
    public fb: FormBuilder) {
    this.directionsForm = this.fb.group({
      origen_id: new FormControl(),
      destino_id: new FormControl(),
      fecha_inicio: new FormControl(new Date()),
      fecha_fin: new FormControl(),
      id: new FormControl()
    })

  }

  ngOnInit() {

    this.fs.setEntity('centros');
    let query: Query = new Query();
    query._where('empresa_id', '==', this.empresa.id);
    this.fs.filter(query).valueChanges().subscribe(centros => {
      this.centros = centros;
    });

    this.fs.setEntity('viajes');
    this.viajes = this.fs.filter(query).valueChanges();


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.initMap(position);
      });
    }




  }

  public detectChanges() {

    this.directionsForm.valueChanges.subscribe((selectedValue) => {

      let form: any = this.directionsForm.value;
      if (form.origen_id && form.destino_id) {
        for (let centro of this.centros) {
          if (form.origen_id == centro.id) {
            this.origen = centro.location;
          }
          if (form.destino_id == centro.id) {
            this.destino = centro.location;
          }
        }
      }

    });

  }




  public initMap(position: any) {

    this.current_location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };




  }

  public nuevo(): void {
    this.directionsForm.reset();

    this.status = 'new';
    this.detectChanges();

  }


  public guardar(): void {
    this.fs.setEntity('viajes');

    this.directionsForm.patchValue({
      fecha_inicio: new Date(this.directionsForm.value.fecha_inicio),
      fecha_fin: new Date(this.directionsForm.value.fecha_fin),

    })

    let viaje: Viaje = this.directionsForm.value;
    viaje.empresa_id = this.empresa.id;

    viaje.origen = this.origen;
    viaje.destino = this.destino;



    if (this.status == 'new') {
      this.fs.create(viaje).subscribe(viaje => {
        this.directionsForm.reset();
      });
    } else if (this.status == 'edit') {
      this.fs.update(viaje).subscribe(viaje => {});
    }

    this.status = 'list';

  }


  public edit(viaje: Viaje) {
    this.directionsForm = this.fb.group(viaje);



    this.directionsForm.patchValue({
      fecha_inicio: this.getFecha(viaje.fecha_inicio).toISOString().substring(0, 10),
      fecha_fin: this.getFecha(viaje.fecha_fin).toISOString().substring(0, 10),

    })

    this.origen = this.centros.find(centro => centro.id == viaje.origen_id).location;
    this.destino = this.centros.find(centro => centro.id == viaje.destino_id).location;

    this.status = 'edit';
    this.detectChanges();


  }


  public getNombreCentro(id: string): string {
    for (let i = 0; i < this.centros.length; i++) {
      if (this.centros[i].id == id) {
        return this.centros[i].nombre;
      }
    }
  }


  public getLocationCentro(id: string): any {
    for (let i = 0; i < this.centros.length; i++) {
      if (this.centros[i].id == id) {
        return this.centros[i].location;
      }
    }
  }


  public remove(viaje: Viaje): void {
    this.fs.setEntity('viajes');
    this.fs.remove(viaje);

  }


  public getFecha(date: any) {
    let fecha: Date = date.toDate();
    return fecha;
  }


  public viaje: Viaje;

  //Metodo que prepara para agregar el camion
  public prepararCamion(viaje: Viaje) {
    this.status = 'camion';
    this.viaje = viaje;


  }



}
