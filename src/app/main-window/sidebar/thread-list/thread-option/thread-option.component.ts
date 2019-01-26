import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThreadService } from 'src/app/common/services/thread-service.service';
import { MessagesService } from 'src/app/common/services/messages-service.service';
import { GroupService } from 'src/app/common/services/group-service.service';
import { DirectThreadService } from 'src/app/common/services/direct-thread-service.service';
import { DirectMessagesService } from 'src/app/common/services/direct-messages-service.service';
import { NotificationsService } from 'src/app/common/services/notifications-service.service';
import { UsernameService } from 'src/app/common/services/username.service';
import { ProcessedNotification } from 'src/app/main-window/models/processed-notification';
import { SettingsService } from 'src/app/common/services/settings.service';
import { LoadingService } from 'src/app/common/services/loading.service';

@Component({
  selector: 'app-thread-option',
  templateUrl: './thread-option.component.html',
  styleUrls: ['./thread-option.component.css']
})
export class ThreadOptionComponent implements OnInit {

  @Input() thread: any;
  @Input() notifications: ProcessedNotification[];

  constructor(private _threadService: ThreadService,
              private _directThreadService: DirectThreadService,
              private _messageService: MessagesService,
              private _directMesssageService: DirectMessagesService,
              private _notificationsService: NotificationsService,
              private _loadingService: LoadingService) { }

  ngOnInit() {
  }

  selectThread(): void {
    this.leaveAllCurrentRooms();
    this._loadingService.isLoading = true;
    console.log(this._loadingService.isLoading);
      this.setNotificationCountToZero();
      this._threadService.threadId = this.thread.id;
      this._threadService.selected = true;
      this._messageService.joinRoom( this.thread.id, GroupService.id);
      this._notificationsService.read( GroupService.id, this._threadService.threadId );
  }

  isCurrentThread(): boolean {
    return this._threadService.threadId === this.thread.id && this._threadService.selected;
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

  showNotifications(): boolean {
    return SettingsService.showNotifications;
  }

  get notificationCount(): number | undefined {
    const notification: ProcessedNotification = this.getNotification();
    if ( notification ) {
      if ( notification.notificationCount === 0 ) {
        return undefined;
      } else {
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
