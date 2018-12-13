export class Message{
    username: string;
    groupName: string;
    threadName: string;
    text: string;

    constructor( username: string, groupName: string, threadName: string, text: string) {
        this.username = username;
        this.groupName = groupName;
        this.threadName = threadName;
        this.text = text;
    }
}
