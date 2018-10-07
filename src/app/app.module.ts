import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBrwM2O5x54kOJhw6fm7HXY1F5YHNkgQo8',
      authDomain: 'fbwithangular.firebaseapp.com',
      databaseURL: 'https://fbwithangular.firebaseio.com',
      projectId: 'fbwithangular',
      storageBucket: 'fbwithangular.appspot.com',
      messagingSenderId: '222739242410'
    }),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
