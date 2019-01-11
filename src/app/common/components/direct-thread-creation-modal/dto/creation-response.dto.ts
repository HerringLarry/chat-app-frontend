import { DirectMessageThread } from './../model/direct-message-thread.interface';
export class CreationResponseDto {
    threadId: number;
    alreadyCreated: boolean;

    constructor( dMThread: DirectMessageThread, alreadyCreated: boolean ) {
        this.threadId = dMThread.id;
        this.alreadyCreated = alreadyCreated;
    }
}