import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/Role';
import { userModel } from 'src/app/models/userModel';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  userModel:userModel;
  loading:boolean = false;

  changeRoleForm:FormGroup = new FormGroup({
    login: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required)
  });

  createCourseForm:FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    price: new FormControl(null, [Validators.required, Validators.min(0.1)])
  });

  constructor(private authService:AuthService, private router:Router, private adminService:AdminService) {
    this.GetUser();
  }

  private GetUser(){
    this.loading = true;
    this.authService.GetMe().subscribe(data => {
      this.userModel = data;
      if(this.userModel.role < 2){
        this.router.navigate(['']);
      }
      this.loading = false;
    })
  }

  ngOnInit(): void {
  }


  public ChangeRoleTo(){
    if(!this.changeRoleForm.valid) return;

    this.adminService.ChangeRole(this.changeRoleForm.controls.login.value, this.changeRoleForm.controls.role.value)
      .subscribe((next) => {
        alert("Role has been changed");
      }, (error) =>{
        alert(error.error.message);
      }
    );
    this.changeRoleForm.reset();
  }

  public CreateCourse(){
    if(!this.createCourseForm.valid) return;
    
    let title = this.createCourseForm.controls.title.value;
    let price = this.createCourseForm.controls.price.value;
    this.adminService.CreateCourse(title, price).subscribe((next)=>{
      this.router.navigate(['/courses', next.id]);
    });
  }

}
