import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

    static get sessionToken(): string | '' {
        return window.localStorage.getItem('token');
    }

    static set sessionToken( token: string ) {
        window.localStorage.setItem( 'token', token );
    }
}
