import { ThreadService } from './../../../common/services/thread-service.service';
import { UsernameService } from './../../../common/services/username.service';
import { MessageDto } from './dto/message.dto';
import { Component, OnInit } from '@angular/core';
import { DataRequestorService } from 'src/app/common/services/data-requestor.service';

@Component({
  selector: 'app-message-writer',
  templateUrl: './message-writer.component.html',
  styleUrls: ['./message-writer.component.css']
})
export class MessageWriterComponent implements OnInit {

  constructor( private _dataRequestor: DataRequestorService ) { }
  text = '';

  ngOnInit() {
  }

  sendMessage(): void {
    const msg: MessageDto = new MessageDto(UsernameService.username, 'g', ThreadService.thread, this.text);
    this._dataRequestor.postRequest('message', msg).subscribe( result => {
      this.text = '';
    });
  }

}
