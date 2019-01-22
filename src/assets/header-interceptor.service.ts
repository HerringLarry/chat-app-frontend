import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { SessionService } from 'src/app/common/services/session.service';
import { UsernameService } from 'src/app/common/services/username.service';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor( private _router: Router ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(
            SessionService.sessionToken ?
                req.clone({
                    setHeaders: {
                        'Authorization': 'Bearer ' + SessionService.sessionToken,
                    }
                }) :
                req
        );
    }

    handleError( err: any ): any {
        if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
                SessionService.sessionToken = '';
                UsernameService.username = '';
                this._router.navigate( ['login'] );
            }
        }
    }
}
