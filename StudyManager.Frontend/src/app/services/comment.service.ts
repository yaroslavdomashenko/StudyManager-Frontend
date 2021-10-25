import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpointConfig } from '../config';
import { comment } from '../models/comment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  })
}; 

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private apiUrl = endpointConfig.apiEndpoint + "/api";

  constructor(private http:HttpClient) {
  }

  public GetComments(id:string, take:number, skip:number): Observable<comment[]>{
    const url = this.apiUrl + `/comments?hwId=${id}&take=${take}&skip=${skip}`;
    return this.http.get<comment[]>(url, httpOptions);
  }

  public SendComment(id:string, text:string): Observable<comment>{
    const url = this.apiUrl + `/comments/create?hwId=${id}&text=${text}`;
    return this.http.post<comment>(url, null, httpOptions);
  }

  public DeleteComment(id:string){
    const url = this.apiUrl + `/comments/remove?id=${id}`;
    return this.http.delete(url, httpOptions);
  }

}
