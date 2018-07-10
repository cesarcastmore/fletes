import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public userForm: FormGroup;
  public registerForm: FormGroup;

  public isSignIn: boolean = true;


  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private fs: FirestoreService) {
    this.userForm = this.fb.group({
      email: new FormControl(),
      password: new FormControl(),
    });

    this.registerForm = this.fb.group({
      correo: new FormControl(),
      contrasenia: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      uid: new FormControl()
    });



  }

  ngOnInit() {

  }

  onSignin() {
    this.authService.signInWithEmail(this.userForm.value.email, this.userForm.value.password)
      .then(data => {})
      .catch(error => {});
  }


  public onRegister() {


    this.authService.signUp(this.registerForm.value.correo, this.registerForm.value.contrasenia)
      .then(data => {

        this.registerForm.patchValue({
          uid: data.user.uid
        });

        this.fs.setEntity("usuarios");
        this.fs.create(this.registerForm.value).subscribe(data => {
          console.log(data);
        });



      })
      .catch(error => {});

  }

}
