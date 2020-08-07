import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PredictionResults } from "../../models/preditctionresults.model";



@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {


  query_params: any

  constructor(public activatedRoute : ActivatedRoute,) { 

    this.activatedRoute.queryParams.subscribe((res)=>{
      this.query_params = JSON.parse(res.value)
      console.log(this.query_params)
  });
  
  }

  ngOnInit() {
  }

}
