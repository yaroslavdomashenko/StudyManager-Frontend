import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { endpointConfig } from 'src/app/config';
import { addUserModel } from 'src/app/models/addUserModel';
import { courseModel } from 'src/app/models/courseModel';
import { Role } from 'src/app/models/Role';
import { userModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { VisitService } from 'src/app/services/visit.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  private subscription:Subscription;
  public serverUrl = endpointConfig.apiEndpoint;
  public date: string|null = '';
  public loading = false;
  public courseModel:courseModel;
  public userModel:userModel;
  public AdminRole:Role = Role.Admin;

  public isAddUser:boolean = false;
  public courseId:string = "";
  public VisitList:string[] = [];

  public GetVisitsForm = new FormGroup({
    firstDate: new FormControl(null, Validators.required),
    secondDate: new FormControl(null, Validators.required)
  })

  public ChangeInfoForm = new FormGroup({
    title: new FormControl(),
    price: new FormControl()
  });

  constructor(private activateRoute:ActivatedRoute, 
      private courseService:CourseService, 
      private authService:AuthService, 
      private title:Title,
      private visitService:VisitService
    ){
    this.GetUser();
    this.subscription = activateRoute.params.subscribe(params=>{
      this.courseId = params['id'];
      this.GetCourse(this.courseId);
    });
  }

  private GetUser(){
    this.loading = true;
    this.authService.GetMe().subscribe((data) => {
      this.userModel = data;
      this.loading = false;
    });
  }

  private GetCourse(id:string){
    this.loading = true;
    this.courseService.GetCourse(id).subscribe((data) => {
      this.courseModel = data;
      const datepipe:DatePipe = new DatePipe('en-US');
      this.date = datepipe.transform(this.courseModel?.dateCreated, 'dd.MM.yyyy HH:mm');
      this.title.setTitle(`${this.courseModel.title} - Study Manager`);
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

  ChangeActive(){
    if(this.userModel?.role == Role.Admin || (this.courseModel?.user?.id == this.userModel?.id)){
      this.courseService.ChangeActive(this.courseId).subscribe((data)=>{
        this.courseModel.isActive = !this.courseModel.isActive;
      });
    }
  }

  public addUser(model:addUserModel){
    if(model.asTeacher){
      this.courseService.AddTeacher(model.login, this.courseId).subscribe(() => {
        this.GetCourse(this.courseId);
      }, error => alert(error.error.message));
    }else{
      this.courseService.AddStudent(model.login, this.courseId).subscribe(() => {
        this.GetCourse(this.courseId);
      });
    }
    this.isAddUser = false;
  }

  public AddUserPanel(){
    if(!this.courseModel?.isActive) return;
    this.isAddUser = !this.isAddUser;
  }

  public Remove(studentId:string): void{
    if(confirm("Are you sure?")){
      this.courseService.RemoveStudent(studentId, this.courseId).subscribe(()=>{
        this.GetCourse(this.courseId);
      })
    }
  }

  public RemoveTeacher(id: string): void{
    if(confirm("Are you sure?")){
      console.log(id);
      this.courseService.RemoveTeacher(id).subscribe(() => {
        this.GetCourse(this.courseId);
      })
    }
  }

  public Update(){
    this.GetCourse(this.courseId);
  }

  public ManageVisitList(id:string, toAdd:boolean = true){
    if(toAdd){
      this.VisitList[this.VisitList.length] = id;
      return;
    }
    this.VisitList = this.VisitList.filter(x => x != id);
  }
  public InVisitList(id:string): boolean{
    for(let i = 0; i < this.VisitList.length; i++){
      if(this.VisitList[i] == id) return true;
    }
    return false;
  }

  public CreateNewVisit(){
    const model = {
      courseId: this.courseId,
      visitors: this.VisitList
    };
    if(this.VisitList.length == 0) return;

    this.visitService.CreateVisit(model).subscribe((next) => {
      alert("New visit has been created!");
    })
    this.VisitList = [];
  }

  public EditPrice(newPrice:number){
    console.log(newPrice);
    if(!isNaN(newPrice)){
      console.log("Is number");
    }
    else{
      console.log("Not number");
    }
  }

  public EditInfo(){
    let title = this.ChangeInfoForm.controls.title.value;
    let price = this.ChangeInfoForm.controls.price.value;

    this.courseService.ChangeInfo(this.courseId, title, price).subscribe(() =>{
      this.GetCourse(this.courseId);
    }, error => alert(error.error.message)
    );
    this.ChangeInfoForm.reset();
  }

}
