import { VideoDto } from './../video-dto';
import { VideoService } from './../video.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent implements OnInit {

  SaveVideoDetailsForm:FormGroup ;
  title:FormControl = new FormControl('');
  description:FormControl = new FormControl('');
  videoStatus:FormControl = new FormControl('');
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  selectedFile!: File;
  selectedFileName = "";
  videoId:string = '';
  videoUrl!:string;
  thumbnailUrl!: string;
  constructor(private activatedRoute:ActivatedRoute,private videoService:VideoService,private _snackBar: MatSnackBar) { 
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVidoe(this.videoId).subscribe(data=>{
      this.videoUrl=data.videoUrl;
      this.thumbnailUrl = data.thumbnailUrl;
    });
    this.SaveVideoDetailsForm = new FormGroup({
      title: this.title,
      description:this.description,
      videoStatus:this.videoStatus
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  
  onFileSelected($event:Event){
    //@ts-ignore
    this.selectedFile = $event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    
  }
  ngOnInit(): void {
  }
  onUpload(){
      this.videoService.uploadThumbnail(this.selectedFile,this.videoId).subscribe(data =>{
        console.log(data);
        this.thumbnailUrl = data;
        let message:string = "Thumbnail Uploaded successfully";
        let action:string = "close";
        this._snackBar.open(message, action);
      })
  }
  saveVideo(){
    const videoMataData:VideoDto = {
      "id":this.videoId,
      "title" : this.SaveVideoDetailsForm.get('title')?.value,
      "description":this.SaveVideoDetailsForm.get("description")?.value,
      "tags":this.tags,
      "videoStatus":this.SaveVideoDetailsForm.get("videoStatus")?.value,
      "videoUrl":this.videoUrl,
      "thumbnailUrl":this.thumbnailUrl 
    }
    this.videoService.saveVideo(videoMataData).subscribe(data=>{
        this._snackBar.open("Video MetaData Updated successfully","Ok");
    })
  }
}
