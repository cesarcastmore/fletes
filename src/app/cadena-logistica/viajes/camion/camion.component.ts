import { Component, OnInit, AfterViewInit, ViewChild, ElementRef,
Output, EventEmitter } from '@angular/core';
import { Viaje, Camion, Tarima } from '../../../data';
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

  @Output() onSave =  new EventEmitter();


  public camion: Camion = {
    largo: 0,
    ancho: 0,
    altura: 0,
    peso: 0,
    nombre: null
  }

  public peso_consumido: number = 0;

  tipos_camiones: any[] = [{
    id: '1TON',
    nombre: 'Camion 1 ton',
    largo: 2,
    peso: 1000
  }, {
    id: '3.5TON-PF-3MTS',
    nombre: 'Camion 3.5 Toneladas Plataforma 3mts',
    largo: 3
  }, {
    id: '3.5TON-CS-3MTS',
    nombre: 'Camion 3.5 Toneladas Caja Seca 3mts',
    largo: 3,
    peso: 3500
  }, {
    id: '3.5TON-PF-6MTS',
    nombre: 'Camion 3.5 Toneladas Plataforma 6mts',
    largo: 6,
    peso: 3500
  }, {
    id: '3.5TON-CS-6MTS',
    nombre: 'Camion 3.5 Toneladas Caja Seca 6mts',
    largo: 6,
    peso: 3500

  }, {
    id: '8TON-R-PF-8MTS',
    nombre: 'Camion Rabon 8 Tonelada Plataforma 8mts',
    largo: 8,
    peso: 8000

  }, {
    id: '8TON-R-CS-8MTS',
    nombre: 'Camion Rabon 8 tonelada Caja Seca 8mts',
    largo: 8,
    peso: 8000

  }, {
    id: '14TON-T-PF-9MTS',
    nombre: 'Camion Torton 14 tonelada Plataforma 9mts',
    largo: 9,
    peso: 9000

  }, {
    id: '14TON-T-CS-9MTS',
    nombre: 'Camion Torton 14 tonelada Caja Seca 9mts',
    largo: 9,
    peso: 14000

  }, {
    id: '20TON-TR-PF-40FT',
    nombre: 'Trailer 20 toneladas Plataforma 40\'',
    largo: 12.18,
    peso: 20000
  }, {
    id: '20TON-TR-CS-40FT',
    nombre: 'Trailer 20 toneladas Caja Seca 40\'',
    largo: 12.18,
    peso: 20000
  }, {
    id: '22TON-TR-PF-48FT',
    nombre: 'Trailer 22 toneladas Plataforma 48\'',
    largo: 14.63,
    peso: 22000
  }, {
    id: '22TON-TR-CS-48FT',
    nombre: 'Trailer 22 toneladas Caja Seca 48\'',
    largo: 14.63,
    peso: 22000
  }, {
    id: '25TON-TR-CS-53FT',
    nombre: 'Trailer 25 toneladas Caja Seca 53\'',
    largo: 16.15,
    peso: 25000
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
      altura: new FormControl(),
      peso: new FormControl(),
      cantidad: new FormControl(),
      presupuesto: new FormControl()
    });

  }


  public tarima: Tarima;

  ngOnInit() {

    this.camionForm.valueChanges.subscribe(val => {

      let tipo_camion: any = this.tipos_camiones.find(tc => tc.id == val.tipo_camion);


      this.camion.largo = tipo_camion.largo * this.factor;
      this.camion.ancho = this.ancho_camion * this.factor;
      this.camion.altura = this.altura_camion * this.factor;
      this.camion.peso = tipo_camion.peso;
      this.camion.nombre = tipo_camion.id;

      if (val.ancho && val.largo && val.altura && val.cantidad &&
        val.cantidad && val.tipo_camion && val.peso) {


        this.peso_consumido = tipo_camion.peso - (val.cantidad * val.peso);

        this.tarima = {
          largo: this.camionForm.value.largo * this.factor,
          ancho: this.camionForm.value.ancho * this.factor,
          altura: this.camionForm.value.altura * this.factor,
          peso: this.camionForm.value.peso

        }



        this.draw(this.camion, this.tarima, this.camionForm.value.cantidad);
      } else {
        this.context.clearRect(0, 0, 1000, 1000);
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

        this.context.rect(posX, posY, tarima.largo, tarima.ancho);
        this.context.stroke();

        posY = posY + tarima.ancho;
      } else if (posY + tarima.ancho > camion.ancho) {

        posY = 0;
        posX = posX + tarima.largo;

        this.context.rect(posX, posY, tarima.largo, tarima.ancho);
        this.context.stroke();
        posY = posY + tarima.ancho;

      }

    }

  }



  private guardar() {
    this.viaje.camion = this.camion;

    let tarimas: Tarima[]= [];
    tarimas.push(this.tarima);
    this.viaje.tarimas= tarimas;

    this.fs.setEntity('viajes');
    this.fs.update(this.viaje).subscribe(viaje => {
      this.onSave.emit(true);
    });
  }

}
