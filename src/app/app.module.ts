import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent, MenuHoverDirective } from './menu/menu.component';
import { AuthService } from './services/auth.service';
import { FirestoreService } from './services/firestore.service';
import { GoogleApiService } from './services/google-api.service';


import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { HttpModule, JsonpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    MenuHoverDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, AppRoutingModule, // imports firebase/storage only neede
    RouterModule,
    BrowserAnimationsModule,
    Angular2FontawesomeModule,
    HttpModule
  ],
  providers: [AuthService, FirestoreService, GoogleApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
