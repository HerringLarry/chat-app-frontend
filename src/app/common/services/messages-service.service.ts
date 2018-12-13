import { MessageDto } from './../../main-window/chat/message-writer/dto/message.dto';
import { GroupService } from './group-service.service';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataRequestorService } from './data-requestor.service';
import { asObservable } from '../as-observable';
import { ThreadService } from './thread-service.service';
import { SocketService } from './web-socket.service';
import { Message } from '../model/message.dto';

@Injectable()
export class MessagesService implements OnDestroy {

    private _messages: BehaviorSubject<any[]> = new BehaviorSubject([]);
    private roomId: string;

    constructor(private _dataRequestor: DataRequestorService,
                private _threadService: ThreadService,
                private _socketService: SocketService
                ) {
        this.loadInitialData();
    }

    ngOnDestroy(): void {
        this.leaveRoom(this._threadService.thread, GroupService.group);
    }

    get messages() {
        return asObservable(this._messages);
    }

    public joinRoom(threadName: string, groupName: string): void {
        this.roomId = threadName + '/' + groupName;
        this._socketService.emit('message', this.roomId);
    }

    public leaveRoom(threadName: string, groupName: string): void {
        this.roomId = threadName + '/' + groupName;
        this._socketService.emit('leave', this.roomId);

    }


    loadInitialData() {
        this._socketService.initSocket();
        this._socketService.send(new Message('1', '2', '3', '4'));

    }

    send( msg: MessageDto ) {
        this._socketService.send(msg);
    }

    onMessage(): Observable<any> {
        return this._socketService.on('message');
      }

}
