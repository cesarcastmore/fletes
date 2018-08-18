
import {Camion } from './camion';
import {Tarima } from './tarima';

export class Viaje {
  public fecha_inicio: Date;
  public fecha_fin: Date;
  public origen_id: string;
  public destino_id: string;
  public empresa_id: string;
  public id: string;

  public origen: any;
  public destino: any;
  public camion_id: string;

  public presupuesto: number;
  public tarimas: Tarima[]; 


  


  constructor() {

  }

}
