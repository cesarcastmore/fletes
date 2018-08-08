import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Viaje } from '../../../data';
import { FirestoreService, Query } from '../../../services/firestore.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ViajesComponent } from '../viajes.component';

@Component({
  selector: 'viaje-camion',
  templateUrl: './camion.component.html',
  styleUrls: ['./camion.component.css']
})
export class CamionComponent implements OnInit, AfterViewInit {

  public viaje: Viaje;

  tipos_camiones: any[] = [{
    id: '1TON',
    nombre: 'Camion 1 ton',
    largo: 2
  }, {
    id: '3.5TON-PF-3MTS',
    nombre: 'Camion 3.5 Toneladas Plataforma 3mts',
    largo: 3
  }, {
    id: '3.5TON-CS-3MTS',
    nombre: 'Camion 3.5 Toneladas Caja Seca 3mts',
    largo: 3
  }, {
    id: '3.5TON-PF-6MTS',
    nombre: 'Camion 3.5 Toneladas Plataforma 6mts',
    largo: 6
  }, {
    id: '3.5TON-CS-6MTS',
    nombre: 'Camion 3.5 Toneladas Caja Seca 6mts',
    largo: 6
  }, {
    id: '8TON-R-PF-8MTS',
    nombre: 'Camion Rabon 8 Tonelada Plataforma 8mts',
    largo: 8
  }, {
    id: '8TON-R-CS-8MTS',
    nombre: 'Camion Rabon 8 tonelada Caja Seca 8mts',
    largo: 8
  }, {
    id: '14TON-T-PF-9MTS',
    nombre: 'Camion Torton 14 tonelada Plataforma 9mts',
    largo: 9
  }, {
    id: '14TON-T-CS-9MTS',
    nombre: 'Camion Torton 14 tonelada Caja Seca 9mts',
    largo: 9
  }, {
    id: '20TON-TR-PF-40FT',
    nombre: 'Trailer 20 toneladas Plataforma 40\'',
    largo: 12.18
  }, {
    id: '20TON-TR-CS-40FT',
    nombre: 'Trailer 20 toneladas Caja Seca 40\'',
    largo: 12.18
  }, {
    id: '22TON-TR-PF-48FT',
    nombre: 'Trailer 22 toneladas Plataforma 48\'',
    largo: 14.63
  }, {
    id: '22TON-TR-CS-48FT',
    nombre: 'Trailer 22 toneladas Caja Seca 48\'',
    largo: 14.63
  }, {
    id: '25TON-TR-CS-53FT',
    nombre: 'Trailer 25 toneladas Caja Seca 53\'',
    largo: 16.15
  }];


  public camionForm: FormGroup;

  @ViewChild('canvasEl') canvasEl: ElementRef;

  private altura_camion: number = 2.4;
  private ancho_camion: number = 2.5;

  private factor: number = 50;


  private context: CanvasRenderingContext2D;

  constructor(private fs: FirestoreService,
    public fb: FormBuilder) {
    this.camionForm = this.fb.group({
      tipo_camion: new FormControl(),
      largo: new FormControl(),
      ancho: new FormControl(),
      alto: new FormControl(),
      peso: new FormControl(),
      cantidad: new FormControl(),
      presupuesto: new FormControl()
    });

  }

  ngOnInit() {

    this.camionForm.valueChanges.subscribe(val => {

      if (val.ancho && val.largo && val.alto && val.cantidad && val.cantidad && val.tipo_camion) {
        console.log(val);
        let tipo_camion: any = this.tipos_camiones.find(tc => tc.id == val.tipo_camion);

        let camion = {
          largo: tipo_camion.largo * this.factor,
          ancho: this.ancho_camion * this.factor,
          altura: this.altura_camion * this.factor
        };

        let tarima = {
          largo: this.camionForm.value.largo * this.factor,
          ancho: this.camionForm.value.ancho * this.factor,
          altura: this.camionForm.value.altura * this.factor,

        }

        this.draw(camion, tarima, this.camionForm.value.cantidad);
      }
    });


  }


  public setViaje(viaje: Viaje) {
    this.viaje = viaje;
  }


  ngAfterViewInit() {
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

  }


  private draw(camion: any, tarima: any, cantidad: number) {

    //dibujar camion
    this.context.clearRect(0, 0, 1000, 1000);

    this.context.beginPath();

    this.context.rect(0, 0, camion.largo, camion.ancho);
    this.context.stroke();


    let posX: number = 0;
    let posY: number = 0;
    for (let i = 0; i < cantidad; i++) {

      if (posY + tarima.ancho <= camion.ancho) {

        this.context.rect(posX, posY,  tarima.largo, tarima.ancho);
        this.context.stroke();

        posY = posY + tarima.ancho;
      } else if (posY + tarima.ancho > camion.ancho) {

        posY = 0;
        posX = posX + tarima.largo;

        this.context.rect(posX, posY,  tarima.largo, tarima.ancho);
        this.context.stroke();
        posY = posY + tarima.ancho;

      }




    }


  }

}
