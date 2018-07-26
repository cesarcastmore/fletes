import { Component, OnInit, TemplateRef } from '@angular/core';
import { Empresa } from '../../data/empresa';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { FirestoreService, Query } from '../../services/firestore.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  modalRef: BsModalRef;

  displayedColumns = ['nombre', 'rfc', 'actions'];
  public dataSource: Empresa[];
  public empresaForm: FormGroup;


  constructor(private modalService: BsModalService,
    private fb: FormBuilder,
    private fs: FirestoreService) {}

  ngOnInit() {
    this.fs.setEntity('empresas');

    this.fs.getAll().valueChanges().subscribe(empresas => {
      console.log("USERS", empresas);
      this.dataSource = empresas;
    })

  }


  nuevo(template: TemplateRef < any > ) {

    this.empresaForm = this.fb.group({
      id: new FormControl(),
      nombre: new FormControl(),
      rfc: new FormControl()
    })


    this.modalRef = this.modalService.show(template);
  }


  public guardar() {
    this.fs.setEntity('empresas');

    this.fs.create(this.empresaForm.value).subscribe(data => {

    });

  }

}
