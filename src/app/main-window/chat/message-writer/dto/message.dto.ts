export class MessageDto {
    username: string;
    groupName: string;
    threadId: number;
    groupId: number;
    text: string;

    constructor( username: string, groupName: string, groupId: number, threadId: number, text: string) {
        this.username = username;
        this.groupName = groupName;
        this.threadId = threadId;
        this.text = text;
        this.groupId = groupId;
    }
}
