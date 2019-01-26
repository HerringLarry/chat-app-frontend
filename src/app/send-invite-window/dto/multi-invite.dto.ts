import { User } from 'src/app/common/components/direct-thread-creation-modal/model/user.model';

export class MultiInviteDto {
    groupId: number;
    fromUserId: number;
    toUserIds: number[] = [];

    constructor( users: User[], groupId: number, fromUserId: number ) {
        this.groupId = groupId;
        this.fromUserId = fromUserId;
        users.forEach( user => {
            this.toUserIds.push( user.id );
        });
    }
}
