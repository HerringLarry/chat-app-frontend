import { MessageDisplayComponent } from './message-display/message-display.component';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {

  @Input() messages: any;
  @Output() messageSubmitted: EventEmitter<void> = new EventEmitter();
  @Output() nextMessages: EventEmitter<void> = new EventEmitter();
  @ViewChild('msgDisplay') private myScrollContainer: ElementRef;

  constructor() { }

  ngOnInit() {
    this.scrollToBottom();
  }

  onMessageSubmitted(): void {
    this.messageSubmitted.emit();
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  getNextMessages() {
    this.nextMessages.emit();
  }
}
