import { MessageDto } from '../../main-window/chat/message-writer/dto/message.dto';
import { GroupService } from './group-service.service';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataRequestorService } from './data-requestor.service';
import { asObservable } from '../as-observable';
import { ThreadService } from './thread-service.service';
import { SocketService } from './web-socket.service';
import { Message } from '../model/message.dto';
import { DirectSocketService } from './web-socket-direct.service';
import { UsernameService } from './username.service';

@Injectable()
export class DirectMessagesService implements OnDestroy {

    private _messages: BehaviorSubject<any[]> = new BehaviorSubject([]);
    private roomId: string;

    constructor(private _dataRequestor: DataRequestorService,
                private _threadService: ThreadService,
                private _socketService: DirectSocketService
                ) {
        this.loadInitialData();
    }

    ngOnDestroy(): void {
        this.leaveRoom(this._threadService.threadId, GroupService.id, UsernameService.id);
    }

    get messages() {
        return asObservable(this._messages);
    }

    public joinRoom(threadId: number, groupId: number, userId: number): void {
        this.roomId = threadId + '/' + groupId;
        this._socketService.emit('message', this.roomId + '/' + userId);
    }

    public leaveRoom(threadId: number, groupId: number, userId: number): void {
        this.roomId = threadId + '/' + groupId + '/' + userId;
        this._socketService.emit('leave', this.roomId);

    }


    loadInitialData() {
        this._socketService.initSocket();
    }

    send( msg: MessageDto ) {
        this._socketService.send(msg);
    }

    onMessage(): Observable<any> {
        return this._socketService.on('message');
    }

    onJoin(): Observable<any> {
        return this._socketService.on('join');
    }

}
