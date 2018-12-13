import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThreadService } from 'src/app/common/services/thread-service.service';
import { MessagesService } from 'src/app/common/services/messages-service.service';
import { GroupService } from 'src/app/common/services/group-service.service';

@Component({
  selector: 'app-thread-option',
  templateUrl: './thread-option.component.html',
  styleUrls: ['./thread-option.component.css']
})
export class ThreadOptionComponent implements OnInit {

  @Input() thread: any;

  constructor(private _threadService: ThreadService, private _messageService: MessagesService) { }

  ngOnInit() {
  }

  selectThread(): void {
    this._messageService.leaveRoom(this._threadService.thread, GroupService.group);
    this._threadService.thread = this.thread.name;
    this._messageService.joinRoom( this.thread.name, GroupService.group);
  }
}
