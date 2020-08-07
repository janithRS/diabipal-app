import {Injectable} from "@angular/core";
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

interface user {
    username: string,
    uid: string
}

@Injectable()
export class UsersService {
    private user: user

    constructor(private afAuth: AngularFireAuth, private router: Router) {
    }

    signOut(){
        this.afAuth.signOut().then(() => {
            this.router.navigate(['/login'])
        })
    }

    setUser(user: user) {
        this.user = user
    }

    getUID() {
        return this.user.uid
    }

    getEmail(){
        return this.user.username
    }

    async isAuthenticated() {
        if (this.user) return true
        const user = await this.afAuth.authState.pipe(first()).toPromise()
        if (user) {
            this.setUser({
                username: user.email,
                uid: user.uid
            })
            return true
        }
        return false
    }
}
