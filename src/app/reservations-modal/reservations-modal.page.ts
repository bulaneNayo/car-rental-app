import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservationsService } from '../services/reservations.service';

@Component({
  selector: 'app-reservations-modal',
  templateUrl: './reservations-modal.page.html',
  styleUrls: ['./reservations-modal.page.scss'],
})
export class ReservationsModalPage implements OnInit {
  public reservations:Observable<any>

  constructor(private reservationService:ReservationsService) { }

  ngOnInit() {
    this.reservationService.getPendingRes();
  }

}
