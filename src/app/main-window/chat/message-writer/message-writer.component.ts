import { ThreadService } from './../../../common/services/thread-service.service';
import { UsernameService } from './../../../common/services/username.service';
import { MessageDto } from './dto/message.dto';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataRequestorService } from 'src/app/common/services/data-requestor.service';
import { GroupService } from 'src/app/common/services/group-service.service';
import { MessagesService } from 'src/app/common/services/messages-service.service';

@Component({
  selector: 'app-message-writer',
  templateUrl: './message-writer.component.html',
  styleUrls: ['./message-writer.component.css']
})
export class MessageWriterComponent implements OnInit {

  @Output() messageSubmitted: EventEmitter<void> = new EventEmitter();
  text = '';

  constructor( private _dataRequestor: DataRequestorService, private _threadService: ThreadService,
    private _messagesService: MessagesService ) { }

  ngOnInit() {
  }

  sendMessage(): void {
    const msg: MessageDto = new MessageDto(UsernameService.username, GroupService.group, this._threadService.thread, this.text);
    console.log(msg);
    this._messagesService.send(msg);
  }

}
