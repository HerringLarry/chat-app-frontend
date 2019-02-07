import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { SettingsService } from 'src/app/common/services/settings.service';
import { LoadingService } from 'src/app/common/services/loading.service';
import { ThreadService } from 'src/app/common/services/thread-service.service';
import { DirectThreadService } from 'src/app/common/services/direct-thread-service.service';
import { MessagesService } from 'src/app/common/services/messages-service.service';
import { DirectMessagesService } from 'src/app/common/services/direct-messages-service.service';

@Component({
  selector: 'app-message-display',
  templateUrl: './message-display.component.html',
  styleUrls: ['./message-display.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDisplayComponent implements OnInit, AfterViewChecked {

  @Input() messages: any[];
  @Output() nextMessages: EventEmitter<void> = new EventEmitter();
  processedMessages: any;
  previousUsername = '';

  constructor( private _loadingService: LoadingService,
    private _threadService: ThreadService,
    private _directThreadService: DirectThreadService,
    private _messagesService: MessagesService,
    private _directMessagesService: DirectMessagesService,
    ) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
  }

  isEmptyAndThreadSelected(): boolean {
    return this.messages.length === 0 && ( this._threadService.selected || this._directThreadService.selected );
  }

  setPreviousUsername( event: any ) {
    this.previousUsername = event;
  }

  isLoading() {
    return this._loadingService.isLoading;
  }

  isThreadSelected() {
    return ( this._threadService.selected || this._directThreadService.selected );
  }

  getNextMessages() {
    this.nextMessages.emit();
  }

  moreMessagesToBeLoaded() {
    if ( this._threadService.selected ) {
      return this._messagesService.getSkipValue() < this._messagesService.count;
    } else {
      return this._directMessagesService.getSkipValue() < this._directMessagesService.count;
    }
  }
}
