import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Server } from '../interface/server';
const base='http://localhost:8080/server';
@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http : HttpClient) { }

  getServers():Observable<Response> {
    return this.http.get<Response>(base+'/list');
  }
  saveServer(server:Server):Observable<Response> {
    return this.http.post<Response>(base+'/save',server);
  }


}
