import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


export interface User{
  id?: string;
  name: string;
  number: string;
  email: string;
  location: string;
  password: string;
}


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Password should have atleast 1 uppercase letter,lowercase letter and a number.'}
    ],
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'minlength', message: 'Name requires atleast 2 characters.' }
    ],
    'locaion': [
      { type: 'required', message: 'Location is required.' },
    ],
    'number': [
      { type: 'required', message: 'Number is required.' },
      { type: 'minlength', message: 'Number requires 8 digits!' },
      { type: 'pattern', message: 'This field accepts only numbers!' }
    ]
  };

  name: string="";
  number: any;
  email: any;
  location: string="";
  password:any;
  message = '';
  data=[];
  constructor(
    private dataService: DataService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private angularFireAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  
    ) {
      this.validations_form = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
          
          
        ])),
        name: new FormControl('', Validators.compose([
          Validators.minLength(2),
          Validators.required
        ])),
        number: new FormControl('', Validators.compose([
          Validators.minLength(8),
          Validators.required,
          Validators.pattern('^[0-9]+$')
        ])),
        location: new FormControl('', Validators.compose([
          Validators.required
        ])),
  
  
      });
    /* this.dataService.getData().subscribe(res=>{
      console.log(res);
      this.data=res;

    })
   */ 
    
  }

  ngOnInit() {
  }
  /*  private collecttionUser:AngularFirestoreCollection<User>
  private users: Observable<User[]>

  register(value){
    e.preventDefault();
    return new Promise<any>((resolve,reject)=>{
      this.angularFireAuth.createUserWithEmailAndPassword(value.emailAdressInput,value.passwordInput).then(
        res=>{
         const user: User = {
           id: res.user.uid,
           name: value.name,
           number: value.number,
           email: value.email,
           location: value.location,
           password:value.password

         }
         this.collecttionUser.doc(res.user.uid).set(user);
         resolve(res);
         this.router.navigateByUrl('/user-dashboard',{replaceUrl: true})
        },err=>{
          reject(err);
          console.log(err)
        }
      )
    })
  }
  */
 async tryRegister(value) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.dataService.registerUser(value.email,value.password)
      .then(res => {
        console.log(res);
        this.presentToast('Registration successful',  'middle', 1000);
        this.router.navigateByUrl('/user-login',{replaceUrl: true})
      }, err => {
        console.log(err);
      })
      await loading.dismiss();
  }
  async SignUp(){
    //const {nameInput,numberInput,emailAdressInput,locationInput,PasswordInput} = this
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.dataService.registerUser(this.email,this.password);
    await loading.dismiss();

    if(user){
      this.router.navigateByUrl('/user-dashboard',{replaceUrl: true})
    }else{
      this.showAlert('Registration failed','please try again');

    }

  }


  async presentToast(message, position, duration) {
    const toast = await this.toastController.create({
      message,
      duration,
      position
    });
    toast.present();
  }

  async showAlert(header,message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

} 
