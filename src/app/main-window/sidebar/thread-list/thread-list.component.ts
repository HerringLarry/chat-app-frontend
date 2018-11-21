import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { DataRequestorService } from 'src/app/common/services/data-requestor.service';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {

  @Input() threads: any;
  @Output() threadClick: EventEmitter<void> = new EventEmitter();

  constructor( private _dataRequestor: DataRequestorService ) { }

  ngOnInit() {
  }

  onThreadClick(event: any): void {
    this.threadClick.emit(event);
  }
}
