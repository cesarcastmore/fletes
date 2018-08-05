import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Centro } from '../../data/centro';
import { FirestoreService, Query } from '../../services/firestore.service';
import { Empresa } from '../../data/empresa';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'asig-origen',
  templateUrl: './asig-origen.component.html',
  styleUrls: ['./asig-origen.component.css']
})
export class AsigOrigenComponent implements OnInit {
  @Input() origen: Centro;
  @Output() cerrarOrigen = new EventEmitter();

  public empresa: Empresa;
  public modalRef: BsModalRef;

  constructor(private fs: FirestoreService,
    private modalService: BsModalService) {}

  ngOnInit() {

    this.fs.setEntity('empresas');
    this.fs.get(this.origen.empresa_id).subscribe(empresa => {
      this.empresa = empresa;

    });


  }

  public cerrar() {
    this.cerrarOrigen.emit(true);

  }

  public openModal(template: TemplateRef < any > ) {
    this.modalRef = this.modalService.show(template);
  }

}
