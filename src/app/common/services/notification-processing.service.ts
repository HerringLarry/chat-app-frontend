import { Injectable } from '@angular/core';
import { ProcessedNotification } from 'src/app/main-window/models/processed-notification';
import { ThreadNotification } from 'src/app/main-window/dto/raw-notification.dto';
import { UsernameService } from './username.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationProcessingService {

  constructor() { }

  public processNotifications( rawNotificationDto: any ): ProcessedNotification[] {
    const processedNotifications = [];
    for ( const threadNotification of rawNotificationDto ) {
      const notificationCount: number = this.findNotificationCount( threadNotification );
      const threadId: number = threadNotification.threadId;
      const processed: ProcessedNotification = new ProcessedNotification( threadId, notificationCount );
      processedNotifications.push( processed );
    }

    return processedNotifications.sort( ( a: ProcessedNotification, b: ProcessedNotification ) => {
        if ( a.threadId > b.threadId ) {
          return 1;
        } else if ( a.threadId < b.threadId ) {
          return -1;
        } else {
          return 0;
        }
      });
  }

  private findNotificationCount( threadNotification: ThreadNotification ) {
    let notificationCount = 0;
    for ( const message of threadNotification.strippedDownMessages ) {
      if ( this.userInIds(message) ) {
        notificationCount += 1;
      }
    }

    return notificationCount;
  }

  private userInIds( message: any ) {
    const index = message.userIds.indexOf( Number(UsernameService.id) );

    return index === -1;
  }
}
