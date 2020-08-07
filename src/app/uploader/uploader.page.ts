import { Component, OnInit } from '@angular/core';
import { Platform, ActionSheetController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
// import { async } from '@angular/core/testing';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {LoaderService} from '../loader-service.service'
// import { error } from 'console';
// import { url } from 'inspector';

const MEDIA_FOLDER_NAME = 'my_media';

@Component({
    selector: 'app-uploader',
    templateUrl: './uploader.page.html',
    styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

    files = [];
    // androidPermissions: any;
    uploadProgress = 0;
    cloudFiles = [];
    dbUrl: String;

    urls : "";
    // imageId: "";

    constructor(
        private imagePicker: ImagePicker,
        private mediaCapture: MediaCapture,
        private file: File,
        private photoViewer: PhotoViewer,
        private actionSheetController: ActionSheetController,
        private plt: Platform,
        private storage: AngularFireStorage,
        private toast: ToastController,
        private fireStore: AngularFirestore,
        private http: HttpClient,
        private router: Router,
        private loader: LoaderService
    ) { }

    // list the content of the folder
    // create the folder if not existing
    ngOnInit() {
        this.loader.presentLoading('Please wait')
        this.plt.ready().then(() => {
            let path = this.file.dataDirectory;
            this.file.checkDir(path, MEDIA_FOLDER_NAME).then(() => {
                this.loadFiles();
                // this.loadFilesFromCloud();
            }, err => {
                this.file.createDir(path, MEDIA_FOLDER_NAME, false).then(() => {
                    this.loadFiles();
                    // this.loadFilesFromCloud();
                });
            }
            );
        }), (err: any) => {
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

    //  copy images to the local directory
    copyFileToLocalDir(path) {
        console.log('Copy now: ', path)

        let myPath = path;

        const ext = myPath.split('.').pop();
        const d = Date.now();
        const newName = `${d}.${ext}`;

        // get the last part of the path, which indicates the name
        const name = myPath.substr(myPath.lastIndexOf('/') + 1);
        // get the last part of the path, which indicates the name
        const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
        const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME;

        this.file.copyFile(copyFrom, name, copyTo, newName).then(
            success => {
                this.loadFiles();
            },
            error => {
                console.log('error: ', error);
            }
        );
    }

    openFile(f: FileEntry) {
        if (f.name.indexOf('.jpg') > -1) {
            // Photoviewer to present an Image
            this.photoViewer.show(f.nativeURL, f.name);
        } else if (f.name.indexOf('.png') > -1) {
            this.photoViewer.show(f.nativeURL, f.name);
        }
    }

    deleteFile(f: FileEntry) {
        const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
        this.file.removeFile(path, f.name).then(() => {
            this.loadFiles();
        }, err => console.log('Error in remove: ', err));
    }

    // save file to database as a blob 
    async uploadFile(f: FileEntry){
        const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
        const buffer = await this.file.readAsArrayBuffer(path, f.name);
        const type = this.getMimeType(f.name.split('.').pop())
        const fileBlob = new Blob([buffer],type)

        // unique name to store in the DB
        // 6 characters for the random ID
        const randomID = Math.random()
        .toString(36)
        .substring(2,8);

        const imageId = new Date().getTime() + randomID;

        

        //  save images inside files folder
        const uploadTask = this.storage.upload(`files/${imageId}`, fileBlob);
        // console.log("ID",imageId)
        
        uploadTask.percentageChanges().subscribe(changes => {
            0 - 100
            this.uploadProgress = changes;
        })

        uploadTask.then(async res => {
            // this.loadFilesFromCloud();
            const toast = await this.toast.create({
                duration: 2000,
                message: 'Filed uploaded!'
            });
            toast.present();

            // get url after file is uploaded
            const storageRef = firebase.storage().ref(`files/` + imageId)

            console.log(storageRef)

            storageRef.getDownloadURL().then(async res => {
                this.loader.presentLoading('Please wait')
                this.dbUrl = res
                console.log(this.dbUrl)
                console.log("inside upload function", this.dbUrl)
                // return this.dbUrl;
                let data = {
                    url : this.dbUrl.toString()
                }
                this.http.post("https://diabipal-ocr.herokuapp.com/url", data)
                .subscribe(data => {
                    this.loader.presentLoading('Generating results')
                    this.gotoForms(data)
                }, error => {
                    console.log(error);
        
                })
            });
        })

        
    }

    gotoForms(data){
        this.router.navigate(['/tabs/tabs/uploader/forms'],
            {
                queryParams: {
                    value: JSON.stringify(data)
                }
            }
        )

    }


    getMimeType(fileExt){
        if( fileExt == 'jpg') return { type: 'image/jpg'};
        else if ( fileExt == 'png') return { type: 'image/png'};
    }

    // load files from cloud database
    // loadFilesFromCloud(){
    //     this.cloudFiles = [];

    //     const storageRef = firebase.storage().ref('files');
    //     storageRef.listAll().then(result => {
    //         result.items.forEach(async ref => {
    //             this.cloudFiles.push({
    //                 name: ref.name,
    //                 url: await ref.getDownloadURL(),
    //                 full: ref.fullPath
    //             });

    //             ref.getDownloadURL().then(async res => {
    //                 this.dbUrl = res
    //                 // console.log(res)
    //                 // return this.dbUrl;
    //             });

    //             // return this.dbUrl;
    //         });
    //     });
    //     // console.log("@@@@@@@@@@@2",this.dbUrl)
    //     return this.dbUrl;
    // }

    // loadFilesFromCloud(){
    //     const storageRef = firebase.storage().ref('/files/'+this.randomID)
    //         storageRef.getDownloadURL().then(async res => {
    //             this.dbUrl = res
    //             console.log("inside upload function",this.dbUrl)
    //             // return this.dbUrl;
    //     });
    // }

    

}
