import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";

  constructor(public auth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
  }

  async login(){
    const { username, password } = this
    try {
      const res = await this.auth.signInWithEmailAndPassword(username, password)
    } catch (e) {
      console.dir(e)
      if(e.code === "auth/user-not-found"){
        console.log("User not found")
      }
    }
  }

  registerRoute() {
    this.router.navigate(['/register'])
  }
}
