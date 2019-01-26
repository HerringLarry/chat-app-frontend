import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataRequestorService } from '../common/services/data-requestor.service';
import { Invite } from './models/invite';
import { UsernameService } from '../common/services/username.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invite-window',
  templateUrl: './invite-window.component.html',
  styleUrls: ['./invite-window.component.css']
})
export class InviteWindowComponent implements OnInit, OnDestroy {

  invites: Invite[] = [];
  subscriptions: Subscription[] = [];

  constructor( private _dataRequestorService: DataRequestorService ) { }

  ngOnInit() {
    const request: string = 'invites/' + UsernameService.username;
    const sub = this._dataRequestorService.getRequest(request).subscribe( (res: Invite[]) => {
      this.invites = res;
    });
    this.subscriptions.push(sub);

  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe() );
  }

  deleteInvite( event: any ): void {
    const index = this.invites.findIndex( ( invite: Invite ) => {
      return invite.id === event.id;
    } );
    this.invites.splice(index, 1);
  }

}
