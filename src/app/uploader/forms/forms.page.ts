import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Component({
  selector: "app-forms",
  templateUrl: "./forms.page.html",
  styleUrls: ["./forms.page.scss"],
})
export class FormsPage implements OnInit {
  constructor(private http: HttpClient) { }

  hidden: boolean = true
  cardioPredictionURL: string
  diabetesPredictionURL: string
  optionValues: Array<Object> = [1,0]
  

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

  selectTagHypertesnion(e) {
    this.hypertension = e.detail.value;
  }

  selectTagDiabetes(e) {
    this.diabetes = e.detail.value;
  }

  selectTagBPmeds(e) {
    this.bpmeds = e.detail.value;
    console.log(this.bpmeds);
  }

  setheaders(): any{
    return {
      headers : new HttpHeaders()
        .append("Content-Type", "application/json")
        .append("Access-Control-Allow-Headers", "Content-Type")
        .append("Access-Control-Allow-Origin", "*")
    }
  }

  cardioPrediction() { 

    // let headers = this.setheaders()
    let headers: HttpHeaders = new HttpHeaders()
        .append("Content-Type", "application/json")
        .append("Access-Control-Allow-Headers", "Content-Type")
        .append("Access-Control-Allow-Origin", "*")

    this.cardioPredictionURL = "http://127.0.0.1:5000/predict";

    let postData = {
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
    console.log(postData);
    this.http
      .post(this.cardioPredictionURL, JSON.stringify(postData), {headers})
      .subscribe((data) => {
        console.log(data);
      });
  }


  diabetesPrediction() {

    // let headers: HttpHeaders = new HttpHeaders()
    //   .append("Content-Type", "application/json")
    //   .append("Access-Control-Allow-Headers", "Content-Type")
    //   .append("Access-Control-Allow-Origin", "*");

      let headers = this.setheaders()

    this.diabetesPredictionURL = "https://diabipal.herokuapp.com/predict";

    let diabetesData = {
      bmi: this.bmi,
      glu: this.glu,
      bpmeds: this.bpmeds,
      age: this.age,
      sex: this.sex,
      preg: this.preg,
      ins: this.ins,
      ped: this.ped,
    };
    console.log(diabetesData);
    this.http.post(this.diabetesPredictionURL, diabetesData, { headers }).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit() { }
}
