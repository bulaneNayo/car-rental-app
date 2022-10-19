import { Component, OnInit } from '@angular/core';
import { collection,collectionData, Firestore, query } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.page.html',
  styleUrls: ['./reservations.page.scss'],
})
export class ReservationsPage implements OnInit {
  public vehicles: Observable<any>;
  public searchField: FormControl;

  constructor(private dataService:DataService,private router:Router,private firestore:Firestore) { 
    this.searchField = new FormControl('');
  }
  
  
  ngOnInit() {
    this.vehicles=this.dataService.getData()
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );
    const vehicles = collectionData(query(collection(this.firestore, 'vehicles')));
    this.vehicles = combineLatest([vehicles, searchTerm$]).pipe(
      map(([vehicles, searchTerm]) =>
      vehicles.filter(
          (vehicle) =>
            searchTerm === '' ||
            vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }
  book(){
    //event.stopPropagation();
    this.router.navigateByUrl('/booking-details',{replaceUrl: true})
  }

  }
  

 
