export class InviteDto {
    fromUser: string;
    toUser: string;
    groupName: string;
    constructor( fromUser: string, toUser: string, groupName: string ) {
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.groupName = groupName;
    }
}
