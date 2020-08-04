import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Platform, ActionSheetController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';

const MEDIA_FOLDER_NAME = 'my_media';

@Component({
    selector: 'app-uploader',
    templateUrl: './uploader.page.html',
    styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

    files = [];
    androidPermissions: any;

    constructor(
        private imagePicker: ImagePicker,
        private mediaCapture: MediaCapture,
        private file: File,
        private actionSheetController: ActionSheetController,
        private plt: Platform
    ) { }

    // list the content of the folder
    // create the folder if not existing

    ngOnInit() {
        this.plt.ready().then(() => {
            let path = this.file.dataDirectory;
            this.file.checkDir(path, MEDIA_FOLDER_NAME).then(() => {
                this.loadFiles();
            }, err => {
                this.file.createDir(path, MEDIA_FOLDER_NAME, false).then(() => {
                    this.loadFiles();
                });
            }
            );
        }), (err: any) =>{
            console.log('Error', err)
        };
    }

    loadFiles() {
        this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(
            res => {
                this.files = res;
            },
            err => console.log('error loading files: ', err)
        );
    }

    async selectMedia() {
        const actionSheet = await this.actionSheetController.create({
            header: 'What would you like to add?',
            buttons: [
                {
                    text: 'Capture Image',
                    handler: () => {
                        this.captureImage();
                    }
                },
                {
                    text: 'Load multiple',
                    handler: () => {
                        this.pickImages();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

    // results is an array of paths
    pickImages() {
        this.imagePicker.getPictures({}).then(
            results => {
                for (var i = 0; i < results.length; i++) {
                    this.copyFileToLocalDir(results[i]);
                }
            }
        );

        // If you get problems on Android, try to ask for Permission first
        // this.imagePicker.requestReadPermission().then(result => {
        //   console.log('requestReadPermission: ', result);
        //   this.selectMultiple();
        // });
    }

    captureImage() {
        //   returns an array of media files
        this.mediaCapture.captureImage().then(
            (data: MediaFile[]) => {
                if (data.length > 0) {
                    this.copyFileToLocalDir(data[0].fullPath);
                }
            },
            // (err: CaptureError) => console.error(err)
        );
    }

    copyFileToLocalDir(path) {
        console.log('Copy now: ', path)
    }

}
