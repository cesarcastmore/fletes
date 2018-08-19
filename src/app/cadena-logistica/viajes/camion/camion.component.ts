import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Viaje, Camion, Tarima } from '../../../data';
import { FirestoreService, Query } from '../../../services/firestore.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ViajesComponent } from '../viajes.component';
import { camiones } from './camiones';

@Component({
  selector: 'viaje-camion',
  templateUrl: './camion.component.html',
  styleUrls: ['./camion.component.css']
})
export class CamionComponent implements OnInit, AfterViewInit {

  @Input() viaje: Viaje;
  @Output() onSave = new EventEmitter();
    @Output() onCancel = new EventEmitter();



  public camion: Camion;
  public camiones: Camion[] = camiones;
  public peso_consumido: number = 0;

  public presupuesto: number = 0;



  public tarimaForm: FormGroup;

  @ViewChild('canvasEl') canvasEl: ElementRef;


  private factor: number = 50;


  private context: CanvasRenderingContext2D;

  constructor(private fs: FirestoreService,
    public fb: FormBuilder) {
    this.tarimaForm = this.fb.group({
      camion_id: new FormControl(),
      largo: new FormControl(),
      ancho: new FormControl(),
      altura: new FormControl(),
      peso: new FormControl(),
      cantidad: new FormControl(),
      presupuesto: new FormControl()
    });

  }


  public tarima: Tarima;
  public loaded: boolean = false;

  ngOnInit() {

    if (this.viaje.camion_id) {

      this.tarima = this.viaje.tarimas[0];

      this.tarimaForm.patchValue({
        camion_id: this.viaje.camion_id,
        presupuesto: this.viaje.presupuesto,
        altura: this.tarima.altura,
        ancho: this.tarima.ancho,
        largo: this.tarima.largo,
        cantidad: this.tarima.cantidad,
        peso: this.tarima.peso
      });
      this.camion = camiones.find(tc => tc.id == this.viaje.camion_id);
      this.peso_consumido = this.camion.peso - (this.tarima.peso * this.tarima.cantidad);


    }

    this.loaded = true;




    this.tarimaForm.valueChanges.subscribe(val => {

      this.camion = camiones.find(tc => tc.id == val.camion_id);

      if (val.ancho && val.largo && val.altura && val.cantidad &&
        val.cantidad && val.camion_id && val.peso) {
        this.peso_consumido = this.camion.peso - (val.cantidad * val.peso);

        this.tarima = {
          largo: this.tarimaForm.value.largo,
          ancho: this.tarimaForm.value.ancho,
          altura: this.tarimaForm.value.altura,
          peso: this.tarimaForm.value.peso,
          cantidad: this.tarimaForm.value.cantidad
        }

        this.draw(this.camion, this.tarima, this.tarimaForm.value.cantidad);
        
      } else {
        this.context.clearRect(0, 0, 1000, 1000);
      }
    });


  }



  ngAfterViewInit() {
    this.context = (this.canvasEl.nativeElement as HTMLCanvasElement).getContext('2d');

  }


  private draw(camion: any, tarima: any, cantidad: number) {

    this.context.clearRect(0, 0, 1000, 1000);

    this.context.beginPath();

    let largo_camion: number = camion.largo * this.factor;
    let ancho_camion: number = camion.ancho * this.factor;

    this.context.rect(0, 0, largo_camion, ancho_camion);
    this.context.stroke();


    let posX: number = 0;
    let posY: number = 0;
    for (let i = 0; i < cantidad; i++) {

      let ancho_tarima: number = tarima.ancho * this.factor;
      let largo_tarima: number = tarima.largo * this.factor;

      if (posY + ancho_tarima <= ancho_camion) {

        this.context.rect(posX, posY, largo_tarima, ancho_tarima);
        this.context.stroke();
        posY = posY + ancho_tarima;

      } else if (posY + ancho_tarima > ancho_camion) {

        posY = 0;
        posX = posX + largo_tarima;

        this.context.rect(posX, posY, largo_tarima, ancho_tarima);
        this.context.stroke();
        posY = posY + ancho_tarima;

      }

    }

  }



  private guardar() {

    let tarimas: Tarima[] = [];


    tarimas.push(this.tarima);
    this.viaje.tarimas = tarimas;

    this.viaje.camion_id = this.tarimaForm.value.camion_id;
    this.viaje.presupuesto = this.tarimaForm.value.presupuesto;

    this.fs.setEntity('viajes');
    this.fs.update(this.viaje).subscribe(viaje => {
      this.onSave.emit(true);
    });
  }


  public getPorcentajeArea(): number {

    let area_tarima: number = this.tarima.cantidad * (this.tarima.ancho * this.tarima.largo);
    let area_camion: number = this.camion.ancho * this.camion.largo;

    return (area_tarima / area_camion) * 100;

  }


  private cancelar(){

    this.onCancel.emit(true);

  }

}
