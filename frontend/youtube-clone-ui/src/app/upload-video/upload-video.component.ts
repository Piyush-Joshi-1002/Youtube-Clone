import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { VideoService } from '../video.service';
@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent{

  public files: NgxFileDropEntry[] = [];
  fileUploaded: boolean = false;
  fileEntry: FileSystemFileEntry | undefined;
  
  constructor(private videoService:VideoService,private router:Router){

  }
    public dropped(files: NgxFileDropEntry[]) {
      this.files = files;
      for (const droppedFile of files) {
        if (droppedFile.fileEntry.isFile) {
          this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          this.fileEntry.file((file: File) => {
            console.log(droppedFile.relativePath, file);
            this.fileUploaded = true;
          });
        } else {
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          console.log(droppedFile.relativePath, fileEntry);
        }
      }
    }

    public fileOver(event : any){
      console.log(event);
    }

    public fileLeave(event : any){
      console.log(event);
    }
    uploadVideo(){
        if(this.fileEntry !== undefined)
        {
            console.log(""+this.fileEntry);
            this.fileEntry.file(file=>{
              this.videoService.uploadVideo(file).subscribe(data=>{
                   this.router.navigateByUrl("/save-video-details/"+data.videoId);
              })
            })
        }
    }
}
