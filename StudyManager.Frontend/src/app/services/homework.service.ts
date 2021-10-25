import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpointConfig } from '../config';
import { homeworkModel } from '../models/homeworkModel';
import { homeworkTask } from '../models/homeworkTask';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
  })
}; 

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {
  private apiUrl = endpointConfig.apiEndpoint + "/api";
  constructor(private http:HttpClient) { }

  public GetHomeworks(id:string, take:number, skip:number): Observable<homeworkModel[]>{
    const url = this.apiUrl + `/homework/homeworks?courseId=${id}&take=${take}&skip=${skip}`;
    return this.http.get<homeworkModel[]>(url, httpOptions);
  }
  public GetTask(id:string): Observable<homeworkTask>{
    const url = this.apiUrl + `/homework/task?id=${id}`;
    return this.http.get<homeworkTask>(url, httpOptions);
  }

  public CreateTask(courseId:string, title:string, text:string, date:Date): Observable<any>{
    const url = this.apiUrl + `/homework/create`;
    const CreateHomeworkModel = {
      courseId: courseId,
      expireDate: date,
      title: title,
      text: text
    };
    return this.http.post(url, CreateHomeworkModel, httpOptions);
  }
  public AddAttachment(hwId:string, files:File[]):Observable<any>{
    const url = this.apiUrl + `/homework/attach?id=${hwId}`;
    httpOptions.headers = httpOptions.headers.delete("Content-Type").set("observe", "events").set('reportProgress', 'true');
    let fileData = new FormData();
    for(let i = 0; i < files.length; i++){
      fileData.append("files", files[i], files[i].name);
    } 
    return this.http.post(url, fileData, httpOptions);
  }

  public UpdateTask(id:string, title:string, text:string): Observable<any> {
    const url = this.apiUrl + `/homework/update?id=${id}&title=${title}&text=${text}`;
    return this.http.put(url, null, httpOptions);
  }

  public DeleteTask(id:string){
    const url = this.apiUrl + `/homework/delete?id=${id}`;
    return this.http.delete(url, httpOptions);
  }

}
