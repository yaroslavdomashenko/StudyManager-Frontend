import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {  
  passErrorText:string = "";
  passSuccessText:string = "";
  loading:boolean = false;

  file:File | any;

  changePasswordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmNewPassowod: new FormControl('', Validators.required)
  });
  changeNameForm = new FormGroup({
    name: new FormControl(null),
    surename: new FormControl(null)
  });

  constructor(private userService:UserService, private title:Title) {
    title.setTitle("Settings - Study Manager");
  }

  ngOnInit(): void {
  }

  public get changePassForm(){
    return this.changePasswordForm.controls;
  }
  public get changeNaForm(){
    return this.changeNameForm.controls;
  }

  public ChangePassword(){
    if(this.changePassForm.newPassword.value != this.changePassForm.confirmNewPassowod.value){
      this.changePasswordForm.reset();
      return;
    }

    this.loading = true;
    const newModel = {
      oldPassword: this.changePassForm.password.value,
      newPassword: this.changePassForm.newPassword.value
    };

    this.userService.ChangePassword(newModel).subscribe(
      (next)=> this.passSuccessText = "Passoword updated!",
      (error) => this.passErrorText = error.error.message 
    );
    this.changePasswordForm.reset();
    this.loading = false;
  }
  public ChangeName(){
    this.loading = true;
    const newModel = {
      name: this.changeNaForm.name.value,
      surename: this.changeNaForm.surename.value
    };
    this.userService.ChangeName(newModel).subscribe(
      (next)=> {
        this.passSuccessText = "Name updated!";
        this.userService.UpdateProfile();
      },
      (error) => this.passErrorText = error.error.message 
    );
    this.changeNameForm.reset();
    this.loading = false;
  }

  public UploadAvatar(){
    if(this.file == null) return;
    this.loading = true;
    this.userService.UploadAvatar(this.file).subscribe(event => {
      this.userService.UpdateProfile();
      }
    );
    this.loading = false;
  }
  public onFileSelected (files:any){
    if (files.length === 0) {
      return;
    }
    this.file = <File>files[0];
  }

}
