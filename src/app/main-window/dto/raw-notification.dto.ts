import { Message } from '../models/message';
import { DirectMessage } from '../models/direct-message';

export class RawNotification {
    threadNotifications: ThreadNotification[];
    directThreadNotifications: DirectThreadNotification[];

    constructor( threadNotifications: ThreadNotification[] ) {
        this.threadNotifications = threadNotifications;
    }
}

export class ThreadNotification {
    threadId: number;
    strippedDownMessages: StrippedDownMessage[];
    isDirectThreadNotification: boolean;

    constructor( threadId: number, strippedDownMessages: StrippedDownMessage[], isDirectThreadNotification: boolean ) {
        this.threadId = threadId;
        this.strippedDownMessages = strippedDownMessages;
        this.isDirectThreadNotification = isDirectThreadNotification;
     }
}


export class DirectThreadNotification {
    threadId: number;
    strippedDownMessages: StrippedDownDirectMessage[];
    isDirectThreadNotification: boolean;

    constructor( threadId: number, strippedDownMessages: StrippedDownDirectMessage[], isDirectThreadNotification: boolean ){
        this.threadId = threadId;
        this.strippedDownMessages = strippedDownMessages;
        this.isDirectThreadNotification = isDirectThreadNotification;
     }
}

export class StrippedDownDirectMessage{
    id: number;
    userIds: number[];

    constructor( message: DirectMessage ) {
        this.id = message.id;
        this.userIds = message.userIds;
    }
}

export class StrippedDownMessage {
    id: number;
    userIds: number[];

    constructor( message: Message ) {
        this.id = message.id;
        this.userIds = message.userIds;
    }
}
