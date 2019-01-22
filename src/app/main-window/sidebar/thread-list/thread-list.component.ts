import { ThreadService } from 'src/app/common/services/thread-service.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { DataRequestorService } from 'src/app/common/services/data-requestor.service';
import { CurrentThreadService } from 'src/app/common/services/current-threads-service.service';
import { GroupService } from 'src/app/common/services/group-service.service';
import { UsernameService } from 'src/app/common/services/username.service';
import { ProcessedNotification } from '../../models/processed-notification';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  @Input() threads: any;
  @Output() threadClick: EventEmitter<void> = new EventEmitter();
  @Input() notifications: ProcessedNotification[];

  constructor( private _currentThreadService: CurrentThreadService, private _threadService: ThreadService,
    private _dataRequestor: DataRequestorService,
    ) { }

  ngOnInit() {
    this._currentThreadService.loadInitialData();
  }

  onThreadClick(event: any): void {
    // this._threadService.thread = event.thread.name;
  }
}
