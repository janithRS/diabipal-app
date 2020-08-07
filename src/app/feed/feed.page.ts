import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {UsersService} from "../users.service";
import { Router } from '@angular/router';
import { LoaderService } from "../loader-service.service";



@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  userPosts;

  constructor(private afs: AngularFirestore, private user: UsersService, private router: Router, private loaderService: LoaderService) {
    const posts = afs.doc(`users/${user.getUID()}`)
    this.userPosts = posts.valueChanges();
  }

  ngOnInit() {
    this.loaderService.presentLoading('Please wait')

  }

  redirectToChat(d) {
  }

  checkUserData(d){
    let  values = {
      cardio_positive: d.cardiopositve,
      cardio_negative: d.cardionegative,
      diabetic_positive_prob: d.diabetespositive,
      diabetic_negative_prob: d.diabetesnegative,
      diabetic_prediction: d.diabetic_prediction,
      ob_stage: d.ob_stage,
      ob_therapy: d.ob_therapy,
      nutrition_info : d.nutrition_info,
      physical_info: d.physical_info,
      sleep_info: d.sleep_info,
      behavioral_info: d.behavioral_info,
      smoking_info: d.smoking_info
    }
    this.router.navigate(['/results'], {
      queryParams: {
        value: JSON.stringify(values)
      },
    });
  }

}
