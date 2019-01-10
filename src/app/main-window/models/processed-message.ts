import { Message } from "./message";

export class ProcessedMessage {
    id: number;
    groupId: number;
    threadId: number;
    username: string;
    userId: number;
    text: string;
    createdAt: Date;
    isTimeDivider: boolean;

    // tslint:disable-next-line:max-line-length
    constructor( id: number, groupId: number, threadId: number, username: string, userId: number, text: string, createdAt: Date, isTimeDivider: boolean ) {
        this.id = id;
        this.groupId = groupId;
        this.threadId = threadId;
        this.username = username;
        this.userId = userId;
        this.text = text;
        this.createdAt = createdAt;
        this.isTimeDivider = isTimeDivider;
    }

    setValues( m: Message, username: string ) {
        this.id = m.id;
        this.groupId = m.groupId;
        this.threadId = m.threadId;
        this.username = username;
        this.userId = m.userId;
        this.text = m.text;
        this.createdAt = m.createdAt;
        this.isTimeDivider = false;
    }
}
