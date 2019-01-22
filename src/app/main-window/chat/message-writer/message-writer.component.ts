import { ThreadService } from './../../../common/services/thread-service.service';
import { UsernameService } from './../../../common/services/username.service';
import { MessageDto } from './dto/message.dto';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataRequestorService } from 'src/app/common/services/data-requestor.service';
import { GroupService } from 'src/app/common/services/group-service.service';
import { MessagesService } from 'src/app/common/services/messages-service.service';
import { DirectMessagesService } from 'src/app/common/services/direct-messages-service.service';
import { DirectThreadService } from 'src/app/common/services/direct-thread-service.service';
import { NotificationsService } from 'src/app/common/services/notifications-service.service';
import { NotificationInfoDto } from './dto/notification-info.dto';

@Component({
  selector: 'app-message-writer',
  templateUrl: './message-writer.component.html',
  styleUrls: ['./message-writer.component.css']
})
export class MessageWriterComponent implements OnInit {

  @Output() messageSubmitted: EventEmitter<void> = new EventEmitter();
  text = '';

  constructor( private _dataRequestor: DataRequestorService, private _threadService: ThreadService,
    private _messagesService: MessagesService,
    private _directMessageService: DirectMessagesService,
    private _directThreadService: DirectThreadService,
    private _notificationsService: NotificationsService,
    ) { }

  ngOnInit() {
  }

  sendMessage(): void {
    if ( this.text === '' ) {
      return;
    } else if ( this._threadService.threadId ) {
        this.sendNormalMessage();
        // tslint:disable-next-line:max-line-length
        const notificationInfoDto: NotificationInfoDto = new NotificationInfoDto( UsernameService.id, GroupService.id, this._threadService.threadId );
        setTimeout( () => {
        this._notificationsService.send(notificationInfoDto);
      }, 300);
    } else if ( this._directThreadService.threadId ) {
        this.sendDirectMessage();
        // tslint:disable-next-line:max-line-length
        const notificationInfoDto: NotificationInfoDto = new NotificationInfoDto( UsernameService.id, GroupService.id, this._threadService.threadId );
        setTimeout( () => {
          this._notificationsService.sendDirect(notificationInfoDto);
        }, 300);    } else {
        alert('no thread selected');
    }
    this.text = '';
  }

  sendNormalMessage(): void {
    // tslint:disable-next-line:max-line-length
    const msg: MessageDto = new MessageDto(UsernameService.username, GroupService.group, GroupService.id, this._threadService.threadId, this.text);
    this._messagesService.send(msg);
  }

  sendDirectMessage(): void {
    // tslint:disable-next-line:max-line-length
    const msg: MessageDto = new MessageDto(UsernameService.username, GroupService.group, GroupService.id, this._directThreadService.threadId, this.text);
    this._directMessageService.send(msg);
  }

}
