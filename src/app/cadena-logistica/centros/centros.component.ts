import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { FirestoreService, Query } from '../../services/firestore.service';
import { GoogleApiService } from '../../services/google-api.service';
import { Http } from '@angular/http';

import { Empresa } from '../../data/empresa';
import { Centro } from '../../data/centro';
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

  public isNew: boolean = false;
  @ViewChild('map') mapElement: ElementRef;
  public map: any;


  public centroForm: FormGroup;
  public centros: Observable < any[] > ;

  public empresa: Empresa;

  search: Observable < any > ;
  public asyncSelected: any;


  public selected: any;

  public current_location: any;


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
      estado: new FormControl()

    });

    let query: Query = new Query();
    this.empresa = JSON.parse(localStorage.getItem("empresa"));

    this.fs.setEntity('centros');
    query._where('empresa_id', '==', this.empresa.id);
    this.centros = this.fs.filter(query).valueChanges();





  }


  //Agregar nueva direccion

  public nuevo() {
    this.isNew = true;

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

    this.fs.create(centro).subscribe(centro => {
      this.centroForm.reset();
      this.isNew = false;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.initMap(position);
        });
      }


    });



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
}
