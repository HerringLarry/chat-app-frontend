import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThreadService } from 'src/app/common/services/thread-service.service';
import { MessagesService } from 'src/app/common/services/messages-service.service';
import { GroupService } from 'src/app/common/services/group-service.service';
import { DirectThreadService } from 'src/app/common/services/direct-thread-service.service';
import { DirectMessagesService } from 'src/app/common/services/direct-messages-service.service';
import { SettingsService } from 'src/app/common/services/settings.service';
import { NotificationsService } from 'src/app/common/services/notifications-service.service';
import { UsernameService } from 'src/app/common/services/username.service';
import { ProcessedNotification } from 'src/app/main-window/models/processed-notification';

@Component({
  selector: 'app-direct-thread-option',
  templateUrl: './direct-thread-option.component.html',
  styleUrls: ['./direct-thread-option.component.css']
})
export class DirectThreadOptionComponent implements OnInit {

  @Input() thread: any;
  @Input() notifications: any[];

  splitThreadName: string;

  constructor(private _threadService: ThreadService,
    private _directThreadService: DirectThreadService,
    private _messageService: MessagesService,
    private _directMesssageService: DirectMessagesService,
    private _notificationsService: NotificationsService,
    ) { }

  ngOnInit() {
    // this.splitThreadName = this.parseThreadName();
    this.splitThreadName = this.parseThreadName();
  }

  parseThreadName(): string {
    let split = '';
    if ( SettingsService.showUsername ) {
      split = this.createNameFromUsernames();
    } else {
      split = this.createNameFromFullNames();
    }

    return split;
  }

  createNameFromFullNames(): string {
    let split = '';
    for ( const user of this.thread.users) {
      if ( split !== '' ) {
        split = split + ', ' + user.firstName + ' ' + user.lastName;
      } else {
        split = user.firstName + ' '  + user.lastName;
      }
    }

    return split;
  }

  createNameFromUsernames(): string {
    let split = '';
    for ( const user of this.thread.users) {
      if ( split !== '' ) {
        split = split + ', ' + user.username;
      } else {
        split = user.username;
      }
    }

    return split;
  }


  selectThread(): void {
    this.leaveAllCurrentRooms();
   //  this.setNotificationCountToZero();
    this._directThreadService.threadId = this.thread.id;
    this._directThreadService.selected = true;
    this._directMesssageService.joinRoom( this._directThreadService.threadId, GroupService.group);
    this._notificationsService.readDirect( GroupService.id, this._directThreadService.threadId );
  }

  isCurrentThread(): boolean {
    return this._directThreadService.threadId === this.thread.id && this._directThreadService.selected;
  }

  leaveAllCurrentRooms(): void {
    if ( this._threadService.threadId ) {
      this._messageService.leaveRoom(this._threadService.threadId, GroupService.id);
    }
    this._threadService.threadId = null;
    this._threadService.selected = false;

    if ( this._directThreadService.threadId ) {
      this._directMesssageService.leaveRoom(this._directThreadService.threadId, GroupService.group);
    }
    this._directThreadService.threadId = null;
    this._directThreadService.selected = false;
  }

  get notificationCount(): number | undefined {
    const notification: ProcessedNotification = this.getNotification();
    if ( notification ) {
      if ( notification.notificationCount === 0 ) {
        return undefined;
      } else {
        console.log('not', notification.notificationCount);
        return notification.notificationCount;
      }
    }
  }

  setNotificationCountToZero(): void {
    const notification: ProcessedNotification = this.getNotification();
    if ( notification ) {
      notification.notificationCount = 0;
    }
  }

  getNotification(): ProcessedNotification {
    if ( this.notifications ) {
      for ( const notification of this.notifications ) {
        if ( notification.threadId === this.thread.id) {
          return notification;
        }
      }
    }
    return undefined;
  }


}
