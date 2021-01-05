import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PredictionResults } from "../../models/preditctionresults.model";
import {Router} from '@angular/router'
import { LoaderService } from '../loader-service.service';
import {AngularFirestore , AngularFirestoreCollection} from "@angular/fire/firestore";
import {UsersService} from '../users.service'
import { from } from 'rxjs';
import {map} from 'rxjs/operators'


@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {


  query_params: any
  userOBstages : Array<number> = []
  userGLUlevels : any
  userBloodlevels : any
  timestamp : any

  

  constructor(
    public activatedRoute : ActivatedRoute, 
    public Loader: LoaderService,
    public router : Router,
    private aftStore : AngularFirestore,
    private user : UsersService

    ) { 
    this.activatedRoute.queryParams.subscribe((res)=>{
      this.query_params = JSON.parse(res.value)
      console.log(this.query_params)
      this.timestamp = this.query_params.timestamp
    });
    

    const posts = this.aftStore.doc(`users/${this.user.getUID()}`)
    
    posts.valueChanges().subscribe(data => {
      console.log(data["data"])
      data["data"].forEach(d => {
        // if(this.timestamp == d.timeStamp){
          // this.userOBstages.push(d.ob_stage)
          this.userOBstages.push(d.ob_stage)
        //   this.userGLUlevels = d.glucose
        //   this.userBloodlevels = d.blood_pressure
        // }
      });
      console.log(this.userOBstages)
    })

  }


  cvdPredictions(){
    let cardio = {
      tdee : this.query_params.tdee,
      bmr : this.query_params.bmr,
      cardio_positive : this.query_params.cardio_positive,
      ob_stage : this.query_params.ob_stage,
      blood_levels : this.userBloodlevels,
      glucose : this.userGLUlevels,
      ob_stage_levels: this.userOBstages
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
