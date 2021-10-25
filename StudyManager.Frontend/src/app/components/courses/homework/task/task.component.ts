import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { endpointConfig } from 'src/app/config';
import { homeworkTask } from 'src/app/models/homeworkTask';
import { userModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { HomeworkService } from 'src/app/services/homework.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  subscription:Subscription;
  apiUrl = endpointConfig.apiEndpoint;
  loading = true;
  homeworkId:string;
  task:homeworkTask;
  user:userModel;

  editForm = new FormGroup({
    title: new FormControl(""),
    text: new FormControl("")
  })

  constructor(private activateRoute:ActivatedRoute, private homeworkService:HomeworkService, private authService:AuthService, private router:Router) {
    this.subscription = activateRoute.params.subscribe(params=>{
      this.homeworkId = params['task'];
    });
    this.authService.GetMe().subscribe(data => {
      this.user = data;
    })
    this.GetHomework(this.homeworkId);
  }

  ngOnInit(): void{
  }

  GetHomework(id:string){
    this.loading = true;
    this.homeworkService.GetTask(id).subscribe(data => {
      this.loading = false;
      this.task = data;
    })
  }

  public SaveChanges(){
    let text = this.editForm.controls.text.value;
    let title = this.editForm.controls.title.value;
    this.homeworkService.UpdateTask(this.homeworkId, title, text).subscribe(() => {
      this.task.homework.title = title;
      this.task.homework.text = text;
    });
    this.editForm.reset();
  }

  public Remove(){
    if(!confirm("Are you sure?")) return;
    this.homeworkService.DeleteTask(this.homeworkId).subscribe(() => {
      this.router.navigate(["../.."], {relativeTo: this.activateRoute});
    });
  }

  public ConvertTime(time:Date){
    const datepipe:DatePipe = new DatePipe('en-UK');
    return datepipe.transform(time, 'dd.MM.yyyy');
  }

}
