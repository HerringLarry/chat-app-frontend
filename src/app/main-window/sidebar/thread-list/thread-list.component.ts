import { ThreadService } from 'src/app/common/services/thread-service.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { DataRequestorService } from 'src/app/common/services/data-requestor.service';
import { CurrentThreadService } from 'src/app/common/services/current-threads-service.service';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  @Input() threads: any;
  @Output() threadClick: EventEmitter<void> = new EventEmitter();

  constructor( private _currentThreadService: CurrentThreadService, private _threadService: ThreadService ) { }

  ngOnInit() {
    this._currentThreadService.loadInitialData();
  }

  onThreadClick(event: any): void {
    console.log(event);
    // this._threadService.thread = event.thread.name;
  }
}
