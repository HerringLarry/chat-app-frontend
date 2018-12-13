import { CurrentThreadService } from '../common/services/current-threads-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataRequestorService } from '../common/services/data-requestor.service';
import { ThreadService } from '../common/services/thread-service.service';
import { MessagesService } from '../common/services/messages-service.service';
import { GroupService } from '../common/services/group-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})

export class MainWindowComponent implements OnInit, OnDestroy {

  selectedThread: string;
  messages: any;
  threadsSource: Subject<any[]>;
  public threads: any[] = [];

  constructor( private _dataRequestor: DataRequestorService,
    private _messagesService: MessagesService,
    private _threadService: ThreadService,
    ) {}

  ngOnInit() {
    console.log(GroupService.group);
  }

  ngOnDestroy() {
    this._threadService.thread = null;
  }

  onThreadClick(event: any): void {
    console.log('hello');
    this._messagesService.joinRoom(this.selectedThread, GroupService.group);
  }

  onMessageSubmitted(event: any): void {
    this.onThreadClick(event);
  }

  getMessages() {
  }

}
