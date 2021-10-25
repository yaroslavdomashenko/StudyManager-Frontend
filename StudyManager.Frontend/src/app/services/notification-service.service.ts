import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpointConfig } from '../config';
import { NotificationModel } from '../models/NotificationModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  })
}; 

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {
  private apiUrl = endpointConfig.apiEndpoint + "/api";

  constructor(private http:HttpClient) { }

  public GetNotifications(take:number, skip: number): Observable<NotificationModel[]>{
    const url = this.apiUrl + `/notifications?take=${take}&skip=${skip}`;
    return this.http.get<NotificationModel[]>(url, httpOptions);
  }

  public MarkAsRead(id:string): Observable<any>{
    const url = this.apiUrl + `/notifications/read?id=${id}`;
    return this.http.post(url, null, httpOptions);
  }
}
