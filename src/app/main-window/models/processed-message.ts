import { Message } from "./message";
import { User } from "./user";

export class ProcessedMessage {
    id: number;
    groupId: number;
    threadId: number;
    username: string;
    firstName: string;
    lastName: string;
    userId: number;
    text: string;
    createdAt: Date;
    isTimeDivider: boolean;
    photoPath: string;

    // tslint:disable-next-line:max-line-length
    constructor( id: number, groupId: number, threadId: number, username: string, userId: number, text: string, createdAt: Date, isTimeDivider: boolean, photoPath: string ) {
        this.id = id;
        this.groupId = groupId;
        this.threadId = threadId;
        this.username = username;
        this.userId = userId;
        this.text = text;
        this.createdAt = createdAt;
        this.isTimeDivider = isTimeDivider;
        this.photoPath = photoPath;
    }

    setValues( m: Message, user: User ) {
        this.id = m.id;
        this.groupId = m.groupId;
        this.threadId = m.threadId;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.userId = m.userId;
        this.text = m.text;
        this.createdAt = m.createdAt;
        this.isTimeDivider = false;
        this.photoPath = user.photoPath;
    }
}
