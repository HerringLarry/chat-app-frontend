import { Injectable } from '@angular/core';

@Injectable()
export class UsernameService {

    static get username(): string | '' {
        return window.localStorage.getItem('username');
    }

    static set username( username: string ) {
        window.localStorage.setItem( 'username', username );
    }
}
