import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "../../loader-service.service";
import { UsersService } from "../../users.service";
import { Chart } from "chart.js";

@Component({
  selector: "app-cardiovascular",
  templateUrl: "./cardiovascular.page.html",
  styleUrls: ["./cardiovascular.page.scss"],
})
export class CardiovascularPage implements OnInit {
  query_params: any;
  bmisuggestion: any;
  ishidden: boolean = true;

  labelLen: Array<number> = [];

  @ViewChild("barChart") barChart;
  bars: any;
  colorArray: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public Loader: LoaderService,
    private user: UsersService
  ) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.query_params = JSON.parse(res.value);
      console.log(this.query_params);
      if (this.query_params.ob_stage == "1") {
        this.checkObstage();
        this.ishidden = false;
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
}
