import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { courseModel } from 'src/app/models/courseModel';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public loading:boolean = false;
  public page:number = 1;
  public length:number = 0;
  public courses:courseModel[];
  subscription:Subscription;

  constructor(private activateRoute:ActivatedRoute, private courseService:CourseService, private title:Title) {
    this.subscription = activateRoute.queryParams.subscribe( params => {
      if(params['p'] != undefined){
        this.page = Number(params['p']);
      }
      if(params['p'] == undefined || this.page <= 0)
        this.page = 1;
      this.GetCourses();
      title.setTitle("Courses - Study Manager");
    })
  }

  ngOnInit(): void {
  }

  public GetCourses(){
    this.loading = true;
    const skip = (this.page - 1) * 15;
    this.courseService.GetAllCourses(15, skip).subscribe(data=>{
      this.courses = data.items;
      this.length = this.courses.length as number;
      this.loading = false;
    });
  }

  public ConvertTime(time:Date){
    const datepipe:DatePipe = new DatePipe('en-UK');
    return datepipe.transform(time, 'dd.MM.yyyy HH:mm');
  }

}
