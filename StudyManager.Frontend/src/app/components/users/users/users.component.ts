import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { endpointConfig } from 'src/app/config';
import { Role } from 'src/app/models/Role';
import { userModel } from 'src/app/models/userModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public serverUrl = endpointConfig.apiEndpoint;
  public take:number = 20;
  public page:number = 1;
  public loading = true;
  public users?:userModel[];
  public length:number = 0;
  private subscription?:Subscription

  constructor(private activateRoute: ActivatedRoute, private userService:UserService, private title:Title) {
    this.subscription = activateRoute.queryParams.subscribe( params => {
      if(params['p'] != undefined){
        this.page = Number(params['p']);
      }
      if(params['p'] == undefined || this.page <= 0)
        this.page = 1;
      this.GetUsers();
    })
    title.setTitle("Users - Study Manager")
  }

  ngOnInit(): void {
  }

  public GetUsers(){
    this.loading = true;
    const skip = (this.page - 1) * 15;
    this.userService.GetAllUsers(15, skip).subscribe(data=>{
      this.users = data.users;
      this.length = this.users?.length as number;
      this.loading = false;
    });
  }

  public GetRoleText(role:Role){
    return Role[role];
  }

}
