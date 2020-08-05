import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Forms } from "../../../models/forms.model";
import { UsersService } from "../../users.service";
import { async } from "@angular/core/testing";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.page.html",
  styleUrls: ["./forms.page.scss"],
})
export class FormsPage implements OnInit {
  constructor(private http: HttpClient, private users: UsersService) {}

  ngOnInit() {}

  form = {} as Forms;

  hidden: boolean = true;
  cardioPredictionURL: string;
  diabetesPredictionURL: string;

  selectTagSex(e) {
    this.form.sex = e.detail.value;
  }

  selectTagpregnant(e) {
    this.form.preg = e.detail.value;
  }

  selectTagStrokes(e) {
    this.form.stroke = e.detail.value;
  }

  selectTagHypertesnion(e) {
    this.form.hypertension = e.detail.value;
  }

  selectTagDiabetes(e) {
    this.form.diabetes = e.detail.value;
  }

  selectTagBPmeds(e) {
    this.form.bpmeds = e.detail.value;
  }

  // setheaders(): any {
  //   return {
  //     headers: new HttpHeaders()
  //       .append("Content-Type", "application/json")
  //       .append("Access-Control-Allow-Headers", "Content-Type")
  //       .append("Access-Control-Allow-Origin", "*"),
  //   };
  // }

  async calculatePredictions() {
    try {
      this.cardioPredictionURL = "https://dry-lake-13859.herokuapp.com/predict";

      this.diabetesPredictionURL = "https://diabipal.herokuapp.com/predict";

      let diabetesData = {
        bmi: this.form.bmi,
        glu: this.form.glu,
        bp: this.form.bp,
        age: this.form.age,
        preg: this.form.preg,
        ins: this.form.ins,
        ped: this.form.ped,
        skin: this.form.skin,
      };

      this.http.post(this.diabetesPredictionURL, diabetesData).subscribe((data) => {
        console.log(data);
        let diabeticStatus: number
        if(data['dm_prediction'] == "Negative"){
          diabeticStatus = 0;
        }else{
          diabeticStatus = 1
        }
        let postData = {
          bmi: this.form.bmi,
          diaBp: this.form.diaBp,
          sysBp: this.form.sysBp,
          glu: this.form.glu,
          totChol: this.form.totChol,
          bpmeds: this.form.bpmeds,
          stroke: this.form.stroke,
          hypertension: this.form.hypertension,
          cigs: this.form.cigs,
          age: this.form.age,
          sex: this.form.sex,
          diabetes: diabeticStatus
        };
        this.http
        .post(this.cardioPredictionURL, postData)
        .subscribe((data) => {
          console.log(data);
        });
      });

    } catch (e) {}
  }

  

  // cardioPrediction(url, cdata) {
  //   this.http.post(url, cdata).subscribe((data) => {
  //     console.log(data);
  //   });
  // }

  // cardioPrediction() {
  //   this.cardioPredictionURL = "https://dry-lake-13859.herokuapp.com/predict";

  //   let postData = {
  //     bmi: this.form.bmi,
  //     diabetes: this.form.diabetes,
  //     diaBp: this.form.diaBp,
  //     sysBp: this.form.sysBp,
  //     glu: this.form.glu,
  //     totChol: this.form.totChol,
  //     bpmeds: this.form.bpmeds,
  //     stroke: this.form.stroke,
  //     hypertension: this.form.hypertension,
  //     cigs: this.form.cigs,
  //     age: this.form.age,
  //     sex: this.form.sex,
  //   };

  //   this.http.post(this.cardioPredictionURL, postData).subscribe((data) => {
  //     console.log(data);
  //   });
  // }

  // diabetesPrediction() {

  //   this.diabetesPredictionURL = "https://diabipal.herokuapp.com/predict";

  //   let diabetesData = {
  //     bmi: this.form.bmi,
  //     glu: this.form.glu,
  //     bp: this.form.bp,
  //     age: this.form.age,
  //     preg: this.form.preg,
  //     ins: this.form.ins,
  //     ped: this.form.ped,
  //     skin: this.form.skin,
  //   };

    // this.http
        // .post(this.diabetesPredictionURL, diabetesData)
        // .subscribe((data) => {
        //   console.log(data);
        // });
 
  // }


}
