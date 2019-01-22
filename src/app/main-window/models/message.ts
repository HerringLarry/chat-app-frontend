export interface Message {
    id: number;
    groupId: number;
    threadId: number;
    username: string;
    userId: number;
    text: string;
    createdAt: Date;
    userIds: number[]; // Message has been read by these userss
}
