import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "../../loader-service.service";
import { UsersService } from "../../users.service";
import { Chart } from "chart.js";
import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-cardiovascular",
  templateUrl: "./cardiovascular.page.html",
  styleUrls: ["./cardiovascular.page.scss"],
})
export class CardiovascularPage implements OnInit {
  query_params: any;
  bmisuggestion: any;
  ishidden: boolean = true;
  cardColor: any;
  labelLen: Array<number> = [];

  @ViewChild("barChart") barChart;
  bars: any;
  colorArray: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public Loader: LoaderService,
    private user: UsersService,
    private alertcontroller: AlertController
  ) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.query_params = JSON.parse(res.value);
      console.log(this.query_params);
      if (this.query_params.ob_stage == "1") {
        this.checkObstage();
        this.ishidden = false;
        this.cardColor = 'beige'
      }else if (this.query_params.ob_stage == "0"){
        this.bmisuggestion = "Your current BMI values are within the healthy stages"
        this.cardColor = 'lavender'
      }else if (this.query_params.ob_stage == "2"){
        this.cardColor = 'bisque'
        this.bmisuggestion = "Please contact a physician to obtain more details to reduce the BMI values"
      }
    });
  }

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {
    let lenobj = 1;
    this.query_params.ob_stage_levels.forEach((element) => {
      this.labelLen.push(lenobj++);
    });
    console.log(this.query_params.ob_stage_levels);
    this.bars = new Chart(this.barChart.nativeElement, {
      type: "line",
      data: {
        labels: this.labelLen,
        datasets: [
          {
            label: "Obesity Stage",
            data: this.query_params.ob_stage_levels,
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: "rgb(38, 194, 129)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              barPercentage: 0.9,
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  ngOnInit() {}

  checkObstage() {
    this.bmisuggestion =
      "Maintain the calory intake lower than the TDEE estimation";
  }

  BMRmsg = `<p>Amount of calories required to keep your body functioning at rest.<p>
            <p>BMR is also known as your body’s metabolism</p>`

  TDEEmsg = `<p>Calculating your TDEE is a helpful tool to get you on the path to your fitness goals</p>
            <p>TDEE is calculated by taking into account your basal metabolic rate and activity levels.</p>` 

  async showBMRdescription(){
    const alert = await this.alertcontroller.create({
      header: 'What is BMR ?',
      message: this.BMRmsg,
      buttons: ['Okay']
    });

    await alert.present();
  }

  async showTDEEdescription(){
    const alert = await this.alertcontroller.create({
      header: 'What is TDEE ?',
      message: this.TDEEmsg,
      buttons: ['Okay']
    });

    await alert.present();
  }
}
