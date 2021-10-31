import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpointConfig } from '../config';
import { messageModel } from '../models/messageModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  })
}; 

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private apiUrl = endpointConfig.apiEndpoint + "/api";

  constructor(private http:HttpClient) { }

  public GetMessages(chatId:string, skip:number): Observable<messageModel[]>{
    const url = this.apiUrl + `/chat/messages?chatId=${chatId}&skip=${skip}`;
    return this.http.get<messageModel[]>(url, httpOptions);
  }
}
