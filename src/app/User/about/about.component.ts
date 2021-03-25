import { Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({
    url:'http://localhost:3000/webapp/postUpload',
    itemAlias: 'photo'
  })

  constructor() { }

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) =>{
      file.withCredentials=false;
    }
    this.uploader.onCompleteItem = (item: any, status:any) => {
      alert('File Uploaded Successfully');
    }
  }

}
