import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
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
  options: User[];
  filteredOptions: Observable<string[]>;
  selectedUsers: User[] = [];

  constructor( private dialogRef: MatDialogRef<DirectThreadCreationModalComponent>, private _dataRequestorService: DataRequestorService,
      private _currentDirectThreadService: CurrentDirectThreadsService,
      private snackBar: MatSnackBar,
    ) {
  }

  ngOnInit() {
    const requestString = 'groups/' + UsernameService.username + '/' + GroupService.group;
    const unprocessedOption = this._dataRequestorService.getRequest(requestString).subscribe( (res: User[]) => {
      this.options = this.removeCurrentUser(res);
    });

  }

  removeCurrentUser( users: User[] ): User[] {
    const index = users.findIndex( (user: User ) => {
      return user.id === UsernameService.id;
    });

    users.splice(index, 1);

    return users;
  }

  onSelection(e, v) {
    if (e.option._selected) {
      const index: number = this.options.findIndex( user => {
        return user.username ===  e.option._element.nativeElement.textContent.trim();
       });
      if (index > -1 ) {
        this.selectedUsers.push(this.options[index]);
      }
    } else {
      const index: number = this.selectedUsers.findIndex( user => {
        return user.username ===  e.option._element.nativeElement.textContent.trim();
       });
    }
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
