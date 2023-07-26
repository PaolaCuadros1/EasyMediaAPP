import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth'
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private afs: Firestore
  ) { }

  async register(email: string, password: string){
    return await createUserWithEmailAndPassword(this.auth, email, password)
  }

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logout(){
    return signOut(this.auth)
  }

  saveToken(token: string): void{
    localStorage.setItem('token', token)
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
