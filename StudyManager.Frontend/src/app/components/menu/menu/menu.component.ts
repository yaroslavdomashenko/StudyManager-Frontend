import { Component, OnInit } from '@angular/core';
import { button } from 'src/app/models/button';
import { AuthService } from 'src/app/services/auth.service';
import { config, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { userModel } from 'src/app/models/userModel';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {  
  userModel:userModel | undefined;
  userRole:Role = Role.UnAuthorized;
  isAuth:boolean = false;
  loading = false;
  subscription?:Subscription;
  updater?:Subscription;
  buttons:button[] = [];

  constructor(private authService:AuthService, private userService:UserService) { 
    this.subscription = authService.Subscribe().subscribe(value => {
      this.isAuth = value;
      if(!this.isAuth){
        this.userRole = Role.UnAuthorized;
        this.userModel = undefined;
      }
    });
    this.updater = userService.SubsrtibeToUpdates().subscribe(() =>{
      this.GetMe();
    });
  }

  ngOnInit(): void {
    if(this.isAuth){
      this.GetMe();
    }
    this.CreateButtons();
  }

  private CreateButtons():void{
    this.buttons = [
      {text: 'Log in', link: '/login', accessRole: [Role.UnAuthorized] },
      {text: 'Log on', link: '/logon', accessRole: [Role.UnAuthorized] },
      {text: 'My profile', link:`/users/${this.userModel?.login}`, accessRole: [Role.Student, Role.Teacher, Role.Admin] },
      {text: 'Admin panel', link:`admin-panel`, accessRole: [Role.Admin]},
      {text: 'Users', link: '/users', accessRole: [Role.Teacher, Role.Admin] },
      {text: 'Courses', link: '/courses', accessRole: [Role.Teacher, Role.Admin] },
      {text: 'Settings', link: '/settings', accessRole: [Role.Student, Role.Teacher, Role.Admin] },
    ];
  }

  private GetMe(){
    this.loading = true;
    this.userService.GetMe().subscribe(
      (data) => {
        this.userModel = data;
        this.userRole = this.userModel.role;
        this.CreateButtons();
        this.loading = false;
      }
    );
  }

  public Access(btn:button):boolean{
    return btn.accessRole.some(element => element == this.userRole);
  }

}
