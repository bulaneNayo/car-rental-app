import { Component, OnInit } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.page.html',
  styleUrls: ['./booking-details.page.scss'],
})
export class BookingDetailsPage implements OnInit {
  

  constructor(private calendar: Calendar,private dataService:DataService) { }

  showDate(){
    this.calendar.createCalendar('MyCalendar').then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
  }

  reserve(value){
    this.dataService.addReservation(value)
  }

  ngOnInit() {
  }

}
