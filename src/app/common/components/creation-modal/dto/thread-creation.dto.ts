export class ThreadCreationDto {
    name: string;
    groupName: string;
    username: string;
    constructor( name: string, groupName: string, username: string ) {
        this.name = name;
        this.groupName = groupName;
        this.username = username;
    }
}
