import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.page.html',
  styleUrls: ['./user-feedback.page.scss'],
})
export class UserFeedbackPage implements OnInit {
  public feedback: Observable<any>;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.feedback=this.dataService.getUserFeedback();
  }

}
