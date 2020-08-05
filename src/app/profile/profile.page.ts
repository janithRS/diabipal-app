import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // name: string =
  constructor(public router: Router) {

  }

  ngOnInit() {
  }

    redirectToChat() {
      this.router.navigate(['/connect-doctor'])
    }
}
