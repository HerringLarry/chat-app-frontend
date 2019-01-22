import { UsernameService } from 'src/app/common/services/username.service';
import { APP_CONFIG_NOTIFICATIONS } from './config';

import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../model/message.dto';

const SERVER_URL = 'http://localhost:3000';

@Injectable()
export class NotificationsSocketService {
    private socket;
    private roomId: string;

    public initSocket(): void {
        console.log('trying to cnnect');
        this.socket = socketIo(APP_CONFIG_NOTIFICATIONS.ws, { query: {
            userId: UsernameService.id,
        }
    });
        this.socket.on('connect', () => {
          console.log('connect');
          });
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public sendDirect( msg: any ): void {
        this.socket.emit('directMessage', msg);
    }

    public read(groupId: number, threadId: number) {
        this.socket.emit('markAsRead', groupId + '/' + threadId);
    }

    public readDirect( groupId: number, threadId: number ) {
        this.socket.emit('directMarkAsRead', groupId + '/' + threadId);
    }

    public emit(eventName: string, roomId: string): void {
        this.socket.emit(eventName, roomId);
    }

    on(eventName: string): Observable<any> {
        console.log('received');
        return new Observable(obs => {
          this.socket.on(eventName, data => {
            console.log('Received message from Websocket Server');
            obs.next(data);
          });
        });
      }


    public onMessage(): Observable<Message> {
      console.log('received');
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onRead(): Observable<any> {

        return new Observable<any>(observer => {
            this.socket.on('markAsRead', (data: any) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
      console.log('received');
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }


    public disconnect() {
        this.socket.disconnect();
    }
}
