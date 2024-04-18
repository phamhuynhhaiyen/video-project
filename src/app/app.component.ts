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
    MatProgressBarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  videoLst: string[] = []
  video: SafeUrl = "";
  file!: File;
  progress = 0;
  fileName: string = 'Select File';

  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
    this.videoService.getAllVideos().subscribe(res => {
      this.videoLst = res.data
    })
  }

  getVideo(id: string) {
    // console.log(id.slice(0,id.indexOf('.')))
    const newId = id.slice(0, id.indexOf('.'))
    this.videoService.getVideo(newId).subscribe(res => {
      console.log(res)
      this.video = res
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
    this.videoService.uploadVideo(this.file).subscribe(res => console.log(res))
  }

}
