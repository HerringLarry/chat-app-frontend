import { Component, OnInit } from '@angular/core';
import { DataRequestorService } from '../common/services/data-requestor.service';
import { Invite } from './models/invite';
import { UsernameService } from '../common/services/username.service';

@Component({
  selector: 'app-invite-window',
  templateUrl: './invite-window.component.html',
  styleUrls: ['./invite-window.component.css']
})
export class InviteWindowComponent implements OnInit {

  invites: Invite[];

  constructor( private _dataRequestorService: DataRequestorService ) { }

  ngOnInit() {
    const request: string = 'invites/' + UsernameService.username;
    this._dataRequestorService.getRequest(request).subscribe( res => {
      this.invites = res;
    });

  }

  deleteInvite( event: any ): void {
    const index = this.invites.findIndex( ( invite: Invite ) => {
      return invite.id === event.id;
    } );
    this.invites.splice(index, 1);
  }

  areThereInvites(): boolean {
    return this.invites.length === 0;
  }
}
