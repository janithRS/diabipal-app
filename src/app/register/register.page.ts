import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/firestore";
import {UsersService} from "../users.service";
import {LoaderService} from '../loader-service.service'
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    username: string = "";
    password: string = "";
    cpassword: string = "";

    constructor(
        public auth: AngularFireAuth, 
        public alert: AlertController, 
        public router: Router, 
        public afstore: AngularFirestore, 
        private user: UsersService,
        private loader: LoaderService,
        private http : HttpClient
        ) {}

    ngOnInit() {
    }

    async register() {
        const {username, password, cpassword} = this
        if (password != cpassword) {
            await this.showAlert("Error!", "Password don't match")
            return console.error("Passwords don't match")
        }
        try {
            this.loader.presentLoading('Please wait')
            const res = await this.auth.createUserWithEmailAndPassword(username, password)
            
            await this.afstore.doc(`users/${res.user.uid}`).set({
                username
            })

            this.user.setUser({
                username,
                uid: res.user.uid
            })
            
            // await this.showAlert("Success!", "Welcome aboard")
            await this.sendUserdata(username, res.user.uid)
            await this.router.navigate(['/tabs'])

        } catch (e) {
            console.dir(e)
            await this.showAlert("Error!", e.message)
        }
    }

    async showAlert(header: string, message: string) {
        const alert = await this.alert.create({
            header,
            message,
            buttons: ['OK']
        })
        await alert.present()
    }

    async sendUserdata(username, firebaseID){
        let chatURL = "http://ec2-54-165-166-212.compute-1.amazonaws.com:8080/patient/savepatient"
        let body = {
            firebaseid : firebaseID,
            name : username
        }
        this.http.post(chatURL, body).subscribe(data => {
            console.log(data)
        })
    }

    loginRoute() {
        this.router.navigate(['/login'])
    }
}
