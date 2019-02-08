import { Component, OnInit } from '@angular/core';
import { DataRequestorService } from '../common/services/data-requestor.service';
import { User } from '../common/components/direct-thread-creation-modal/model/user.model';
import { UsernameService } from '../common/services/username.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {

  user: any;

  constructor(
    private _dataRequestor: DataRequestorService,
    private _router: Router,
    ) { }

  ngOnInit() {
    const request = 'users/' + String(UsernameService.id);
    this._dataRequestor.getRequest( request ).subscribe( res => {
      this.user = res;
    });
  }

  goToProfilePhotoEditor() {
    this._router.navigate(['profile-photo-editor']);
  }

  save() {
    const request = 'users/' + String(UsernameService.id);
    this._dataRequestor.putRequest(request, this.user ).subscribe( res => {
      // snackbar
    });
  }

}
