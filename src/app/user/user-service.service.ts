import { Injectable } from '@angular/core'
import {
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore'
import { collection } from '@firebase/firestore'
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth'
import { signOut } from 'firebase/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs'

export interface userData {
  id?: string
  name: string
  number: string
  email: string
  location: string
  password: string
}

export interface vehicleData {
  id?: string
  name: string
  registrationNumber: string
  model: string
  type: string
}

export interface timetableData {
  recordId?: string
  registrationNumber: string
  From: string
  timeIn: Date
  timeOut: Date
  destination: string
}
@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private angularFireAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {}

  //create user
  async registerUser(email, password) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      )
      return user
    } catch (e) {
      return null
    }
  }
  //user sign in
  async loginUser(email, password) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password)
      return user
    } catch (e) {
      return null
    }
  }
  //logout
  logout() {
    return signOut(this.auth)
  }

  //add a car
  addVehicle(vehicle: vehicleData) {
    const dataRef = collection(this.firestore, 'vehicles')
    return addDoc(dataRef, vehicle)
  }

  //rerieve a single vehicle by id
  getDataById(id): Observable<vehicleData[]> {
    const dataDocRef = doc(this.firestore, `'vehicles/${id}'`)
    return docData(dataDocRef, { idField: 'id' }) as Observable<vehicleData[]>
  }

  //get all vehicles
  getAllVehicles(): Observable<vehicleData[]> {
    const dataRef = collection(this.firestore, 'vehicles')
    return collectionData(dataRef, { idField: 'id' }) as Observable<
      vehicleData[]
    >
  }

  //add a record into timetable
  addTimetableRecord(timetable: timetableData) {
    const dataRef = collection(this.firestore, 'routes')
    return addDoc(dataRef, timetable)
  }

  //update a record in timetable
  updateTimetable(timetable: timetableData) {
    const dataDocRef = doc(this.firestore, `'routes/${timetable.recordId}'`)
    return updateDoc(dataDocRef, {
      registrationNumber: timetable.registrationNumber,
      From: timetable.From,
      timeIn: timetable.timeIn,
      timeOut: timetable.timeOut,
      destination: timetable.destination,
    })
  }

  //delete a record in timetable
  deleteVehicle(timetable: timetableData) {
    const dataDocRef = doc(this.firestore, 'routes' + timetable)
    return deleteDoc(dataDocRef)
  }

  //retrieve all records from timetable
  getAllTimetableRecords(): Observable<timetableData[]> {
    const dataRef = collection(this.firestore, 'routes')
    return collectionData(dataRef, { idField: 'recordId' }) as Observable<
      timetableData[]
    >
  }
}
