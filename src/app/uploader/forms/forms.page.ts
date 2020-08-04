import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.page.html",
  styleUrls: ["./forms.page.scss"],
})
export class FormsPage implements OnInit {

  constructor(private http: HttpClient) {}

  hidden: boolean = true;
  cardioPredictionURL: string;
  body = {}

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

  selectTagStrokes(e) {
    this.stroke = e.detail.value;
  }

  selectTagHypertesnion(e){
    this.hypertension = e.detail.value;
  }

  selectTagDiabetes(e){
    this.diabetes = e.detail.value;
  }

  selectTagBPmeds(e){
    this.bpmeds = e.detail.value;
  }
 

  cardioPrediction() {

    this.cardioPredictionURL = " http://127.0.0.1:5000/predict";
    this.body = {
      bmi: this.bmi,
      diabetes: this.diabetes,
      diaBp: this.diaBp,
      sysBp: this.sysBp,
      glu: this.glu,
      totChol: this.totChol,
      bpmeds: this.bpmeds,
      stroke: this.stroke,
      hypertension: this.hypertension,
      cigs: this.cigs,
      age: this.age,
      sex: this.sex,
    };

    this.http.post(this.cardioPredictionURL, JSON.stringify(this.body)).subscribe(data =>{
      console.log(data)
    })
  }

  ngOnInit() {}
}
