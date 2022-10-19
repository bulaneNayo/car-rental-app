import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';

export interface User{
  id?: string;
  name: string;
  email: string;
}
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.page.html',
  styleUrls: ['./user-login.page.scss'],
})
export class UserLoginPage implements OnInit {
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
      
    ],
    
  };


  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router,
    private toastController: ToastController,
    private dataService: DataService,
    private formBuilder: FormBuilder
    ) {
      this.validations_form = this.formBuilder.group({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
        ])),
        password: new FormControl('', Validators.compose([
          Validators.minLength(5),
          Validators.required,
          
          
        ]))
      });
    }
  ngOnInit() {
  }

  async login(value) {
    this.dataService.loginUser(value.email,value.password)
    .then(res => {
      console.log(res);
      this.router.navigateByUrl('/user-dashboard')
    }, err => {
      console.log(err);
    })
    }

    recover(value) {
      this.openLoader();
      this.dataService.recoverPassword(value.email)
      .then(res => {
        console.log(res);
        this.show();
        this.presentToast('Password reset email sent',  'top', 1000);
      }, err => {
        console.log(err);
      })
      }
      async presentToast(message, position, duration) {
        const toast = await this.toastController.create({
          message,
          duration,
          position
        });
        toast.present();
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

  async signIn(value) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.dataService.login(value)
      .then(res => {
        console.log(res);
        this.router.navigateByUrl('/user-dashboard',{replaceUrl: true})
      }, err => {
        console.log(err);
      })
      await loading.dismiss();
  }
 
  async showAlert(header,message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async show() {
    const alert = await this.alertController.create({
      inputs:[
        {
          name:'email',
          type: 'email',
          placeholder: 'Enter your email address'
        }        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Submit',
        }
      ]
    });
    await alert.present();
  }
  async adminLogin() {
    const alert = await this.alertController.create({
      header:'Admin Login',
      inputs:[
        {
          name:'email',
          placeholder: 'Email Address',
          type: 'email'
          
        },
        {
         name:'password',
         placeholder: 'Password',
         type: 'text'
       }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
         text: 'Login',
         handler: () =>{
          this.router.navigateByUrl('/admin-dashboard',{replaceUrl: true})         }
       }
      ]    
    });
    await alert.present();
  }


  async Logout(){
    this.dataService.logout();
    this.router.navigateByUrl('/',{replaceUrl: true})
  }
}
