import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {
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
    private router: Router,
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
      this.router.navigateByUrl('/admin-dashboard')
    }, err => {
      console.log(err);
    })
    }

}
