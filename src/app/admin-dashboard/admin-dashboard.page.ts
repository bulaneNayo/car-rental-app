import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { collection, collectionData, Firestore, query } from '@angular/fire/firestore';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ReservationsModalPage } from '../reservations-modal/reservations-modal.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  vehicles=[];
  public searchField: FormControl;
  
  constructor(private dataService: DataService,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController:ModalController,
    private firestore:Firestore,
    private router: Router
    )
     {
      this.searchField = new FormControl('');
      this.dataService.getData().subscribe(res=>{
        this.vehicles=res;
      });
      }

  getVehicles(){
    this.dataService.getData().subscribe(res=>{
      console.log(res);
    });
  }

  ngOnInit() {  
   
  }

  async viewUserFeedback(){
   this.router.navigateByUrl('/user-feedback',{replaceUrl:true}) 
  }

  async addCompany(){
    const alert = await this.alertController.create({
      cssClass: 'myAlert',
      header: 'Add Company',
      inputs:[
        {
          name:'name',
          placeholder: 'Company name',
          type: 'text'
        },
        {
         name:'time',
         placeholder: 'Operating Hours',
         type: 'time'
       },
       {
         name:'location',
         placeholder: 'location',
         type: 'text'
       }
       
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
         text: 'Add',
         handler: (res) =>{
           this.dataService.addCompany({name:res.name,time:res.time,location:res.location})
         }
       }
      ]
   });
   await  alert.present();

  }

  
  async addVehicle(){
    const alert = await this.alertController.create({
       header: 'Add Vehicle',
       inputs:[
         {
           name:'name',
           placeholder: 'Name',
           type: 'text'
         },
         {
          name:'price',
          placeholder: 'price',
          type: 'text'
        },
        {
          name:'model',
          placeholder: 'Model',
          type: 'text'
        },
        {
          name:'mileage',
          placeholder: 'mileage',
          type: 'text'
        },
        {
          name:'image',
          placeholder: 'image Url',
          type: 'text'
        },
        {
          name:'company',
          placeholder: 'Company name',
          type: 'text'
        }

       ],
       buttons: [
         {
           text: 'Cancel',
           role: 'cancel'
         },
         {
          text: 'Add',
          handler: (res) =>{
            this.dataService.addData({name:res.name,price:res.price,mileage:res.mileage,image:res.image,model:res.model,company:res.company})
          }
        }
       ]
    });
    await  alert.present();
  }

  
  async viewVehicleDetails(vehicle){
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps:{ vehicle},
      breakpoints:[0,0.5,0.8],
      initialBreakpoint:0.5
    });
    modal.present(); 

  }
  update(){
    this.router.navigateByUrl('update-hehicles')
  }
  
  async viewPendingBookings(vehicle){
    const modal = await this.modalController.create({
      component: ReservationsModalPage,
      componentProps:{ vehicle},
      breakpoints:[0,0.5,0.8],
      initialBreakpoint:0.5
    });
    modal.present(); 

  }
  async updateVehicleDetails(){
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );
    let vehicles = collectionData(query(collection(this.firestore, 'vehicles')));
    vehicles = combineLatest([vehicles, searchTerm$]).pipe(
      map(([vehicles, searchTerm]) =>
      vehicles.filter(
          (vehicle) =>
            searchTerm === '' ||
            vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );

  }
}
