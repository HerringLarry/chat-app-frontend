import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThreadService } from 'src/app/common/services/thread-service.service';
import { MessagesService } from 'src/app/common/services/messages-service.service';
import { GroupService } from 'src/app/common/services/group-service.service';
import { DirectThreadService } from 'src/app/common/services/direct-thread-service.service';
import { DirectMessagesService } from 'src/app/common/services/direct-messages-service.service';

@Component({
  selector: 'app-thread-option',
  templateUrl: './thread-option.component.html',
  styleUrls: ['./thread-option.component.css']
})
export class ThreadOptionComponent implements OnInit {

  @Input() thread: any;

  constructor(private _threadService: ThreadService,
              private _directThreadService: DirectThreadService,
              private _messageService: MessagesService,
              private _directMesssageService: DirectMessagesService) { }

  ngOnInit() {
  }

  selectThread(): void {
    this.leaveAllCurrentRooms();
    this._threadService.thread = this.thread.name;
    this._messageService.joinRoom( this.thread.name, GroupService.group);
  }

  isCurrentThread(): boolean {
    return this._threadService.thread === this.thread.name;
  }

  leaveAllCurrentRooms(): void {
    if ( this._threadService.thread ) {
      this._messageService.leaveRoom(this._threadService.thread, GroupService.group);
      this._threadService.thread = null;
    }
    if ( this._directThreadService.thread ) {
      this._directMesssageService.leaveRoom(this._directThreadService.thread, GroupService.group);
      this._directThreadService.thread = null;
    }
  }
}
