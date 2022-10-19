import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { combineLatest, Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { collection, collectionData, Firestore, query } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

interface company {
  name: string;
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {
 public companies: Observable<any>;
  public searchField: FormControl;
  
  constructor(private dataService:DataService,private router:Router,
    private loadingController:LoadingController,private firestore:Firestore) {
      this.searchField = new FormControl('');
   }

   async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

 async ngOnInit() {
   this.openLoader()
    this.companies=this.dataService.getAllCompanies()
    this.closeLoading()

    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );
    const companies = collectionData(query(collection(this.firestore, 'companies')));
    this.companies = combineLatest([companies, searchTerm$]).pipe(
      map(([companies, searchTerm]) =>
      companies.filter(
          (company) =>
            searchTerm === '' ||
            company.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }
  getLocation(event){
    event.stopPropagation()
    this.router.navigateByUrl('/location')
  }
  //fetela leqepheng la likoloi tse amang le company eno feela hore lo etsa bookings
  openItemClick(event){
    event.stopPropagation();
    this.router.navigateByUrl('/reservations',{replaceUrl: true})
  }
  }

