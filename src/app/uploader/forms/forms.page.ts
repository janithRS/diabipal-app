import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {

    hidden: false;

    //diabetes data
    bmi: string ="";
    sex: string = "";
    glu: string = "";
    age: string = "";
    stroke: string = "";
    bp: string = "";
    skin: string = "";
    ped: string = "";
    ins: string = "";

    //cardio-vascular data
    hypertension: string = "";
    totChol: string = "";

  constructor() { }

  ngOnInit() {
  }

}
