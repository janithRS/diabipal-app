import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-uploader',
    templateUrl: './uploader.page.html',
    styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

    constructor(public http: HttpClient) {
    }

    ngOnInit() {
    }

    fileChanged(event) {
        const files = event.target.files
        console.log(files)
    }
}
