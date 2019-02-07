import { User } from './../../main-window/models/user';
import { Injectable } from '@angular/core';
import { ProcessedMessage } from 'src/app/main-window/models/processed-message';
import { Message } from 'src/app/main-window/models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageProcessingService {

  constructor() { }

  processLoadedMessages( loadedMessages: Message[], firstMessage: ProcessedMessage, users: User[] ) {
    const revertFirstMessage = new Message( firstMessage );
    loadedMessages.push(revertFirstMessage);

    return this.processMessages(loadedMessages, users);
  }

  pushLoadedMessagesToTheFront( loadedAndProcessedMessages: ProcessedMessage[], currentMessages: ProcessedMessage[] ) {
    const finalMessages = loadedAndProcessedMessages.concat(currentMessages.slice(2));

    return finalMessages;
  }

  processMessages( messages: Message[], users: User[]): ProcessedMessage[] {
    const processedMessages: ProcessedMessage[] = [];
    let previousTime: number;
    for ( const message of messages ) {
      if ( message === undefined ) {
        continue; // skip one iteration
      }
      message.createdAt = new Date(message.createdAt);
      const user: User = this.matchMessageUserIdWithUser( message, users);
      if ( previousTime === undefined || this.isPastNextDay( previousTime, message.createdAt.getTime()  ) ) {
        processedMessages.push( this.createTimeDivider( message ) );
      }
      // tslint:disable-next-line:max-line-length
      const processedMessage = new ProcessedMessage(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
      processedMessage.setValues( message, user );
      processedMessages.push( processedMessage );
      previousTime = message.createdAt.getTime();
    }

    return processedMessages;
  }

  private createTimeDivider( message ) {
    const date: Date = new Date(message.createdAt);
    date.setHours( 0, 0, 0, 0);
    return new ProcessedMessage(undefined, undefined, undefined, undefined, undefined, undefined, date, true, undefined );

  }

  private matchMessageUserIdWithUser( message: Message, users: User[] ): User {
    for ( const user of users ) {
      if ( user.id === message.userId ) {
        return user;
      }
    }
  }

  private isPastNextDay( previousTime: number, newTime: number ): boolean {
    const previousDate = new Date(previousTime);
    const newDate = new Date(newTime);
    previousDate.setHours(0, 0, 0, 0); // Set to 12 am
    newDate.setHours(0, 0, 0, 0);

    return previousDate.getTime() !== newDate.getTime(); // Now if same date then milliseconds should be equal

  }

  getRelevantFirstMessage( responseObject: any, messages: ProcessedMessage[], directMessages: ProcessedMessage[] ) {
    if ( !responseObject.isDirect ) {
      return messages[1];
    } else {
      return directMessages[1];
    }
  }
}
