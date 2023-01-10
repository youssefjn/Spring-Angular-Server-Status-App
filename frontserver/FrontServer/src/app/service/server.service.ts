import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Status } from '../enum/status.enum';
import { Response } from '../interface/response';
import { Server } from '../interface/server';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private headers = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
    })
  };
  private readonly apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(() => (`An error occured - Error code : ${error.status}`));
  }
  servers$ = <Observable<Response>>
    this.http.get<Response>(`${this.apiUrl}/server/list`,this.headers)
      .pipe(
        tap(console.log),
        catchError(this.handleError));

  save$ = (server: Server) => <Observable<Response>>
    this.http.post<Response>(`${this.apiUrl}/server/save`, server,this.headers)
      .pipe(
        tap(console.log),
        catchError(this.handleError));

  ping$ = (ipAddress: string) => <Observable<Response>>
    this.http.get<Response>(`${this.apiUrl}/server/ping/${ipAddress}`,this.headers)
      .pipe(
        tap(console.log),
        catchError(this.handleError));

  delete$ = (serverId: number) => <Observable<Response>>
    this.http.delete<Response>(`${this.apiUrl}/server/ping/${serverId}`,this.headers)
      .pipe(
        tap(console.log),
        catchError(this.handleError));

  filter$ = (status: Status, response : Response) => <Observable<Response>>
    new Observable<Response>(
    suscriber => {
      console.log(response);
      suscriber.next(
        status === Status.ALL ? { ...response, message: `Servers filtredby ${status} status`} : 
        {
          ...response,
          message : response.data.servers
          .filter(server => server.status === status).length > 0 ? `Servers filtred by 
          ${status === Status.SERVER_UP ? 'SERVER UP' 
          : 'SERVER DOWN'} status` : `No servers of ${status} found`,
          data : {servers:response.data.servers
            .filter(server => server.status === status)}
        }
      );
      suscriber.complete();
    }
      )
      .pipe(
        tap(console.log),
        catchError(this.handleError));

}

