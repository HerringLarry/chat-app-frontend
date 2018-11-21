import { Injectable } from '@angular/core';

@Injectable()
export class ThreadService {

    static get thread(): string | '' {
        return window.localStorage.getItem('thread');
    }

    static set thread( thread: string ) {
        window.localStorage.setItem( 'thread', thread );
    }
}
