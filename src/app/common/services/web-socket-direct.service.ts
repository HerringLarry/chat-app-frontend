import { UsernameService } from 'src/app/common/services/username.service';
import { APP_CONFIG_DIRECT } from './config';

import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../model/message.dto';

const SERVER_URL = 'http://localhost:3000';

@Injectable()
export class DirectSocketService {
    private socket;
    private roomId: string;

    public initSocket(): void {
        console.log('trying to cnnect');
        this.socket = socketIo(APP_CONFIG_DIRECT.ws, { query: {
            username: UsernameService.username
        }
    });
        this.socket.on('connect', () => {
          console.log('connect');
          });
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public emit(eventName: string, roomId: string): void {
        this.socket.emit('join', roomId);
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
