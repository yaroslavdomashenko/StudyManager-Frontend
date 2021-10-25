import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { endpointConfig } from 'src/app/config';
import { Role } from 'src/app/models/Role';
import { userModel } from 'src/app/models/userModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public serverUrl = endpointConfig.apiEndpoint;
  private subscription?:Subscription;
  public role:string|undefined;
  public userModel?:userModel;
  public userLogin:string;
  public loading = false;
  public date:string|null = "";

  constructor(private activateRoute: ActivatedRoute, private userService:UserService, private title:Title) {
    this.subscription = activateRoute.params.subscribe(params=>{
      this.userLogin = params['login'];
      this.GetUser(this.userLogin);
      title.setTitle(`${this.userLogin}- Study Manager`);
    });
    
  }

  private GetUser(login:string){
    this.loading = true;
    this.userService.GetUser(login).subscribe(
      (next) => {
        this.userModel = next; 
        this.role = Role[this.userModel?.role];
        const datepipe:DatePipe = new DatePipe('en-US');
        this.date = datepipe.transform(this.userModel?.dateCreated, 'dd.MM.yyyy HH:mm');
        this.loading = false;
      }
    );
  }

  ngOnInit(): void {}

}
