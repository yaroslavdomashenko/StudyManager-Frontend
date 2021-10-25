import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpointConfig } from '../config';
import { courseModel } from '../models/courseModel';
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
export class CourseService {
  private apiUrl = endpointConfig.apiEndpoint + "/api";

  constructor(private http:HttpClient) { }

  public GetCourse(id:string): Observable<courseModel>{
    const url = this.apiUrl + `/courses/${id}`;
    return this.http.get<courseModel>(url, httpOptions);
  }
  public GetAllCourses(take:number, skip:number = 0): Observable<any>{
    const url = this.apiUrl + `/courses?take=${take}&skip=${skip}`;
    return this.http.get<any>(url, httpOptions);
  }

  public AddStudent(login:string, id:string): Observable<any>{
    const url = this.apiUrl + `/courses/add?userLogin=${login}&course=${id}`;
    return this.http.post(url, null, httpOptions);
  }
  public RemoveStudent(userId:string, id:string){
    const url = this.apiUrl + `/courses/remove?user=${userId}&course=${id}`;
    return this.http.post(url, null, httpOptions);
  }

  public AddTeacher(userLogin:string, id:string){
    const url = this.apiUrl + `/courses/add_teacher?user=${userLogin}&course=${id}`;
    return this.http.post(url, null, httpOptions);
  }
  public RemoveTeacher(id:string){
    const url = this.apiUrl + `/courses/remove_teacher?course=${id}`;
    return this.http.post(url, null, httpOptions);
  }

  public ChangeActive(id:string){
    const url = this.apiUrl + `/courses/change_active?course=${id}`;
    return this.http.post(url, null, httpOptions);
  }

  public ChangeInfo(id:string, title:string, price:number): Observable<any>{
    const url = this.apiUrl + `/courses/change`;
    if(price == null) price = -1;
    const EditInfoModel = {
      courseId: id,
      title: title,
      price: price
    };
    return this.http.put(url, EditInfoModel, httpOptions);
  }

}
