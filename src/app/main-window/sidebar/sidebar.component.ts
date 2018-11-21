import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() threadClick: EventEmitter<void> = new EventEmitter();
  @Input() threads: any;

  constructor() { }

  ngOnInit() {
  }

  onThreadClick(event: any): void {
    this.threadClick.emit(event);
  }

}
