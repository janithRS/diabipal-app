import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Forms } from "../../../models/forms.model";
import { UsersService } from "../../users.service";
import { async } from "@angular/core/testing";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { PredictionResults } from "../../../models/preditctionresults.model";
import { firestore } from "firebase/app";

@Component({
  selector: "app-forms",
  templateUrl: "./forms.page.html",
  styleUrls: ["./forms.page.scss"],
})
export class FormsPage implements OnInit {
  constructor(
    private http: HttpClient,
    private users: UsersService,
    private aftStore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  userID: string;

  ngOnInit() {}

  form = {} as Forms;
  predictionResults = {} as PredictionResults;

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

      const diabetesData = {
        bmi:
          this.form.weight /
          ((this.form.height / 100) * (this.form.height / 100)),
        glu: this.form.glu,
        bp: this.form.bp,
        age: this.form.age,
        preg: this.form.preg,
        ins: this.form.ins,
        ped: this.form.ped,
        skin: this.form.skin,
      };
      this.http
        .post(this.diabetesPredictionURL, diabetesData)
        .subscribe((data) => {
          console.log(data);

          this.predictionResults.diabetic_positive = data["ob_stage"];
          this.predictionResults.diabetic_negative = data["ob_therapy"];

          let diabeticStatus: number;
          if (data["dm_prediction"] == "Negative") {
            diabeticStatus = 0;
          } else {
            diabeticStatus = 1;
          }

          var postData = {
            height: this.form.height,
            weight: this.form.weight,
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
            diabetes: diabeticStatus,
          };

          this.http
            .post(this.cardioPredictionURL, postData)
            .subscribe((data) => {
              console.log(data);

              this.predictionResults.cardio_positive =
                data["positive prediction"];
              this.predictionResults.cardio_negative =
                data["negative prediction"];

              const cardiopositve = this.predictionResults.cardio_positive;
              const cardionegative = this.predictionResults.cardio_negative;
              const diabetespositive = this.predictionResults.diabetic_positive;
              const diabetesnegative = this.predictionResults.diabetic_negative;
              const height = this.form.height;
              const weight = this.form.weight;
              const glucose = this.form.glu;
              const blood_pressure = this.form.bp;
              const strokes = this.form.stroke;
              const hypertension = this.form.hypertension;
              const cigs = this.form.cigs;
              const diastolic_blood_pressure = this.form.diaBp;
              const systolic_blood_pressure = this.form.sysBp;

              this.aftStore.doc(`users/${this.users.getUID()}`).update({
                data: firestore.FieldValue.arrayUnion({
                  cardionegative,
                  cardiopositve,
                  diabetespositive,
                  diabetesnegative,
                  height,
                  weight,
                  glucose,
                  blood_pressure,
                  strokes,
                  hypertension,
                  cigs,
                  diastolic_blood_pressure,
                  systolic_blood_pressure,
                }),
              });
            });
        });
    } catch (e) {}
  }
}
