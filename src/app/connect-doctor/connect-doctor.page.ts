import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../connect-doctor/message';
import { Observable } from 'rxjs';
import { ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import {UsersService} from "../users.service";



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

  @ViewChild(IonContent) content: IonContent;

  title = 'Tour of Heroes';
  messages: Observable<Message[]>;
  tempArray: Message[] = [];

  constructor(private http: HttpClient, public alert: AlertController, private user: UsersService) {
    
   }



  ngOnInit() {

    this.sendgetRequest()
  
  }
  
  updateScroll() {
    if (this.content.scrollToBottom) {
      this.content.scrollToBottom(400);
    }
}

 delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
     
  sendgetRequest() {


    return this.http.get("http://localhost:8080/chat/getuserchat/"+this.user.getUID())
      .subscribe(data => { 
        console.log(data);
        var count =Object.keys(data).length;
        for (var i=0; i<count; i++)  
        this.tempArray.push(<DataResponse>data[i]);
        this.delay(400);
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

  //await this.showAlert("Success!", "Welcome aboard")
  

    let postData = {
      "patientId": 1001,
      "chatBy": 1,
      "chatContent": input,
      "firebaseid": this.user.getUID()
  }

   this.http.post("http://localhost:8080/chat/getreply", postData)
      .subscribe(data => {
        console.log(data['chatContent']);
        let x = 1;
        if (data['chatContent'] == " your message will be redirected to a doctor,"){
          x = 0;
            const alert = this.alert.create({
              cssClass: 'my-custom-class',
              header: 'Confirm!',
              message: 'Im not yet intelligent enough to answer this.. <strong>want to transfer this question to a doctor?</strong>!!!',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                    console.log('Confirm Cancel: blah');
                    location.reload();
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
                    location.reload();
                  }
                }
              ]
            }).then(alert=> alert.present());

          
        }
        if(data && x==1){
        location.reload();
        }
       }, error => {
        console.log(error);
      });
  }


  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
        header,
        message,
        buttons: ['OK']
    })
    await alert.present()
}
 
 }
