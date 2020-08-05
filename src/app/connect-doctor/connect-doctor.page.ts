import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../connect-doctor/message';
import { Observable } from 'rxjs';
import { ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import {AlertController} from '@ionic/angular';

interface DataResponse {
  id: number;
  patientId: number;
  chatBy: number;
  chatContent: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './connect-doctor.page.html',
  styleUrls: ['./connect-doctor.page.scss'],
})

export class ConnectDoctorPage implements OnInit {

  input: string = "";

  //@ViewChild('content') private content: any;
  @ViewChild(IonContent) content: IonContent;

  title = 'Tour of Heroes';
  messages: Observable<Message[]>;
  tempArray: Message[] = [];

  constructor(private http: HttpClient, public alert: AlertController) { }



  ngOnInit() {

    this.sendgetRequest();
  //  console.log(tempArray[1]);

  //this.scrollToBottomOnInit();

  

//  this.messages = this.sendPostRequest();


    //  this.http.get("http://localhost:8080/chat/all")
    //   .subscribe(data => {
    //     console.log(data);
    //     var count =Object.keys(data).length;
    //     for (var i=0; i<count; i++)  
    //     tempArray.push(<DataResponse>data[i]);
    //     console.log( tempArray[0] );  
    //     return tempArray;
    //   }, error => {
    //        console.log(error);   
    //    });
  }
  
  updateScroll() {
    if (this.content.scrollToBottom) {
      this.content.scrollToBottom(400);
    }
}

     
  sendgetRequest() {
    
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
    .set('Accept','application/json');

    return this.http.get("http://localhost:8080/chat/all")
      .subscribe(data => {
        console.log(data);
        var count =Object.keys(data).length;
        for (var i=0; i<count; i++)  
        this.tempArray.push(<DataResponse>data[i]);
        console.log( this.tempArray[0] );  
        setTimeout(() => {
          this.updateScroll();
      }, 500);
        //return tempArray;
      }, error => {
           console.log(error);   
       });



  }

  async sendPostRequest() {

    const {input} = this
    // var headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json' );
 //   const requestOptions = new RequestOptions({ headers: headers });

 
//  const headers= new HttpHeaders()
//  .set('content-type', 'application/json')
//  .set('Access-Control-Allow-Origin', 'http://localhost:8080/chat/getreply');

  await this.showAlert("Success!", "Welcome aboard")

    let postData = {
      "patientId": 1001,
      "chatBy": 1,
      "chatContent": input
  }

    this.http.post("http://localhost:8080/chat/getreply", postData)
      .subscribe(data => {
        console.log(data['chatContent']);
        if (data['chatContent'] == " your message will be redirected to a doctor,"){
          // if(confirm("Are you sure to send question to a doctor? ")) {
          //   console.log("Implement delete functionality here");
          // }
          ///////////////////////////

          //async presentAlertConfirm() {
            const alert = this.alert.create({
              cssClass: 'my-custom-class',
              header: 'Confirm!',
              message: 'Message <strong>text</strong>!!!',
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
                      this.http.post("http://localhost:8080/chat/sendmail", postData)
                      .subscribe(data => {
                        console.log(data);
                      }, error => {
                        console.log(error);
                      });
                    console.log('Confirm Okay');
                    console.log("***********Sending mail");
                  }
                }
              ]
            }).then(alert=> alert.present());
          //}
          ////////////////////////////
          
        }
        location.reload();
       }, error => {
        console.log(error);
      });
  }


  // sendPostRequest() {
  //     const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar', 'Access-Control-Allow-Origin': 'http://localhost:8080/'}
  //   const body = {  "patientId": 1,
  //        "chatBy": 1,
  //        "chatContent": "hi" }
  //   this.http.post('http://localhost:8080/chat/getreply', body, { headers }).subscribe(
  //   )
  // }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
        header,
        message,
        buttons: ['OK']
    })
    await alert.present()
}
 
 }
