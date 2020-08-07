import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import { Doctor } from '../select-doctor/doctor';

interface DataResponse {
  did: number;
  name: number;
  email: number;
}

@Component({
  selector: 'app-select-doctor',
  templateUrl: './select-doctor.page.html',
  styleUrls: ['./select-doctor.page.scss'],
})
export class SelectDoctorPage implements OnInit {

  tempArray: Doctor[] = [];

  constructor(private http: HttpClient, public alert: AlertController) { }

  ngOnInit() {

    this.sendgetRequest();
  }

  sendgetRequest() {


    return this.http.get("http://localhost:8080/doctor/all")
      .subscribe(data => {
        console.log(data);
        var count =Object.keys(data).length;
        for (var i=0; i<count; i++)  
        this.tempArray.push(<DataResponse>data[i]);
      }, error => {
           console.log(error);   
       });
  }

  

  sendupdateRequest(did: any) {

    
    let postData = {
      "firebaseid": "abc123abc123",
      "doctorId": {
          "did": did
    }
  }

    const alert = this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'select this doctor? <strong>Select this as your primary doctor?</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
              this.http.post("http://localhost:8080/patient/updatepatient", postData)
              .subscribe(data => {
                console.log(data);
              }, error => {
                console.log(error);
              });
            console.log('Confirm Okay');
            console.log("***********Updating doctor");
          }
        }
      ]
    }).then(alert=> alert.present());

  }

}
