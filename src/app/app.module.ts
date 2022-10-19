import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { Calendar } from '@ionic-native/calendar/ngx'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule } from '@angular/forms'
import { environment } from 'src/environments/environment'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideStorage, getStorage } from '@angular/fire/storage'

import { FIREBASE_OPTIONS } from '@angular/fire/compat'

import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
//import { Capacitor } from '@capacitor/core';

import { Geolocation } from '@ionic-native/geolocation/ngx'
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx'
import { Camera } from '@ionic-native/camera/ngx'
import { BatteryStatus } from '@ionic-native/battery-status/ngx'
import { Network } from '@ionic-native/network/ngx'
import { Dialogs } from '@ionic-native/dialogs/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    Calendar,
    Geolocation,
    Camera,
    BatteryStatus,
    Dialogs,
    Camera,
    Network,
    NativeGeocoder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
