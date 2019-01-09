import { Component, OnInit, Input } from '@angular/core';
import { UsernameService } from 'src/app/common/services/username.service';
import { Message } from 'src/app/main-window/models/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message: Message;

  constructor() { }

  ngOnInit() {
  }

  isCurrent(): boolean {
    console.log(this.message);
    return this.message.username === UsernameService.username;
  }

  outputTime(): string {
    return this.message.createdAt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }
  }

  outputDate(): string {

    // tslint:disable-next-line:max-line-length
    return this.message.createdAt.toDateString();
  }

}
