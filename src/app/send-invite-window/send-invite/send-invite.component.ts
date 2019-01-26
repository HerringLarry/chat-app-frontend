import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { User } from 'src/app/common/components/direct-thread-creation-modal/model/user.model';
import { DataRequestorService } from 'src/app/common/services/data-requestor.service';
import { UsernameService } from 'src/app/common/services/username.service';
import { GroupService } from 'src/app/common/services/group-service.service';
import { InviteDto } from '../dto/invite.dto';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-send-invite',
  templateUrl: './send-invite.component.html',
  styleUrls: ['./send-invite.component.css']
})
export class SendInviteComponent implements OnInit, OnDestroy {

  @Input() user: User;
  @Output() removeUser = new EventEmitter<User>();
  subscriptions: Subscription[] = [];

  constructor( private _dataRequestorService: DataRequestorService,
                private snackbar: MatSnackBar,
    ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe() );
  }

  invite() {
    const request = 'invites/invite';
    const fromUser: string = UsernameService.username;
    const toUser: string = this.user.username;
    const groupName: string = GroupService.group;
    const inviteDto: InviteDto = new InviteDto( fromUser, toUser, groupName );
    const sub= this._dataRequestorService.postRequest( request, inviteDto ).subscribe( res => {
      this.snackbar.open('User Invited', 'Notification', {
        duration: 500,
      });
      this.removeUser.emit( this.user );
    });
    this.subscriptions.push( sub );
  }

}
