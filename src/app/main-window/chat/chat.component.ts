import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() messages: any;
  @Output() messageSubmitted: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onMessageSubmitted(): void {
    this.messageSubmitted.emit();
  }

}
