import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { UsernameService } from 'src/app/common/services/username.service';
import { Message } from 'src/app/main-window/models/message';
import { SettingsService } from 'src/app/common/services/settings.service';
import { ProcessedMessage } from 'src/app/main-window/models/processed-message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {

  @Input() message: ProcessedMessage;

  constructor() { }

  ngOnInit() {
  }

  isCurrent(): boolean {
    return this.message.username === UsernameService.username;
  }

  outputTime(): string {
    if ( SettingsService.showTime) {
      return this.message.createdAt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    } else {
      return '';
    }
  }

  outputDate(): string {

    // tslint:disable-next-line:max-line-length
    return this.message.createdAt.toDateString();
  }

  getCorrectLabel(): string {
    if ( SettingsService.showUsername ) {
      return this.message.username;
    } else {
      return this.message.firstName + ' ' +  this.message.lastName;
    }
  }

}
