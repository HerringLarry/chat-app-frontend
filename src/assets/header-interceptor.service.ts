// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
// import { Router } from '@angular/router';
// import 'rxjs/add/operator/do';

// import { SessionService } from './common/services/session.service';
// import { UsernameService } from './common/services/username.service';
// import { Observable } from 'rxjs';


// @Injectable()
// export class HeaderInterceptor implements HttpInterceptor {

//     constructor( private _router: Router ) {}

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         console.log('in');
//         return next.handle(
//             SessionService.sessionToken ?
//                 req.clone({
//                     setHeaders: {
//                         'Authorization': 'Bearer ' + SessionService.sessionToken,
//                     }
//                 }) :
//                 req
//         ).do((event: HttpEvent<any>) => {
//             if (event instanceof HttpResponse) {
//               // do stuff with response if you want
//             }
//           }, err => this.handleError( err ));
//     }

//     handleError( err: any ): any {
//         if (err instanceof HttpErrorResponse) {
//             if (err.status === 401) {
//                 SessionService.sessionToken = '';
//                 UsernameService.username = '';
//                 this._router.navigate( ['login'] );
//             }
//         }
//     }
// }
