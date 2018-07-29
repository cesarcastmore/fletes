import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FirestoreService, Query } from '../../services/firestore.service';
import { Usuario } from '../../data/usuario';
import { Empresa } from '../../data/empresa';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public empresa: Empresa;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private fs: FirestoreService) {

    this.fs.setEntity('usuarios');

    let query: Query = new Query();
    query._where('uid', '==', this.authService.user.uid);

    this.fs.filter(query).valueChanges().subscribe(data => {
      let user: Usuario = data[0];
      this.perfilForm = this.fb.group(user);

    });


  }


  ngOnInit() {

    this.empresa = JSON.parse(localStorage.getItem("empresa"));


  }

  public save() {
    this.fs.setEntity('usuarios');
    this.fs.update(this.perfilForm.value).subscribe(data => {

    });

  }

}
