import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { FirestoreService, Query } from '../../services/firestore.service';
import { GoogleApiService } from '../../services/google-api.service';
import { Http } from '@angular/http';

import { Empresa } from '../../data/empresa';
import { Centro } from '../../data/centro';
import { Usuario } from '../../data/usuario';

declare let google;
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})
export class CentrosComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  public map: any;


  public centroForm: FormGroup;
  public centros: Observable < any[] > ;
  public usuarios: Usuario[];

  public empresa: Empresa;

  public search: Observable < any > ;
  public asyncSelected: any;


  public selected: any;

  public current_location: any;
  public status: string = 'list';
  



  constructor(public fb: FormBuilder,
    private fs: FirestoreService,
    private http: Http) {


    this.search = Observable.create((observer: any) => {
      observer.next(this.asyncSelected);
    }).mergeMap((token: string) => { return this.getResultsAsObservable(token) });

  }

  ngOnInit() {

    this.centroForm = this.fb.group({
      nombre: new FormControl(),
      calle: new FormControl(),
      numero: new FormControl(),
      colonia: new FormControl(),
      codigo_postal: new FormControl(),
      ciudad: new FormControl(),
      municipio: new FormControl(),
      estado: new FormControl(),
      id: new FormControl(),
      personal_id: new FormControl()
    });

    let query: Query = new Query();
    this.empresa = JSON.parse(localStorage.getItem("empresa"));

    this.fs.setEntity('centros');
    query._where('empresa_id', '==', this.empresa.id);
    this.centros = this.fs.filter(query).valueChanges();


    this.fs.setEntity('usuarios');
    this.fs.filter(query).valueChanges().subscribe(usrs => {
      this.usuarios = usrs;
    });


  }


  //Agregar nueva direccion

  public nuevo() {
    this.status = 'new';

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.initMap(position);
      });
    }



  }


  //Guardar centros
  public guardar() {
    this.fs.setEntity('centros');


    let centro: Centro = this.centroForm.value;
    centro.empresa_id = this.empresa.id;
    centro.location = this.current_location;
    console.log("CENTRO", centro);



    if (this.status == 'new') {
      this.fs.create(centro).subscribe(centro => {
        this.centroForm.reset();
        this.status = 'list';

      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.initMap(position);
        });
      }

    } else if (this.status == 'edit') {
      console.log("update", centro);
      this.fs.update(centro).subscribe(centro => {
        this.centroForm.reset();
        this.status = 'list';
      });


      this.asyncSelected = null;



    }

  }


  public initMap(position: any) {

    console.log(position);

    this.current_location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };



  }

  public getResultsAsObservable(token): Observable < any[] > {

    let geolocate = "https://maps.googleapis.com/maps/api/geocode/json";
    let key = "AIzaSyBeOdQqfn5NvUzfEwD5Q5haXiBRR9wr7Eo";

    return this.http.get(geolocate + "?address=" + token + "&key=" + key)
      .map(item => {
        console.log(item.json().results);
        return item.json().results;
      });

  }


  public onChoose(event) {
    this.selected = event;
    this.current_location = this.selected.item.geometry.location;


    let centro: Centro = new Centro();
    centro.createCentro(this.selected.item.address_components);

    this.centroForm.patchValue({
      calle: centro.calle,
      numero: centro.numero,
      colonia: centro.colonia,
      municipio: centro.municipio,
      estado: centro.estado,
      pais: centro.pais,
      codigo_postal: centro.codigo_postal,
      nombre: this.selected.item.formatted_address
    });


  }


  public remove(centro: Centro): void {
    this.fs.setEntity('centros');
    console.log("entroooo");
    this.fs.remove(centro);

  }


  public edit(centro: Centro) {
    console.log("EDIT", centro)
    this.centroForm.patchValue(centro);
    this.current_location = centro.location;
    this.status = 'edit';
  }


  public getUsuario(personal_id: string): string {
    for (let u of this.usuarios) {
      if (personal_id == u.id) {
        return u.nombre;
      }
    }
  }


}
