import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Invite } from '../models/invite';
import { DataRequestorService } from 'src/app/common/services/data-requestor.service';
import { ResponseDto } from './dto/response.dto';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit, OnDestroy {

  @Input() invite: Invite;
  @Output() deleteInvite = new EventEmitter<Invite>();
  subscriptions: Subscription[] = [];

  constructor( private _dataRequestor: DataRequestorService, private snackbar: MatSnackBar ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  accept() {
    const request = 'invites/respond';
    const responseDto: ResponseDto = new ResponseDto(true, this.invite);
    const sub = this._dataRequestor.postRequest(request, responseDto ).subscribe( res => {
      this.deleteInvite.emit(this.invite);
      this.snackbar.open('Accepted Invitation', 'Notification', {
        duration: 500,
      });
    });
    this.subscriptions.push( sub );
  }

  decline() {
    const request = 'invites/respond';
    const responseDto: ResponseDto = new ResponseDto(false, this.invite);
    const sub = this._dataRequestor.postRequest(request, responseDto ).subscribe( res => {
      this.deleteInvite.emit(this.invite);
      this.snackbar.open('Declined Invitation', 'Notification', {
        duration: 500,
      });
    });
    this.subscriptions.push( sub );
  }

}
