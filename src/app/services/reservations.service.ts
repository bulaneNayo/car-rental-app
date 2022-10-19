import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app'
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';

/* 
import { BehaviorSubject } from 'rxjs';
import {Plugins} from '@capacitor/core'
const {Storage}=Plugins;

const RESERVATION_STORAGE_KEY = 'MY_RESERVATION';
const INCREMENT = firebase.firestore.FieldValue.increment(1);
const DECREMENT = firebase.firestore.FieldValue.increment(-1);
 */@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
/*   reservation=new BehaviorSubject({});
  bookingsCollection:AngularFirestoreCollection
  reservationKey=null;
 */
  constructor(private afs:AngularFirestore,private database:AngularFireDatabaseModule) { 
    /* this.bookingsCollection=this.afs.collection('bookings');
    this.loadReservations(); */
  }/* 
 getReservations(){
   return this.bookingsCollection.valueChanges({idField:'id'});
 } */
 
 getPendingRes(){
  const requestRef = firebase.database().ref('reservations');
  requestRef.orderByChild('status')
          .equalTo('PENDING')
          .once('value')
          .then(snapshot => snapshot.val())
          .then((data) => { 
            return data;
            console.log('pending',data);
          })
 }
 
 
 /* async loadReservations(){
   const result = await Storage.get({key:RESERVATION_STORAGE_KEY});
    console.log('reservation from strorage',result);
   if(result.value){
    this.reservationKey = result.value
    this.afs.collection('reservations').doc(this.reservationKey).valueChanges().subscribe((result:any)=>{
      console.log('reservation cahnged',result);
      delete result['lastUpdate'];
      this.reservation.next(result || {});
    });

  }else{
    const fbDocument = await this.afs.collection('reservations').add({
      lastUpdate:firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log('new reservation:',fbDocument)
    this.reservationKey=fbDocument.id;
    await Storage.set({key:RESERVATION_STORAGE_KEY,value:this.reservationKey})
  }
 }
 addToReservation(id){
  this.afs.collection('reservations').doc(this.reservationKey).update({
    [id]:INCREMENT,
    lastUpdate:firebase.firestore.FieldValue.serverTimestamp()
  });
 }

 removeFromReservation(id){
  this.afs.collection('reservations').doc(this.reservationKey).update({
    [id]:DECREMENT,
    lastUpdate:firebase.firestore.FieldValue.serverTimestamp()
  });
 }

 async checkOutReservation(){
   await this.afs.collection('orders').add(this.reservation.value);
   this.afs.collection('reservations').doc(this.reservationKey).set
  }
 */}
