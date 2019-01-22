export class NotificationInfoDto {
    userId: number;
    groupId: number;
    threadId: number;

    constructor ( userId: number, groupId: number, threadId: number ) {
        this.userId = userId;
        this.groupId = groupId;
        this.threadId = threadId;
    }
}
