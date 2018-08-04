import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Centro } from '../../data/centro';
import { FirestoreService, Query } from '../../services/firestore.service';



@Component({
  selector: 'asig-destino',
  templateUrl: './asig-destino.component.html',
  styleUrls: ['./asig-destino.component.css']
})
export class AsigDestinoComponent implements OnInit {

  @Input() destino_id: string;
  @Output() elegirDestino = new EventEmitter();

  public destino: Centro;


  constructor(private fs: FirestoreService) {}

  ngOnInit() {

    this.fs.setEntity('centros');
    this.fs.get(this.destino_id).subscribe(destino => {
      this.destino = destino;
    });


  }


  public elegir() {
  	this.elegirDestino.emit(this.destino);

  }



}
