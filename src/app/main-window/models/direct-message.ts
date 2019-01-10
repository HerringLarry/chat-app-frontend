export interface DirectMessage {
    id: number;
    groupId: number;
    dmThreadId: number;
    username: string;
    userId: number;
    text: string;
    createdAt: Date;
}
