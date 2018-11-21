import { Component, OnInit } from '@angular/core';
import { DataRequestorService } from '../common/services/data-requestor.service';
import { ThreadService } from '../common/services/thread-service.service';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})
export class MainWindowComponent implements OnInit {

  threads: any;
  selectedThread: string;

  constructor( private _dataRequestor: DataRequestorService) { }

  ngOnInit() {
    this._dataRequestor.getRequest('thread/g').subscribe( result => {
      this.threads = result;
    });
  }

  onThreadClick(event: any): void {
    this._dataRequestor.getRequest('message/g/' + ThreadService.thread).subscribe( result => {
      console.log(result);
    });
  }

}
