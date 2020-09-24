import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PredictionResults } from "../../models/preditctionresults.model";
import {Router} from '@angular/router'
import { LoaderService } from '../loader-service.service';
import {AngularFirestore} from "@angular/fire/firestore";
import {UsersService} from '../users.service'


@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {


  query_params: any
  userOBstages : Array<any> = []
  userGLUlevels : Array<any> = []
  userBMIlevels : Array<any> = []

  

  constructor(
    public activatedRoute : ActivatedRoute, 
    public Loader: LoaderService,
    public router : Router,
    private aftStore : AngularFirestore,
    private user : UsersService
    ) { 
    const posts = this.aftStore.doc(`users/${this.user.getUID()}`)
    posts.valueChanges().subscribe(data => {
      console.log(data["data"])
      data["data"].forEach(d => {
        this.userOBstages.push(d.ob_stage)
        this.userGLUlevels.push(d.glucose)
        this.userBMIlevels.push(d.weight/(d.height/100)*(d.height/100))
      });
    })
    this.activatedRoute.queryParams.subscribe((res)=>{
      this.query_params = JSON.parse(res.value)
      console.log(this.query_params)
    });
  }

  cvdPredictions(){
    let cardio = {
      tdee : this.query_params.tdee,
      bmr : this.query_params.bmr,
      cardio_positive : this.query_params.cardio_positive
    }
    this.router.navigate(['/results/cardiovascular'], {
      queryParams: {
        value: JSON.stringify(cardio)
      },
    });
  }

  ngOnInit() {
  }

}
