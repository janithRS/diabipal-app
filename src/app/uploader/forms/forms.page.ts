import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.page.html",
  styleUrls: ["./forms.page.scss"],
})
export class FormsPage implements OnInit {
  hidden: boolean = true;

  //diabetes data
  bmi: string = "";
  sex: string = "";
  glu: string = "";
  age: string = "";
  bp: string = "";
  skin: string = "";
  ped: string = "";
  ins: string = "";
  preg: string = "";

  //cardio-vascular data
  hypertension: string = "";
  totChol: string = "";
  cigs: string = "";
  stroke: string = "";
  bpmeds: string = "";
  diaBp: string = "";
  sysBp: string = "";
  diabetes: string = "";

  selectTagSex(e) {
    this.sex = e.detail.value;
  }

  selectTagpregnant(e) {
    this.preg = e.detail.value;
  }

  constructor(private http: HttpClient) {}

  todoUrl: string = "https://jsonplaceholder.typicode.com/todos/";

  ngOnInit() {}
}
