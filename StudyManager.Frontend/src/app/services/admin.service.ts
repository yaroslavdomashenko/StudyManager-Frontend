import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpointConfig } from '../config';
import { Role } from '../models/Role';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  })
}; 

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private apiUrl = endpointConfig.apiEndpoint + "/api";
  constructor(private http:HttpClient) { }

  public ChangeRole(login:string, role:Role):Observable<any>{
    const url = this.apiUrl + `/adminpanel/change_role_by_login?login=${login}&role=${Role[role]}`;
    return this.http.post(url, null, httpOptions);
  }

  public CreateCourse(title:string, price:number): Observable<any>{
    const url = this.apiUrl + `/courses/create?title=${title}&price=${price}`;
    return this.http.post(url, null, httpOptions);
  }
}
