import { Component, OnInit } from '@angular/core';
import { DataRequestorService } from '../common/services/data-requestor.service';
import { UsernameService } from '../common/services/username.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedFile: File;

  constructor( private _dataRequestorService: DataRequestorService ) { }

  ngOnInit() {
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    const request = 'profilephoto/' + UsernameService.id;
    this._dataRequestorService.postRequest(request, formData).subscribe( res => {
      console.log(res);
    });
  }

}
