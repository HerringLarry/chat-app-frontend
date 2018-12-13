export class ThreadCreationDto {
    name: string;
    groupName: string;
    constructor( name: string, groupName: string ) {
        this.name = name;
        this.groupName = groupName;
    }
}
