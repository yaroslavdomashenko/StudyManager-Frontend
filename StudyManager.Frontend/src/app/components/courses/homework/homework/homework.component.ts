import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { courseModel } from 'src/app/models/courseModel';
import { homeworkModel } from 'src/app/models/homeworkModel';
import { Role } from 'src/app/models/Role';
import { userModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { HomeworkService } from 'src/app/services/homework.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.scss'],
})
export class HomeworkComponent implements OnInit {
  loading = true;
  courseId:string;
  user:userModel;
  course:courseModel
  subscription:Subscription;
  createTaskToggle = false;
  homeworks:homeworkModel[] = [];

  constructor(activateRoute:ActivatedRoute, 
    private homeworkService:HomeworkService, 
    private authService:AuthService, 
    private courseService:CourseService
    ){
    this.subscription = activateRoute.params.subscribe(params=>{
      this.courseId = params['id'];
    });
    this.GetCourse();
    this.GetUser();
    this.GetHomeworks(this.courseId);
  }

  ngOnInit(): void {
  }

  public get TeacherRole():Role{
    return Role.Teacher;
  }
  private GetUser(){
    this.loading = true;
    this.authService.GetMe().subscribe(data => {
      this.user = data;
      this.loading = false;
    });
  }
  private GetCourse(){
    this.loading = true;
    this.courseService.GetCourse(this.courseId).subscribe(data => {
      this.course = data;
      this.loading = false;
    })
  }

  public Update(){
    this.GetHomeworks(this.courseId);
    this.createTaskToggle = false;
  }
  public TaskToggle(){
    this.createTaskToggle = !this.createTaskToggle;
  }
  public GetHomeworks(id:string){
    this.loading = true;
    this.homeworkService.GetHomeworks(id, 15, 0).subscribe(data => {
      this.homeworks = data;
      this.loading = false;
    });
  }
  public ConvertTime(time:Date){
    const datepipe:DatePipe = new DatePipe('en-UK');
    return datepipe.transform(time, 'dd.MM.yyyy');
  }



}
