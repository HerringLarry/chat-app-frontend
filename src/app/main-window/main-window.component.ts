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
import { MessageProcessingService } from '../common/services/message-processing.service';
import { NotificationProcessingService } from '../common/services/notification-processing.service';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css'],
})

export class MainWindowComponent implements OnInit, OnDestroy {

  @ViewChild('container') container: ElementRef;
  @ViewChild(ChatComponent) chat: ChatComponent; // child component so I can trigger scroll to bottom on new message

  selectedThread: string;
  messages: ProcessedMessage[] = [];
  directMessages: ProcessedMessage[] = [];
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
  isDirectMessage = true;

  constructor( private _dataRequestor: DataRequestorService,
    private _messagesService: MessagesService,
    private _threadService: ThreadService,
    private router: Router,
    private _directMessagesService: DirectMessagesService,
    private _directThreadService: DirectThreadService,
    private _notificationsService: NotificationsService,
    private snackbar: MatSnackBar,
    private _loadingService: LoadingService,
    private _notificationProcessingService: NotificationProcessingService,
    private _messageProcessingService: MessageProcessingService,
    ) { }

  ngOnInit() {
    console.log('init');
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

  ngOnDestroy() {
    this.leaveAllRooms();
    this.initializeThreads();
    this.subscriptions.forEach( sub => sub.unsubscribe());
    // this._messagesService.disconnect();
    this._messagesService.loadInitialData();
  }

  initializeThreads() {
    this._threadService.threadId = null;
    this._threadService.selected = false;
    this._directThreadService.threadId = null;
    this._directThreadService.selected = false;
  }

  initializeSubscriptions() {
    this.onMessagesSubscription = this._messagesService.onMessage().subscribe( responseObject => {
      this.processSingleMessage( responseObject, !this.isDirectMessage );
      this.chat.scrollToBottom();
    });
    this.subscriptions.push( this.onMessagesSubscription );

    this.onDirectMessagesSubscription = this._directMessagesService.onMessage().subscribe( responseObject => {
      this.processSingleMessage( responseObject, this.isDirectMessage );
      this.chat.scrollToBottom();

    });
    this.subscriptions.push( this.onDirectMessagesSubscription );

    this.onMessagesJoinSubscription = this._messagesService.onJoin().subscribe( responseObject => {
      this.resetMessagesAndDirectMessages();
      this._messagesService.resetSkipValue();
      this.processForPagination( responseObject );
      this.processMessagesOnJoin( responseObject, !this.isDirectMessage );
      this._loadingService.isLoading = false;
      this.chat.scrollToBottom();

    });
    this.subscriptions.push(this.onMessagesJoinSubscription);

    this.onDirectMessagesJoinSubscription = this._directMessagesService.onJoin().subscribe( responseObject => {
      this.resetMessagesAndDirectMessages();
      this._directMessagesService.resetSkipValue();
      this.processForPagination( responseObject );
      this.processMessagesOnJoin( responseObject, this.isDirectMessage);
      this._loadingService.isLoading = false;
      this.chat.scrollToBottom();
    });
    this.subscriptions.push(this.onDirectMessagesJoinSubscription);

    this.notificationSubscription = this._notificationsService.onMessage().subscribe( res => {
      if  ( res.threadNotifications ) {
        this.notifications = this._notificationProcessingService.processNotifications( res.threadNotifications );
      }
      if ( res.directThreadNotifications ) {
        this.directNotifications = this._notificationProcessingService.processNotifications( res.directThreadNotifications);
      }
    });
    this.subscriptions.push(this.notificationSubscription);

    this._notificationsService.joinRoom( GroupService.id, UsernameService.id );
  }

  resetMessagesAndDirectMessages() {
    this.messages = [];
    this.directMessages = [];
  }

  processForPagination( responseObject: any ) {
    if ( !responseObject.isDirect ) {
      this._messagesService.count = responseObject.count;
      this._messagesService.addToSkipValue(30);
    } else {
      this._directMessagesService.count = responseObject.count;
      this._directMessagesService.addToSkipValue(30);
    }
  }

  processSingleMessage( responseObject: any, isDirect: boolean ) {
    this.users = responseObject.users;
    if ( this.messages.length > 0 || this.directMessages.length > 0 ) {
      if ( isDirect && this.directMessages.length > 0 ) {
        const lastMsg = this.directMessages[this.directMessages.length - 1];
        const newMessagesWithLast =  [lastMsg, responseObject.message];
        const newMsg = this._messageProcessingService.processMessages(newMessagesWithLast, this.users);
        this.directMessages = this.directMessages.concat( newMsg.slice(2) ); // Remove last Message
      } else if ( !isDirect && this.messages.length > 0 ) {
        const lastMsg = this.messages[this.messages.length - 1]; // Get Last Message so can see if time divider is needed
        const newMessagesWithLast =  [lastMsg, responseObject.message];
        const newMsg = this._messageProcessingService.processMessages( newMessagesWithLast, this.users );
        this.messages = this.messages.concat( newMsg.slice(2) ); // Remove last Message
      }
    } else {
      const newMsg = this._messageProcessingService.processMessages([responseObject.message], this.users);
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
      this.directMessages = this._messageProcessingService.processMessages( responseObject.messages, this.users );
      this._notificationsService.readDirect( GroupService.id, this._directThreadService.threadId, UsernameService.id );
    } else {
      this.messages = this._messageProcessingService.processMessages( responseObject.messages, this.users );
      this._notificationsService.read( GroupService.id, this._threadService.threadId, UsernameService.id );
    }
  }

  noGroupSelected(): boolean {

    return GroupService.group === '';
  }

  getNextMessages() {
    let request: string;
    if ( this._threadService.selected ) {
        // tslint:disable-next-line:max-line-length
      request =  'message/getMessages/' + GroupService.group + '/' + this._threadService.threadId + '/' + this._messagesService.getSkipValue();
    } else {
      // tslint:disable-next-line:max-line-length
      request =  'directmessage/getMessages/' + GroupService.group + '/' + this._directThreadService.threadId + '/' + this._directMessagesService.getSkipValue();
    }
    this._dataRequestor.getRequest(request).subscribe( res => {
      this.processLoadedMessages( res );
    });
  }

  processLoadedMessages( responseObject: any ) {
    this.users = responseObject.users;
    const firstMessage = this._messageProcessingService.getRelevantFirstMessage(responseObject, this.messages, this.directMessages);
    const prevMsgs = this._messageProcessingService.processLoadedMessages(responseObject.messages, firstMessage, this.users);
    if ( !responseObject.isDirect ) {
      this._messagesService.addToSkipValue(30);
      this.messages = this._messageProcessingService.pushLoadedMessagesToTheFront( prevMsgs, this.messages);
    } else {
      this._directMessagesService.addToSkipValue(30);
      this.directMessages = this._messageProcessingService.pushLoadedMessagesToTheFront( prevMsgs, this.directMessages );
    }
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
    this._messagesService.joinRoom( this._threadService.threadId, GroupService.id, UsernameService.id);
    this._loadingService.isLoading = false;
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
}
