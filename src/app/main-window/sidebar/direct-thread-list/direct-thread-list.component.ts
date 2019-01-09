import { ThreadService } from 'src/app/common/services/thread-service.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CurrentDirectThreadsService } from 'src/app/common/services/current-direct-threads.service';

@Component({
  selector: 'app-direct-thread-list',
  templateUrl: './direct-thread-list.component.html',
  styleUrls: ['./direct-thread-list.component.css']
})
export class DirectThreadListComponent implements OnInit {

  @Input() threads: any;
  @Output() threadClick: EventEmitter<void> = new EventEmitter();

  constructor( private _currentDirectThreadService: CurrentDirectThreadsService, private _threadService: ThreadService ) { }

  ngOnInit() {
    this._currentDirectThreadService.loadInitialData();
  }

  onThreadClick(event: any): void {
    console.log(event);
    // this._threadService.thread = event.thread.name;
  }
}
