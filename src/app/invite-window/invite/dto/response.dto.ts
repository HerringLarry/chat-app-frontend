import { Invite } from '../../models/invite';

export class ResponseDto {
    accepted: boolean;
    inviteId: number;

    constructor( accepted: boolean, invite: Invite ) {
        this.accepted = accepted;
        this.inviteId = invite.id;
    }
}
