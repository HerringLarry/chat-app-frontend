import { FormGroup, Validators, FormControl } from '@angular/forms';

export class FormMaker {
    static mobileRegExp: string = '^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$';

    static getRegistrationFormGroup(): FormGroup {
        return new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            mobile: new FormControl('', [Validators.required, Validators.pattern(FormMaker.mobileRegExp)]),
         });
    }

    static getProfileFormGroup(): FormGroup {
        return new FormGroup({
            bio: new FormControl('', Validators.required),
            interests: new FormControl('', Validators.required),
        });
    }

    static getPieceCreatorFormGroup(): FormGroup {
        return new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        });
    }
}
