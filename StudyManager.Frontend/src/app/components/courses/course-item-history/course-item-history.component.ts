import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { courseModel } from 'src/app/models/courseModel';
import { visitModel } from 'src/app/models/visitModel';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-course-item-history',
  templateUrl: './course-item-history.component.html',
  styleUrls: ['./course-item-history.component.scss']
})
export class CourseItemHistoryComponent implements OnInit {
  @Input() courseId:any;
  public visitsModel:visitModel[];
  public subscription:Subscription;
  public querySub:Subscription;
  public loading = false;
  page:number = 1;
  length:number = 0;


  constructor(private activateRoute:ActivatedRoute, private visitService:VisitService) {
    this.subscription = activateRoute.params.subscribe(params => {
      this.courseId = params['id'];
    });
    this.querySub = activateRoute.queryParams.subscribe(params => {
      if(params['p'] != undefined) this.page = Number(params['p']);
      if(params['p'] == undefined || this.page <= 0) this.page = 1;
      
      this.GetCourseHistory(this.courseId);
    });
  }

  private GetCourseHistory(id:string){
    this.loading = true;
    const skip = (this.page - 1) * 15;
    this.visitService.GetVisits(this.courseId, 15, skip).subscribe(next=>{
      this.visitsModel = next;
      this.loading = false;
    })
    console.log(this.visitsModel);
  }

  ngOnInit(): void {
  }

  public ConvertTime(time:Date){
    const datepipe:DatePipe = new DatePipe('en-US');
    return datepipe.transform(time, 'dd.MM.yyyy HH:mm');
  }

}
