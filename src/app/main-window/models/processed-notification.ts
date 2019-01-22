import { RawNotification, ThreadNotification } from '../dto/raw-notification.dto';

export class ProcessedNotification {
    threadId: number;
    notificationCount: number;

    constructor( threadId: number, notificationCount: number ) {
        this.threadId = threadId;
        this.notificationCount = notificationCount;
    }
}
