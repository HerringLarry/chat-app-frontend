import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invite } from '../models/invite';
import { DataRequestorService } from 'src/app/common/services/data-requestor.service';
import { ResponseDto } from './dto/response.dto';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  @Input() invite: Invite;
  @Output() deleteInvite = new EventEmitter<Invite>();

  constructor( private _dataRequestor: DataRequestorService ) { }

  ngOnInit() {
    console.log(this.invite);
  }

  accept() {
    const request = 'invites/respond';
    const responseDto: ResponseDto = new ResponseDto(true, this.invite);
    this._dataRequestor.postRequest(request, responseDto ).subscribe( res => {
      this.deleteInvite.emit(this.invite);
    });
  }

  decline() {
    const request = 'invites/respond';
    const responseDto: ResponseDto = new ResponseDto(false, this.invite);
    this._dataRequestor.postRequest(request, responseDto ).subscribe( res => {
      this.deleteInvite.emit(this.invite);
    });
  }

}
