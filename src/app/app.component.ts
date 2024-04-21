import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SafeUrl } from '@angular/platform-browser';
import { VideoService } from './core/services/video.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    NgIf,
    NgClass
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  videoLst: any[] = []
  video: SafeUrl = "";
  videoPredict: SafeUrl = "";
  file?: File;
  fileName: string = 'Select File';
  isUploading: boolean = false;
  currentId: string = ""

  constructor(private videoService: VideoService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllVideo()
  }

  getAllVideo() {
    this.videoService.getAllVideos().subscribe(res => {
      this.videoLst = res.data
    })
  }

  getVideo(id: string) {
    this.videoService.getVideo(id).subscribe(res => {
      this.video = res;
      this.currentId = id;
    })
    this.videoService.getPredictedVideo(id).subscribe(res=>{
      this.videoPredict = res;
      this.currentId = id;
    })
  }

  onInput(event: any) {
    //console.log(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.file = file;
      this.fileName = this.file.name;
      console.log(this.file)
    } else {
      this.fileName = 'Select File';
    }

  }

  uploadVideo() {
    if (this.file) {
      this.isUploading = true;
      this.videoService.uploadVideo(this.file).subscribe({
        next: (res) => {
          this.fileName = 'Select File';
          this.file = undefined;
          this.getAllVideo();
          this.isUploading = false;
          this._snackBar.open('Upload successful.', undefined, {
            duration: 2000
          })
        },
        error: (err) => {
          this.file = undefined;
          this.isUploading = false
        }
      })
    }
  }

}
