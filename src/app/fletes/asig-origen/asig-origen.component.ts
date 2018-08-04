import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Centro } from '../../data/centro';
import { FirestoreService, Query } from '../../services/firestore.service';
import { Empresa } from '../../data/empresa';


@Component({
  selector: 'asig-origen',
  templateUrl: './asig-origen.component.html',
  styleUrls: ['./asig-origen.component.css']
})
export class AsigOrigenComponent implements OnInit {
  @Input() origen: Centro;
  @Output() cerrarOrigen = new EventEmitter();

  public empresa: Empresa;

  constructor(private fs: FirestoreService) {}

  ngOnInit() {

    this.fs.setEntity('empresas');
    this.fs.get(this.origen.empresa_id).subscribe(empresa=>{
      this.empresa= empresa;

    });


  }

  public cerrar() {
    this.cerrarOrigen.emit(true);

  }



}
