export class GroupCreationDto {
    name: string;
    username: string;

    constructor( name: string, username: string) {
        this.name = name;
        this.username = username;
    }
}
