import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/firestore";
import {UsersService} from "../users.service";
import {LoaderService} from '../loader-service.service'



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
        private loader: LoaderService
        ) {}

    ngOnInit() {
    }

    async register() {
        this.loader.presentLoading('Please wait')
        const {username, password, cpassword} = this
        if (password != cpassword) {
            await this.showAlert("Error!", "Password don't match")
            return console.error("Passwords don't match")
        }
        try {
            const res = await this.auth.createUserWithEmailAndPassword(username, password)

            await this.afstore.doc(`users/${res.user.uid}`).set({
                username
            })

            this.user.setUser({
                username,
                uid: res.user.uid
            })

            // await this.showAlert("Success!", "Welcome aboard")
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

    loginRoute() {
        this.router.navigate(['/login'])
    }
}
