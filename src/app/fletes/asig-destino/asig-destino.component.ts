import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Centro } from '../../data/centro';
import { FirestoreService, Query } from '../../services/firestore.service';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'asig-destino',
  templateUrl: './asig-destino.component.html',
  styleUrls: ['./asig-destino.component.css']
})
export class AsigDestinoComponent implements OnInit {

  @Input() destino_id: string;
  @Output() elegirDestino = new EventEmitter();

  public destino: Centro;
  public modalRef: BsModalRef;


  constructor(private fs: FirestoreService,
    private modalService: BsModalService) {}

  ngOnInit() {

    this.fs.setEntity('centros');
    this.fs.get(this.destino_id).subscribe(destino => {
      this.destino = destino;
    });


  }


  public elegir() {
  	this.elegirDestino.emit(this.destino);

  }

 public openModal(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template);
  }



}
