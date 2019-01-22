import { UsernameService } from 'src/app/common/services/username.service';
import { GroupCreationDto } from './dto/group-creation.dto';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataRequestorService } from '../../services/data-requestor.service';
import { CurrentThreadService } from '../../services/current-threads-service.service';
import { GroupService } from '../../services/group-service.service';
import { ThreadCreationDto } from './dto/thread-creation.dto';
import { GroupSelectionService } from '../../services/group-selection.service';
import { CreationResponseDto } from '../direct-thread-creation-modal/dto/creation-response.dto';

@Component({
    selector: 'app-creation-modal',
    templateUrl: './creation-modal.component.html',
    styleUrls: ['./creation-modal.component.css']
})
export class CreationModalComponent implements OnInit {


    name = '';
    type = '';
    description: string;
    placeHolder = '';
    header = '';

    constructor(
      private _dataRequestor: DataRequestorService,
      private dialogRef: MatDialogRef<CreationModalComponent>,
      private _currentThreadService: CurrentThreadService,
      private _groupSelectionService: GroupSelectionService,
      private snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) data) {
        this.type = data.type;
        this.setHeaderAndPlaceHolder();
    }

    ngOnInit() { }

    setHeaderAndPlaceHolder() {
      if (this.type === 'group') {
        this.header = 'Enter Group Name';
        this.placeHolder = 'Group Name';
      } else if ( this.type === 'thread' ) {
        this.header = 'Enter Thread Name';
        this.placeHolder = 'Thread Name';
      } else {
        this.dialogRef.close();
      }
    }

    save() {
      if ( this.type === 'group') {
        this.saveGroup();
      } else {
        this.saveThread();
      }
    }

    saveGroup() {
      const groupCreationDto: GroupCreationDto = new GroupCreationDto( this.name, UsernameService.username);
      this._dataRequestor.postRequest('groups', groupCreationDto).subscribe( res => {
        this.dialogRef.close(this.name);
        this._groupSelectionService.loadInitialData();
      });
      this.dialogRef.close(this.name);
    }

    saveThread() {
      const threadCreationDto: ThreadCreationDto = new ThreadCreationDto( this.name, GroupService.group, UsernameService.username );
      this._dataRequestor.postRequest('thread', threadCreationDto).subscribe( (creationResponseDto: CreationResponseDto ) => {
        this.dialogRef.close(this.name);
        if ( creationResponseDto.alreadyCreated ) {
          this._currentThreadService.setThreadToSelectedAndJoinThreadRoom( creationResponseDto.threadId );
          this.emitMessage('Thread Of Same Name Already Created!');
        } else {
          this._currentThreadService.loadInitialDataAndSelectThread( creationResponseDto.threadId );
        }
      });
      this.dialogRef.close(this.name);
    }

    close() {
      this.dialogRef.close();
    }

    private emitMessage( msg: string ): void {
      this.snackBar.open(msg, 'Notification', {
        duration: 500,
      });
    }
}
