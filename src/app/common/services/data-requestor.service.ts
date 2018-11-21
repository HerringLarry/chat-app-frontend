import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataRequestorService {

  static API_ENDPOINT: string = 'http://localhost:3000';

  constructor( private _http: HttpClient ) { }

  getRequest<T>( name: string ): Observable<T> {
    return this._http.get<T>( DataRequestorService.API_ENDPOINT + '/' + name );
  }

  putRequest<T>( name: string, obj: object ): Observable<T> {
      return this._http.put<T>( DataRequestorService.API_ENDPOINT + '/' + name, obj );
  }

  postRequest<T>( name: string, obj: object ): Observable<T> {
      return this._http.post<T>( DataRequestorService.API_ENDPOINT + '/' + name, obj );
  }

  deleteRequest<T>( name: string, obj: object ): Observable<T> {
      return this._http.delete<T>( DataRequestorService.API_ENDPOINT + '/' + name, obj );
  }


}
