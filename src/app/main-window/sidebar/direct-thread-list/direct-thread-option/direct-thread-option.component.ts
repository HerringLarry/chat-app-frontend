import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThreadService } from 'src/app/common/services/thread-service.service';
import { MessagesService } from 'src/app/common/services/messages-service.service';
import { GroupService } from 'src/app/common/services/group-service.service';
import { DirectThreadService } from 'src/app/common/services/direct-thread-service.service';
import { DirectMessagesService } from 'src/app/common/services/direct-messages-service.service';

@Component({
  selector: 'app-direct-thread-option',
  templateUrl: './direct-thread-option.component.html',
  styleUrls: ['./direct-thread-option.component.css']
})
export class DirectThreadOptionComponent implements OnInit {

  @Input() thread: any;

  splitThreadName: string;

  constructor(private _threadService: ThreadService,
    private _directThreadService: DirectThreadService,
    private _messageService: MessagesService,
    private _directMesssageService: DirectMessagesService) { }

  ngOnInit() {
    // this.splitThreadName = this.parseThreadName();
    console.log(this.thread);
    this.splitThreadName = this.parseThreadName();
  }

  parseThreadName(): string {
    const split: string = this.createNameFromUsernames();

    return split;
  }

  createNameFromUsernames(): string {
    let split = '';
    for ( const username of this.thread.usernames) {
      if ( split !== '' ) {
        split = split + ', ' + username;
      } else {
        split = username;
      }
    }

    return split;
  }

  selectThread(): void {
    this.leaveAllCurrentRooms();
    this._directThreadService.threadId = this.thread.id;
    this._directThreadService.selected = true;
    this._directMesssageService.joinRoom( this._directThreadService.threadId, GroupService.group);
  }

  isCurrentThread(): boolean {
    return this._directThreadService.threadId === this.thread.id && this._directThreadService.selected;
  }

  leaveAllCurrentRooms(): void {
    if ( this._threadService.threadId ) {
      this._messageService.leaveRoom(this._threadService.threadId, GroupService.group);
    }
    this._threadService.threadId = null;
    this._threadService.selected = false;

    if ( this._directThreadService.threadId ) {
      this._directMesssageService.leaveRoom(this._directThreadService.threadId, GroupService.group);
    }
    this._directThreadService.threadId = null;
    this._directThreadService.selected = false;
  }

}
