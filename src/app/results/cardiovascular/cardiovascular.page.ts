import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {LoaderService} from '../../loader-service.service'
import {UsersService} from "../../users.service";


@Component({
  selector: 'app-cardiovascular',
  templateUrl: './cardiovascular.page.html',
  styleUrls: ['./cardiovascular.page.scss'],
})
export class CardiovascularPage implements OnInit {

  query_params : any

  constructor(
    public activatedRoute : ActivatedRoute, 
    public Loader: LoaderService,
    private user: UsersService
  ) {
    this.activatedRoute.queryParams.subscribe((res)=>{
      this.query_params = JSON.parse(res.value)
      console.log(this.query_params)
    });
   }

  ngOnInit() {
  }

}
