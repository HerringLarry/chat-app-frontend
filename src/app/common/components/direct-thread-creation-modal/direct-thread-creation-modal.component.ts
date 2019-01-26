import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import { DataRequestorService } from '../../services/data-requestor.service';
import { UsernameService } from '../../services/username.service';
import { GroupService } from '../../services/group-service.service';
import { User } from './model/user.model';
import { DirectMessageThreadDto as DirectThreadDto } from './dto/direct-message-thread.dto';
import { CurrentDirectThreadsService } from '../../services/current-direct-threads.service';
import { CreationResponseDto } from './dto/creation-response.dto';


@Component({
  selector: 'app-direct-thread-creation-modal',
  templateUrl: './direct-thread-creation-modal.component.html',
  styleUrls: ['./direct-thread-creation-modal.component.css']
})
export class DirectThreadCreationModalComponent implements OnInit {
  myControl = new FormControl();
  options: User[] = [];
  term$ = new Subject<string>();
  filteredOptions: Observable<string[]>;
  selectedUsers: User[] = [];

  constructor( private dialogRef: MatDialogRef<DirectThreadCreationModalComponent>, private _dataRequestorService: DataRequestorService,
      private _currentDirectThreadService: CurrentDirectThreadsService,
      private snackBar: MatSnackBar,
    ) {
  }

  ngOnInit() {
    this.term$.subscribe(term => this.search(term) );
  }

  search( term: string ) {
    if ( term.length !== 0 ) {
    const requestString = 'member/' + term + '/' + GroupService.id;
    this._dataRequestorService.getRequest(requestString).subscribe( (res: User[]) => {
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

  public close(): void {
    this.dialogRef.close();
  }

  public save(): void {
    const request = 'directmessagethread';
    const userId: number = UsernameService.id;
    const DMTDto: DirectThreadDto = new DirectThreadDto( this.selectedUsers, userId, GroupService.group);
    this._dataRequestorService.postRequest(request, DMTDto).subscribe( ( creationResponseDto: CreationResponseDto ) => {
      if ( creationResponseDto.alreadyCreated ) {
        this._currentDirectThreadService.setThreadToSelectedAndJoinThreadRoom( creationResponseDto.threadId );
        this.emitMessage('Thread Of Same Name Already Created!');

      } else {
          this._currentDirectThreadService.loadInitialDataAndSelectThread( creationResponseDto.threadId );
      }
      this.dialogRef.close();
    });
  }

  private emitMessage( msg: string ): void {
    this.snackBar.open(msg, 'Notification', {
      duration: 500,
    });
  }

}
