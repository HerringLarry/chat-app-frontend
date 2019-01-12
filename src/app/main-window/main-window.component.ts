import { MatSnackBar } from '@angular/material';
import { DirectMessagesService } from 'src/app/common/services/direct-messages-service.service';
import { CurrentThreadService } from '../common/services/current-threads-service.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DataRequestorService } from '../common/services/data-requestor.service';
import { ThreadService } from '../common/services/thread-service.service';
import { MessagesService } from '../common/services/messages-service.service';
import { GroupService } from '../common/services/group-service.service';
import { Subject, Subscription, SubscriptionLike } from 'rxjs';
import { Router } from '@angular/router';
import { DirectThreadService } from '../common/services/direct-thread-service.service';
import { Message } from './models/message';
import { DirectMessage } from './models/direct-message';
import { ProcessedMessage } from './models/processed-message';
import { User } from '../common/components/direct-thread-creation-modal/model/user.model';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css']
})

export class MainWindowComponent implements OnInit, OnDestroy {

  @ViewChild('container') container: ElementRef;


  selectedThread: string;
  messages: ProcessedMessage[];
  directMessages: ProcessedMessage[];
  threadsSource: Subject<any[]>;
  public threads: any[] = [];
  messagesSubscription: Subscription;
  directMessagesSubscription: Subscription;
  users: User[];

  constructor( private _dataRequestor: DataRequestorService,
    private _messagesService: MessagesService,
    private _threadService: ThreadService,
    private router: Router,
    private _directMessagesService: DirectMessagesService,
    private _directThreadService: DirectThreadService,
    private snackbar: MatSnackBar,
    ) {
      this.initializeThreads();
      if ( this.noGroupSelected() ) {
        this.snackbar.open('No Group Selected', 'Notification', {
          duration: 500,
        });
        this.router.navigate(['groupselectionwindow']);
      }
      this.messagesSubscription = this._messagesService.onMessage().subscribe( responseObject => {
        // this.scrollToBottom();
        this.users = responseObject.users;
        this.messages = this.processMessages( responseObject.messages );
      });

      this.directMessagesSubscription = this._directMessagesService.onMessage().subscribe( responseObject => {
        this.users = responseObject.users;
        this.directMessages = this.processMessages(responseObject.directMessages);
      });

    }

  ngOnInit() {
  }

  initializeThreads() {
    this._threadService.threadId = null;
    this._directThreadService.threadId = null;
  }

  noGroupSelected(): boolean {
    return GroupService.group === '';
  }

  ngOnDestroy() {
    this._threadService.threadId = null;
    this._directThreadService = null;
    this.messagesSubscription.unsubscribe();
    this.directMessagesSubscription.unsubscribe();
  }

  scrollToBottom() {
    this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
  }

  getMessages() {
    if ( this._threadService.threadId !== null ) {

      return this.messages;
    } else if ( this._directThreadService.threadId !== null ) {

      return this.directMessages;
    } else {

      return [];
    }
  }


  processMessages( messages: Message[]): ProcessedMessage[] {
    const processedMessages: ProcessedMessage[] = [];
    let previousTime: number;
    for ( const message of messages ) {
      message.createdAt = new Date(message.createdAt);
      const user: string = this.matchMessageUserIdWithUser( message );
      if ( previousTime === undefined ) {
        const roundedDown = this.roundDown( ( message.createdAt.getTime() / 1000 ) );
        processedMessages.push( this.createTimeDivider( roundedDown ) );
      } else if ( this.isPastNextHour( previousTime, ( message.createdAt.getTime() / 1000 ) ) ) {
        const roundedDown = this.roundDown( ( message.createdAt.getTime() / 1000 ) );
        processedMessages.push( this.createTimeDivider( roundedDown ) );
      }
      const processedMessage = new ProcessedMessage(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
      processedMessage.setValues( message, user );
      processedMessages.push( processedMessage );
      previousTime = message.createdAt.getTime() / 1000;
    }

    console.log(processedMessages);
    return processedMessages;
  }

  private matchMessageUserIdWithUser( message: Message ): string {
    for ( const user of this.users ) {
      if ( user.id === message.userId ) {
        return user.username;
      }
    }
  }

  private isPastNextHour( previousTime: number, newTime: number ): boolean {
    // const roundedPreviousTime: number = previousTime + ( 3600 * 24 - (previousTime % (3600 * 24)) );
    const roundedPreviousTime: number = previousTime + ( 3600 - (previousTime % 3600) );

    return newTime > roundedPreviousTime;

  }

  private roundDown( newTime: number ): number {

    return newTime - ( newTime % (3600) );
  }

  private createTimeDivider( roundedDown: number ): ProcessedMessage {
    const date: Date = new Date(roundedDown * 1000);

    return new ProcessedMessage(undefined, undefined, undefined, undefined, undefined, undefined, date, true );
  }

}
