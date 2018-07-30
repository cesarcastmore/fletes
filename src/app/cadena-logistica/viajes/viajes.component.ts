import { Component, OnInit } from '@angular/core';
import { Centro } from '../../data/centro';
import { FirestoreService, Query } from '../../services/firestore.service';
import { Observable } from 'rxjs';
import { Empresa } from '../../data/empresa';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

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

  public origen: any;
  public destino: any;


  constructor(private fs: FirestoreService,
    public fb: FormBuilder) {
    this.directionsForm = this.fb.group({
      origen_id: new FormControl(),
      destino_id: new FormControl()
    })

  }

  ngOnInit() {

    this.fs.setEntity('centros');
    let query: Query = new Query();
    query._where('empresa_id', '==', this.empresa.id);
    this.fs.filter(query).valueChanges().subscribe(centros => {
      this.centros = centros;
    });


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.initMap(position);
      });
    }

    this.directionsForm.valueChanges.subscribe((selectedValue) => {

      let form: any = this.directionsForm.value;

      if (form.origen_id && form.destino_id) {
        for (let centro of this.centros) {

          if (form.origen_id == centro.id) {
            console.log("ORIGEN", centro.location);

            this.origen = centro.location;
          }

          if (form.destino_id == centro.id) {
            console.log("DESTINO", centro.location);

            this.destino = centro.location;
          }

        }
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

}
