import { User } from '../model/user.model';

export class DirectMessageThreadDto {
    users: User[];
    currentUserId: number;
    groupName: string;
    constructor( users: User[], originalUserId: number, groupName: string ) {
        this.users = users;
        this.groupName = groupName;
        this.currentUserId = originalUserId;
    }
}
