import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { endpointConfig } from '../config';
import { userModel } from '../models/userModel';
import { ChangeNameModel } from '../models/ChangeNameModel';
import { ChangePasswordModel } from '../models/changePasswordModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = endpointConfig.apiEndpoint + "/api";
  private UpdateSubject = new Subject();

  constructor(private http:HttpClient) { }

  public SubsrtibeToUpdates(){
    return this.UpdateSubject.asObservable();
  }
  public UpdateProfile(){
    return this.UpdateSubject.next();
  }

  public GetAllUsers(take:number, skip:number = 0): Observable<any>{
    const url = this.apiUrl + `/users?take=${take}&skip=${skip}`;
    return this.http.get<any>(url, httpOptions);
  }

  public GetMe(): Observable<userModel>{
    const url = this.apiUrl + "/users/me";
    return this.http.get<userModel>(url, httpOptions);
  }

  public GetUser(login:string): Observable<userModel>{
    const url = this.apiUrl + `/users/${login}`;
    return this.http.get<userModel>(url, httpOptions);
  }

  public ChangePassword(ChangePasswordModel:ChangePasswordModel): Observable<any>{
    const url = this.apiUrl + "/users/change_passowod";
    return this.http.post(url, ChangePasswordModel, httpOptions);
  }
  public ChangeName(ChangeNameModel:ChangeNameModel): Observable<any>{
    const url = this.apiUrl + "/users/change_name";
    return this.http.put(url, ChangeNameModel, httpOptions);
  }
  public UploadAvatar(file:File): Observable<any>{
    const url = this.apiUrl + `/users/upload-avatar`;
    httpOptions.headers = httpOptions.headers.delete("Content-Type")
      .set("observe", "events").set('reportProgress', 'true');
    let fileData = new FormData();
    fileData.append('file', file, file.name);
    return this.http.post(url, fileData, httpOptions);
  }
}
