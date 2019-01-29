import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { DataRequestorService } from '../common/services/data-requestor.service';
import { CurrentDirectThreadsService } from '../common/services/current-direct-threads.service';
import { GroupService } from '../common/services/group-service.service';
import { UsernameService } from '../common/services/username.service';
import { User } from '../common/components/direct-thread-creation-modal/model/user.model';
import { MultiInviteDto } from './dto/multi-invite.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-invite-window',
  templateUrl: './send-invite-window.component.html',
  styleUrls: ['./send-invite-window.component.css']
})
export class SendInviteWindowComponent implements OnInit, OnDestroy {
  options: User[] = [];
  selectedUsers: User[] = [];
  term$ = new Subject<string>();
  subscriptions: Subscription[] = [];

  constructor(private _dataRequestorService: DataRequestorService,
      private _currentDirectThreadService: CurrentDirectThreadsService,
      private _router: Router,
    ) {
  }

  ngOnInit() {
    if ( this.noGroupSelected() ) {
      this._router.navigate(['groupselectionwindow']);
    }
    const sub = this.term$.subscribe( term => this.search( term ));
    this.subscriptions.push( sub );

  }

  noGroupSelected(): boolean {
    return GroupService.group === '';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe() );
  }

  search( term: string ) {
    if ( term.length > 0 ) {
      const requestString = 'invites/' + term + '/' + GroupService.id;
      const unprocessedOption = this._dataRequestorService.getRequest(requestString).subscribe( (res: User[]) => {
        this.options = this.removeCurrentUserAndSelectedUsers(res);
      });
    } else {
      this.options = [];
    }
  }

  removeCurrentUserAndSelectedUsers( users: User[] ): User[] {
    const alteredUsers = [];
    users.forEach( user => {
      console.log(this.notInSelectedUsers( user) );
      if ( user.id !== UsernameService.id && this.notInSelectedUsers( user ) ) {
        alteredUsers.push(user);
      }
    });

    return alteredUsers;
  }

  addUser( user: User ) {
    this.selectedUsers.push( user );
    this.removeUserFromOptions( user );
  }

  removeUserFromOptions( user: User ) {
    const index = this.options.findIndex( optionUser => {
      return optionUser.id === user.id ? true : false;
    });
    if ( index !== -1 ) {
      this.options.splice(index, 1);
    }
  }

  removeUserFromSelected( user: User ) {
    const index = this.selectedUsers.findIndex( optionUser => {
      return optionUser.id === user.id ? true : false;
    });
    if ( index !== -1 ) {
      this.selectedUsers.splice(index, 1);
    }
  }

  notInSelectedUsers( user: User ): boolean {
    for ( const selectedUser of this.selectedUsers ) {
      if ( selectedUser.id === user.id ) {
        return false;
      }
    }

    return true;
  }

  sendInvites() {
    const multiInviteDto = new MultiInviteDto( this.selectedUsers, GroupService.id, UsernameService.id );
    const request = 'invites/invite';
    this._dataRequestorService.postRequest(request, multiInviteDto).subscribe( res => {
      this.selectedUsers = [];
    });
  }
}
