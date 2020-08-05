import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {UserService} from "../user.service";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  private userPosts;

  constructor(private afs: AngularFirestore, private user: UserService) {
    const posts = afs.doc(`users/${user.getUID()}`)
    this.userPosts = posts.valueChanges();
  }

  ngOnInit() {
  }

  redirectToChat() {

  }
}
