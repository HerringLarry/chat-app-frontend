import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
