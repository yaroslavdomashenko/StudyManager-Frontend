import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersVisitModel } from 'src/app/models/UsersVisitModel';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-user-visits',
  templateUrl: './user-visits.component.html',
  styleUrls: ['./user-visits.component.scss']
})
export class UserVisitsComponent implements OnInit {
  private subscription:Subscription;
  private parentSub:Subscription;
  visitsModel:UsersVisitModel[];
  loading = false;
  userLogin:string;
  courseId:string;
  firstSubmit = false;


  public DateForm = new FormGroup({
    firstDate: new FormControl(null, Validators.required),
    secondDate: new FormControl(null, Validators.required)
  });

  constructor(private activateRoute:ActivatedRoute, private visitService:VisitService) {
    this.subscription = activateRoute.params.subscribe(params=>{
      this.userLogin = params['login'];
    });
    activateRoute.parent?.params.subscribe(params => {
      this.courseId = params['id'];
    })
  }

  ngOnInit(): void {
  }

  public GetVisits(){
    if(!this.DateForm.valid) return;
    let firstDate = this.DateForm.controls.firstDate.value;
    let secondDate = this.DateForm.controls.secondDate.value;
    
    this.loading = true;
    this.visitService.GetVisitsInPeriod(this.courseId, this.userLogin, firstDate, secondDate).subscribe(
      data => {
        this.visitsModel = data;
        this.firstSubmit = true;
      },error=> alert(error.error.message)
    );
    this.loading = false;
  }

  public ConvertTime(time:Date){
    const datepipe:DatePipe = new DatePipe('en');
    return datepipe.transform(time, 'dd.MM.yyyy HH:mm');
  }

}
