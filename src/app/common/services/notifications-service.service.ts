import { MessageDto } from '../../main-window/chat/message-writer/dto/message.dto';
import { GroupService } from './group-service.service';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataRequestorService } from './data-requestor.service';
import { asObservable } from '../as-observable';
import { NotificationsSocketService } from './web-socket-notifications.service';

@Injectable()
export class NotificationsService implements OnDestroy {

    private _notifications: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor(private _dataRequestor: DataRequestorService,
                private _socketService: NotificationsSocketService,
                ) {
        this.loadInitialData();
    }

    ngOnDestroy(): void {
        this.leaveRoom(GroupService.id);
    }

    get messages() {
        return asObservable(this._notifications);
    }

    public joinRoom(groupId: number, userId: number): void {
        this._socketService.emit('join', String(userId) + '/' + String(groupId) );
    }

    public leaveRoom(groupId: number): void {
        this._socketService.emit('leave', String(groupId));

    }


    loadInitialData() {
        this._socketService.initSocket();
    }

    send( msg: any ) {
        this._socketService.send(msg);
    }

    sendDirect(msg: any ) {
        this._socketService.sendDirect( msg );
    }

    read( groupId: number, threadId: number, userId: number ) {
        this._socketService.read(groupId, threadId, userId);
    }

    readDirect(groupId: number, threadId: number, userId: number ) {
        this._socketService.readDirect(groupId, threadId, userId);
    }

    onMessage(): Observable<any> {
        return this._socketService.on('message');
    }

    onRead(): Observable<any> {
        return this._socketService.on('markAsRead');
    }

}
