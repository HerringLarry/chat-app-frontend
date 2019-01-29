import { MessageDto } from '../../main-window/chat/message-writer/dto/message.dto';
import { GroupService } from './group-service.service';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataRequestorService } from './data-requestor.service';
import { asObservable } from '../as-observable';
import { ThreadService } from './thread-service.service';
import { SocketService } from './web-socket.service';
import { Message } from '../model/message.dto';
import { UsernameService } from './username.service';

@Injectable()
export class MessagesService implements OnDestroy {

    private _messages: BehaviorSubject<Message[]> = new BehaviorSubject([]);
    private roomId: string;

    constructor(private _dataRequestor: DataRequestorService,
                private _threadService: ThreadService,
                private _socketService: SocketService
                ) {
    }

    ngOnDestroy(): void {
        this.leaveRoom(this._threadService.threadId, GroupService.id, UsernameService.id);
    }

    get messages() {
        return asObservable(this._messages);
    }

    public joinRoom(threadId: number, groupId: number, userId: number): void {
        this.roomId = threadId + '/' + groupId;
        this._socketService.emit('join', threadId + '/' + groupId + '/' + userId);
    }

    public leaveRoom(threadId: number, groupId: number, userId: number): void {
        this.roomId = threadId + '/' + groupId;
        this._socketService.emit('leave', this.roomId);

    }


    loadInitialData() {
        this._socketService.initSocket();
    }

    send( msg: MessageDto ) {
        this._socketService.send(msg);
    }

    markAsRead( groupId: number, threadId: number, userId: number ) {
        this._socketService.markAsRead(groupId, threadId, userId);
    }

    onMessage(): Observable<any> {
        return this._socketService.on('message');
    }

    disconnect() {
        this._socketService.disconnect();
    }

}
