import { UsernameService } from './username.service';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { APP_CONFIG } from 'src/config';


@Injectable()
export class WebsocketService {
  // Our socket connection
  socket;
  constructor() {
  }

  /**
   * Connects to the WS server
   */
  connect() {
    this.socket = io(APP_CONFIG.ws);
  }

  /**
   * Listens to the WS server according to the event name
   * param eventName The name of the WS event to connect
   * returns An observable with the right data
   */
  on(eventName: string): Observable<any> {
    return new Observable(obs => {
      this.socket.on(eventName, data => {
        console.log('Received message from Websocket Server');
        obs.next(data);
      });
      // return () => {
      //   this.socket.disconnect();
      // };
    });
  }

  /**
   * Sends data to WS server
   * param eventName The name of the WS event to send
   * param data The data to send to the WS server
   */
  emit(eventName: string, data: any, callback?) {
    this.socket.emit(eventName, data, callback);
  }

  /**
   * Disconnects from the WS server
   */
  disconnect() {
    this.socket.disconnect();
  }
}
