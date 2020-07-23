import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    username: string = "";
    password: string = "";
    cpassword: string = "";

    constructor(public auth: AngularFireAuth, public alert: AlertController, public router: Router) {
    }

    ngOnInit() {
    }

    async register() {
        const {username, password, cpassword} = this
        if (password != cpassword) {
            await this.showAlert("Error!", "Password don't match")
            return console.error("Passwords don't match")
        }
        try {
            const res = await this.auth.createUserWithEmailAndPassword(username, password)
            await this.showAlert("Success!", "Welcome aboard")
            await this.router.navigate(['/home'])
        } catch (e) {
            console.dir(e)
            await this.showAlert("Error!", e.message)
        }
    }

    async showAlert(header: string, message: string){
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
