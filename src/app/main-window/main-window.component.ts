import { ProcessedNotification } from './models/processed-notification';
import { MatSnackBar } from '@angular/material';
import { DirectMessagesService } from 'src/app/common/services/direct-messages-service.service';
import { CurrentThreadService } from '../common/services/current-threads-service.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, DoCheck, ChangeDetectionStrategy } from '@angular/core';
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
import { User } from './models/user';
// tslint:disable-next-line:max-line-length
import { NotificationsService } from '/Users/williamnewman/chat-app/chat-app-frontend/src/app/common/services/notifications-service.service';
import { UsernameService } from '../common/services/username.service';
import { RawNotification as RawNotificationDto, ThreadNotification } from './dto/raw-notification.dto';
import { LoadingService } from '../common/services/loading.service';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css'],
})

export class MainWindowComponent implements OnInit, OnDestroy, DoCheck {

  @ViewChild('container') container: ElementRef;


  selectedThread: string;
  messages: ProcessedMessage[] = [];
  directMessages: ProcessedMessage[];
  threadsSource: Subject<any[]>;
  public threads: any[] = [];
  subscriptions: Subscription[] = [];
  onMessagesSubscription: Subscription; // on Message
  onMessagesJoinSubscription: Subscription; // on Room Join
  onDirectMessagesSubscription: Subscription; // on Message
  onDirectMessagesJoinSubscription: Subscription; // on Room Join
  notificationSubscription: Subscription;
  notificationOnReadSubscription: Subscription;
  notifications: any[];
  directNotifications: any[];
  users: User[];
  @ViewChild(ChatComponent) chat: ChatComponent; // child component so I can trigger scroll to bottom on new message

  constructor( private _dataRequestor: DataRequestorService,
    private _messagesService: MessagesService,
    private _threadService: ThreadService,
    private router: Router,
    private _directMessagesService: DirectMessagesService,
    private _directThreadService: DirectThreadService,
    private _notificationsService: NotificationsService,
    private snackbar: MatSnackBar,
    private _loadingService: LoadingService,
    ) {
      this.initializeThreads();
      this._messagesService.loadInitialData();
      if ( this.noGroupSelected() ) {
        this.snackbar.open('No Group Selected', 'Notification', {
          duration: 500,
        });
        this.router.navigate(['groupselectionwindow']);
      }
      this.initializeSubscriptions();

    }

  ngOnInit() {
  }

  ngDoCheck() {
  }


  initializeThreads() {
    this._threadService.threadId = null;
    this._threadService.selected = false;
    this._directThreadService.threadId = null;
    this._directThreadService.selected = false;
  }

  initializeSubscriptions() {

    this.onMessagesSubscription = this._messagesService.onMessage().subscribe( responseObject => {
      this.processSingleMessage( responseObject, false );
      this.chat.scrollToBottom();
    });
    this.subscriptions.push( this.onMessagesSubscription );

    this.onDirectMessagesSubscription = this._directMessagesService.onMessage().subscribe( responseObject => {
      this.processSingleMessage( responseObject, true );
      this.chat.scrollToBottom();

    });
    this.subscriptions.push( this.onDirectMessagesSubscription );


    this.onMessagesJoinSubscription = this._messagesService.onJoin().subscribe( responseObject => {
      this.processMessagesOnJoin( responseObject, false );
      this.chat.scrollToBottom();

    });
    this.subscriptions.push(this.onMessagesJoinSubscription);

    this.onDirectMessagesJoinSubscription = this._directMessagesService.onJoin().subscribe( responseObject => {
      this._loadingService.isLoading = false;
      this.processMessagesOnJoin( responseObject, true);
      this.chat.scrollToBottom();
    });
    this.subscriptions.push(this.onDirectMessagesJoinSubscription);

    this.notificationSubscription = this._notificationsService.onMessage().subscribe( res => {
      if  ( res.threadNotifications ) {
        this.notifications = this.processNotifications( res.threadNotifications );
      }
      if ( res.directThreadNotifications ) {
        this.directNotifications = this.processNotifications( res.directThreadNotifications);
      }
    });
    this.subscriptions.push(this.notificationSubscription);

    this._notificationsService.joinRoom( GroupService.id, UsernameService.id );
  }

  processSingleMessage( responseObject: any, isDirect: boolean ) {
    this.users = responseObject.users;
    if (this.messages.length > 0 || this.directMessages.length > 0) {
      if ( isDirect ) {
        const lastMsg = this.directMessages[this.directMessages.length - 1];
        const newMsg = this.processMessages([lastMsg, responseObject.message]); // Process new message with last message
        this.directMessages = this.directMessages.concat( newMsg.slice(2) ); // Remove last Message
      } else {
        const lastMsg = this.messages[this.messages.length - 1]; // Get Last Message so can see if time divider is needed
        const newMsg = this.processMessages([lastMsg, responseObject.message]); // Process new message with last message
        this.messages = this.messages.concat( newMsg.slice(2) ); // Remove last Message
      }

    } else {
      const newMsg = this.processMessages([responseObject.message]);
      if ( isDirect ) {
        this.directMessages = newMsg;
      } else {
        this.messages = newMsg;
      }
    }

    if ( isDirect ) {
      this._notificationsService.readDirect( GroupService.id, this._directThreadService.threadId, UsernameService.id );
    } else {
      this._notificationsService.read( GroupService.id, this._threadService.threadId, UsernameService.id );
    }
  }

  processMessagesOnJoin( responseObject: any, isDirect: boolean ) {
    this.users = responseObject.users;
    this._loadingService.isLoading = false;

    if ( isDirect ) {
      this.directMessages = this.processMessages( responseObject.messages );
      this._notificationsService.readDirect( GroupService.id, this._directThreadService.threadId, UsernameService.id );
    } else {
      this.messages = this.processMessages( responseObject.messages );
      this._notificationsService.read( GroupService.id, this._threadService.threadId, UsernameService.id );
    }
  }

  noGroupSelected(): boolean {
    return GroupService.group === '';
  }

  ngOnDestroy() {
    this.leaveAllRooms();
    this.initializeThreads();
    this.subscriptions.forEach( sub => sub.unsubscribe());
    // this._messagesService.disconnect();
    this._messagesService.loadInitialData();
  }

  leaveAllRooms() {
    if ( this._threadService.threadId ) {
      this._messagesService.leaveRoom(this._threadService.threadId, GroupService.id, UsernameService.id);
    } else if ( this._directThreadService.threadId ) {
      this._directMessagesService.leaveRoom( this._directThreadService.threadId, GroupService.id, UsernameService.id );
    }
    this._notificationsService.leaveRoom( GroupService.id );
  }

  refresh() {
    this._loadingService.isLoading = true;
    this.leaveAllRooms();
    this.subscriptions.forEach( sub => sub.unsubscribe());
    this.initializeSubscriptions();
    this._loadingService.isLoading = false;
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
      if ( message === undefined ) {
        continue; // skip one iteration
      }
      message.createdAt = new Date(message.createdAt);
      const user: User = this.matchMessageUserIdWithUser( message );
      if ( previousTime === undefined || this.isPastNextDay( previousTime, ( message.createdAt.getTime() / 1000 ) ) ) {
        processedMessages.push( this.createTimeDivider( message ) );
      }
      const processedMessage = new ProcessedMessage(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
      processedMessage.setValues( message, user );
      processedMessages.push( processedMessage );
      previousTime = message.createdAt.getTime() / 1000;
    }

    return processedMessages;
  }

  private createTimeDivider( message ) {
    const date: Date = new Date(message.createdAt);
    date.setHours( 0, 0, 0, 0);
    return new ProcessedMessage(undefined, undefined, undefined, undefined, undefined, undefined, date, true );

  }

  private matchMessageUserIdWithUser( message: Message ): User {
    for ( const user of this.users ) {
      if ( user.id === message.userId ) {
        return user;
      }
    }
  }

  private isPastNextDay( previousTime: number, newTime: number ): boolean {
    // const roundedPreviousTime: number = previousTime + ( 3600 * 24 - (previousTime % (3600 * 24)) );
    const roundedPreviousTime: number = previousTime + ( (3600 * 24) - (previousTime % (3600 * 24) ) );

    return newTime > roundedPreviousTime;

  }

  private roundDown( newTime: number ): number {

    return newTime - ( newTime % (3600 * 24) );
  }

  private processNotifications( rawNotificationDto: any ): ProcessedNotification[] {
    const processedNotifications = [];
    for ( const threadNotification of rawNotificationDto ) {
      const notificationCount: number = this.findNotificationCount( threadNotification );
      const threadId: number = threadNotification.threadId;
      const processed: ProcessedNotification = new ProcessedNotification( threadId, notificationCount );
      processedNotifications.push( processed );
    }

    return processedNotifications.sort( ( a: ProcessedNotification, b: ProcessedNotification ) => {
        if ( a.threadId > b.threadId ) {
          return 1;
        } else if ( a.threadId < b.threadId ) {
          return -1;
        } else {
          return 0;
        }
      });
  }

  private findNotificationCount( threadNotification: ThreadNotification ) {
    let notificationCount = 0;
    for ( const message of threadNotification.strippedDownMessages ) {
      if ( this.userInIds(message) ) {
        notificationCount += 1;
      }
    }

    return notificationCount;
  }

  private userInIds( message: any ) {
    const index = message.userIds.indexOf( Number(UsernameService.id) );

    return index === -1;
  }

}
