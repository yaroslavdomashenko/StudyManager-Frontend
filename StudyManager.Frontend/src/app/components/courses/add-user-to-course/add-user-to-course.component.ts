import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addUserModel } from 'src/app/models/addUserModel';
import { Role } from 'src/app/models/Role';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-user-to-course',
  templateUrl: './add-user-to-course.component.html',
  styleUrls: ['./add-user-to-course.component.scss']
})
export class AddUserToCourseComponent implements OnInit {
  @Output() addUser = new EventEmitter<addUserModel>();
  @Input() courseId:string = "";
  @Input() userRole?:Role;

  userForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(5)]),
    asTeacher: new FormControl(false)
  });

  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
  }

  get uForm(){
    return this.userForm.controls;
  }

  public AddUser(){
    if(!this.userForm.valid) return;

    const addUser = {
      login: this.uForm.login.value,
      asTeacher: this.uForm.asTeacher.value
    };
    this.addUser.emit(addUser);
  }
}
