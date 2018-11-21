import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThreadService } from 'src/app/common/services/thread-service.service';

@Component({
  selector: 'app-thread-option',
  templateUrl: './thread-option.component.html',
  styleUrls: ['./thread-option.component.css']
})
export class ThreadOptionComponent implements OnInit {

  @Input() thread: any;
  @Output() threadClick: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  selectThread(): void {
    ThreadService.thread = this.thread.name;
    this.threadClick.emit();
  }

}
