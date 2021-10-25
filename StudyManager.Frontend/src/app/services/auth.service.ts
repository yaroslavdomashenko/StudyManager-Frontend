import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginModel } from '../models/loginModel';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { logonModel } from '../models/logonModel';
import { endpointConfig } from '../config';
import { userModel } from '../models/userModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  })
}; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = endpointConfig.apiEndpoint + "/api";
  private AuthorizeSubject:BehaviorSubject<boolean>;

  constructor(private http:HttpClient) {
    let status = localStorage.getItem("token") != null ? true : false;
    this.AuthorizeSubject = new BehaviorSubject<boolean>(status);
  }

  public Subscribe(){
    return this.AuthorizeSubject.asObservable();
  }

  public GetMe(): Observable<userModel>{
    const url = this.apiUrl + "/users/me";
    return this.http.get<userModel>(url, httpOptions);
  }

  public Login(LoginModel:LoginModel): Observable<any>{
    const url = this.apiUrl + "/auth/login";
    return this.http.post(url, LoginModel, httpOptions);
  }

  public Logon(LogonModel:logonModel): Observable<any>{
    const url = this.apiUrl + '/auth/register';
    return this.http.post(url, LogonModel, httpOptions);
  }

  public LoginToggle(){
    this.AuthorizeSubject.next(true);
  }

  public get AuthValue(){
    return this.AuthorizeSubject.value;
  }

  public Logout(){
    localStorage.removeItem("token");
    this.AuthorizeSubject.next(false);
  }
}
