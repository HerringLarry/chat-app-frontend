import { FormGroup } from '@angular/forms';

export class RegistrationDto {
    registrationFormDto: RegistrationFormDto;
    profileFormDto: ProfileFormDto;
    constructor( registrationFormGroup: FormGroup, profileFormGroup: FormGroup ) {
        this.registrationFormDto = new RegistrationFormDto( registrationFormGroup );
        this.profileFormDto = new ProfileFormDto( profileFormGroup );
    }
}

export class RegistrationFormDto {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    constructor( registrationFormGroup: FormGroup ) {
        this.username = registrationFormGroup.value.username;
        this.password = registrationFormGroup.value.password;
        this.firstName = registrationFormGroup.value.firstName;
        this.lastName = registrationFormGroup.value.lastName;
        this.email = registrationFormGroup.value.email;
        this.mobile = registrationFormGroup.value.mobile;
    }
}

class ProfileFormDto {
    bio: string;
    interests: string;
    constructor( profileFormGroup: FormGroup ) {
        this.bio = profileFormGroup.value.bio;
        this.interests = profileFormGroup.value.interests;
    }
}
