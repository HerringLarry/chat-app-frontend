import { ProcessedMessage } from "./processed-message";

export class Message {
    id: number;
    groupId: number;
    threadId: number;
    username: string;
    userId: number;
    text: string;
    createdAt: Date;
    userIds: number[]; // Message has been read by these userss

    constructor( processedMessage: ProcessedMessage ) {
        this.id = processedMessage.id;
        this.groupId = processedMessage.groupId;
        this.threadId = processedMessage.threadId;
        this.username = processedMessage.username;
        this.userId = processedMessage.userId;
        this.text = processedMessage.text;
        this.createdAt = processedMessage.createdAt;
        this.userIds = undefined;
    }
}
