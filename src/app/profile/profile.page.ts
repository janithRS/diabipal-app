import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {UsersService} from "../users.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    name: string
    constructor(public router: Router, private auth: AngularFireAuth, private users: UsersService) {
            this.name=users.getEmail()
    }

    ngOnInit() {
        this.auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log("User is logged in")
            } else {
                console.log("User not logged in")
            }
        })
    }

    redirectToChat() {
        this.router.navigate(['/connect-doctor'])
    }

    logoutRoute() {
        this.users.signOut();
    }
}
