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

    // let headers: HttpHeaders = new HttpHeaders()
    //     .append("Content-Type", "application/json")
    //     .append("Access-Control-Allow-Headers", "Content-Type")
    //     .append("Access-Control-Allow-Origin", "*")

    this.cardioPredictionURL = "https://dry-lake-13859.herokuapp.com/predict"

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

    // let formData: FormData = new FormData()
    // formData.append('bmi',this.bmi)
    // formData.append('diabetes',this.diabetes)
    // formData.append('diaBp',this.diaBp)
    // formData.append('sysBp',this.sysBp)
    // formData.append('glu',this.glu)
    // formData.append('totChol',this.totChol)
    // formData.append('bpmeds',this.bpmeds)
    // formData.append('stroke',this.stroke)
    // formData.append('hypertension',this.hypertension)
    // formData.append('cigs',this.cigs)
    // formData.append('age',this.age)
    // formData.append('sex',this.sex)

    this.http
      .post(this.cardioPredictionURL, postData)
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
