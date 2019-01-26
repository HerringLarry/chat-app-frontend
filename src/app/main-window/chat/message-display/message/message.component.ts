import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
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
  @Input() previousUsername: string;
  @Output() currentUsername = new EventEmitter<string>();
  label: string;
  isSameAsPreviousUsername: boolean;

  constructor() { }

  ngOnInit() {
    this.setLabel();
    this.setIsSameAsPreviousUsername();
    this.currentUsername.emit( this.message.username );
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

  setLabel(): void {
      if ( SettingsService.showUsername) {
        this.label = this.message.username;
      } else {
        this.label = this.message.firstName + ' ' +  this.message.lastName;
      }
  }

  setIsSameAsPreviousUsername() {
    if ( this.message.username !== this.previousUsername ) {
      this.isSameAsPreviousUsername = false;
    } else {
      this.isSameAsPreviousUsername = true;
    }
  }

}
