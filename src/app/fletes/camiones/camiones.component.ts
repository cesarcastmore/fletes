import { Component, OnInit, TemplateRef } from '@angular/core';
import { Empresa, Unidad, Camion } from '../../data';
import { FirestoreService, Query } from '../../services/firestore.service';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { camiones} from '../../cadena-logistica/viajes/camion/camiones';

@Component({
  selector: 'app-camiones',
  templateUrl: './camiones.component.html',
  styleUrls: ['./camiones.component.css']
})
export class CamionesComponent implements OnInit {

  public displayedColumns = ['nombre', 'placa', 'actions'];
  public empresa: Empresa;
  public dataSource: Unidad[];
  public unidadForm: FormGroup;
  modalRef: BsModalRef;

  public camiones: Camion[]=camiones;


  constructor(private modalService: BsModalService,
    private fs: FirestoreService,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.empresa = JSON.parse(localStorage.getItem("empresa"));
    this.fs.setEntity('unidades');

    this.fs.getAll().valueChanges().subscribe(unidades => {
      this.dataSource = unidades;
    })
  }



  nuevo(modal: any) {


    this.unidadForm = this.fb.group({
      nombre: new FormControl(),
      placa: new FormControl(),
      empresa_id: new FormControl(),
      id: new FormControl(),
      camion_id: new FormControl()
    });

    modal.show();


  }


  public guardar(lgModal: any) {
    this.fs.setEntity('unidades');

    let unidad: Unidad = this.unidadForm.value;
    unidad.empresa_id = this.empresa.id;



    this.fs.create(unidad).subscribe(data => {
      lgModal.hide();

    });

  }


  public borrar(element: any){
    console.log(element);
    this.fs.setEntity('unidades');

    this.fs.remove(element);

  }

}
