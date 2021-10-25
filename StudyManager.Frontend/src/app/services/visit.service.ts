import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpointConfig } from '../config';
import { CreateVisitModel } from '../models/CreateVisitModel';
import { UsersVisitModel } from '../models/UsersVisitModel';
import { visitModel } from '../models/visitModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  })
}; 

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private apiUrl = endpointConfig.apiEndpoint + "/api";

  constructor(private http:HttpClient) { }

  public GetVisits(id:string, take:number, skip:number) :Observable<visitModel[]>{
    const url = this.apiUrl + `/visits?courseId=${id}&skip=${skip}&take=${take}`;
    return this.http.get<visitModel[]>(url, httpOptions);
  }

  public CreateVisit(CreateVisitModel:CreateVisitModel) : Observable<any>{
    const url = this.apiUrl + `/visits`;
    return this.http.post(url, CreateVisitModel, httpOptions);
  }

  public GetVisitsInPeriod(id:string, login:string, firstDate:Date, secondDate:Date) : Observable<UsersVisitModel[]>{
    const url = this.apiUrl + `/visits/user?courseId=${id}&firstDate=${firstDate}&secondDate=${secondDate}&login=${login}`;
    return this.http.get<UsersVisitModel[]>(url, httpOptions);
  }
}
