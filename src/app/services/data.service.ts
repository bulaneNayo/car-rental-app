import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { BehaviorSubject, Observable} from 'rxjs';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from '@angular/fire/auth';
import { signOut } from 'firebase/auth';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { Time } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

//import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

//user data
export interface Data{
  id?: string;
  name: string;
  number: string;
  email: string;
  location: string;
  password: string;
}
export interface Reservation{
  id?:string;
  name:string;
  pickup:Date;
  return:Date;
}
export interface Vehicle{
  id?: string;
  name: string;
  price: string;
  model:string
  mileage: string;
  image?: string;
  company: string;
  
}

export interface Company{
  id?: string;
  name: string;
  time: Time;
  location: string;
   
}
export interface Feedback{
  id?: string;
  name:string;
}

export interface Car{
  id?: string;
  img:string;
}

export interface Route{
  id?: string;
  time_in:Date,
  time_out:Date,
  destination:string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
bookingsCollection:AngularFirestoreCollection;
car=new BehaviorSubject({})

  constructor(
    private firestore: Firestore, 
    private auth: Auth,
    private angularFireAuth: AngularFireAuth,
    private afs:AngularFirestore
    
    ) { 
       this.bookingsCollection=this.afs.collection('bookings');
      //this.loadReseversations(); 
    }

   async loadCars(){
      
    }
    
  //get all vehicles
  getData(): Observable<Data[]>{
    const dataRef = collection(this.firestore,'vehicles');
    return collectionData(dataRef,{idField:'id'}) as Observable<Data[]>; 
  }
  forgotUserPassword(){

  }
  getCars(){
    const dataRef = collection(this.firestore,'cars');
    return collectionData(dataRef,{idField:'id'}) as Observable<Car[]>;
  }
  //get all companies
  getAllCompanies(): Observable<Data[]>{
    const dataRef = collection(this.firestore,'companies');
    return collectionData(dataRef,{idField:'id'}) as Observable<Data[]>; 
  }
  //retrieve user feedback
  getUserFeedback(): Observable<Feedback[]>{
    const dataRef = collection(this.firestore,'feedback');
    return collectionData(dataRef,{idField:'id'}) as Observable<Feedback[]>; 
  }

  //get a single vehicle by id
  getDataById(id): Observable<Data[]>{
    const dataDocRef = doc(this.firestore,`'vehicles/${id}'`);
    return docData(dataDocRef,{idField:'id'}) as Observable<Data[]>; 
  }


 async userRegistration(value){
    return new Promise<any> ((resolve, reject) =>{
      this.angularFireAuth.createUserWithEmailAndPassword(value.email,value.password).then(
        res => resolve(res),
        error => reject(error)
        );
    });
  } 
 async login(value){
    return new Promise<any> ((resolve, reject)=> {
  this.angularFireAuth.signInWithEmailAndPassword(value.email,value.password).then(
  res => resolve(res),
        error => reject(error)
    );
  });
}
  //create user
  async registerUser(email,password){
    try{
      const user = await createUserWithEmailAndPassword(
        this.auth,email,password
      );
      return user;
    }catch(e){
      return null;
    }    
  } 
//user sign in
  async loginUser(email,password){
    try{
      const user = await signInWithEmailAndPassword(
        this.auth,email,password
      );
      return user;
    }catch(e){
      return null;
    }
    
  } 

  async recoverPassword(email){
    try{
      const user = await sendPasswordResetEmail(
        this.auth,email
      );
      return user;
    }catch(e){
      return null;
    }
    
  } 
//login
/*   async Login(email,password){
    try{
      const user = await signInWithEmailAndPassword(
        this.auth,email,password
      );
      return user;
    }catch(e){
      return null;
    }
    
  }  */

  //logout
logout(){
  return signOut(this.auth);

}
addRoute(route:Route){
  const dataRef = collection(this.firestore,'routes');
  return addDoc(dataRef,route); 
}
//add a company company
addCompany(company:Company){
  const dataRef = collection(this.firestore,'companies');
  return addDoc(dataRef,company); 
}
getReservations(): Observable<Reservation[]>{
  const dataRef = collection(this.firestore,'reservations');
  return collectionData(dataRef,{idField:'id'}) as Observable<Reservation[]>; 
}
addReservation(reservation:Reservation){
  const dataRef = collection(this.firestore,'reservations');
  return addDoc(dataRef,reservation); 
}

addFeeback(feedback:Feedback){
  const dataRef = collection(this.firestore,'feedback');
  return addDoc(dataRef,feedback); 
}

selectVehiclesFromCompany(){

}
  //add a new vehicle
  addData(vehicle:Vehicle){
    const dataRef = collection(this.firestore,'vehicles');
    return addDoc(dataRef,vehicle); 
  }
  
  //delete a single vehicle using using id
  deleteData(vehicle:Vehicle){
    const dataDocRef = doc(this.firestore,`'vehicles/${vehicle.id}'`);
    return deleteDoc(dataDocRef); 
  }
  deleteVehicle(vehicle:Vehicle) {
  const dataDocRef =  doc(this.firestore,'vehicles'+ vehicle);
    return deleteDoc(dataDocRef); 
  }
  //update vehicle   using id
  updateData(vehicle:Vehicle){
    const dataDocRef = doc(this.firestore,`'vehicles/${vehicle.id}'`);
    return updateDoc(dataDocRef,{
      name:vehicle.name, 
      price: vehicle.price,
      model:vehicle.model,
       mileage:vehicle.mileage,
       image:vehicle.image,
       company:vehicle.company 
      }); 
  }

  getUserProfile(){
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore,`users/${user.uid}`);
    return docData(userDocRef);
  }

}

