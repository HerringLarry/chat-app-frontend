import { FormGroup } from '@angular/forms';
export class UserInfoDto {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    courses: any[];

    constructor( formGroup: FormGroup) {
        this.username = formGroup.value.username;
        this.password = formGroup.value.password;
        this.firstName = formGroup.value.firstName;
        this.lastName = formGroup.value.lastName;
        this.mobile = formGroup.value.mobile;
        this.email = formGroup.value.email;
        this.courses = [];
    }
}
