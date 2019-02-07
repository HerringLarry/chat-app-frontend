import { Component, OnInit } from '@angular/core';
import { DataRequestorService } from '../common/services/data-requestor.service';
import { UsernameService } from '../common/services/username.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-photo-editor',
  templateUrl: './profile-photo-editor.component.html',
  styleUrls: ['./profile-photo-editor.component.css']
})
export class ProfilePhotoEditorComponent implements OnInit {
  selectedFile: File;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private _dataRequestorService: DataRequestorService,
    private _router: Router,
    ) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded() {
      // show cropper
  }
  loadImageFailed() {
      // show message
  }

  private b64toBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }

  onUpload() {
    if ( this.croppedImage ) {
      const formData = new FormData();
      const contentType = 'image/png';
      const blob = this.b64toBlob( this.croppedImage );
      formData.append('file', blob, 'filee');
      const request = 'profilephoto/' + UsernameService.id;
      this._dataRequestorService.postRequest(request, formData).subscribe( res => {
        this._router.navigate(['profile-editor']);
        console.log('woohoo');
      });
    }
  }

}
