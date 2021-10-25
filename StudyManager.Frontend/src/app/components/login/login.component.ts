import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorText:string = "";
  isAuth = false;
  loading = false;
  subscription?:Subscription;

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get form(){
    return this.loginForm.controls;
  }

  constructor(private authService:AuthService, private router:Router, private title:Title) {
    this.subscription = this.authService.Subscribe().subscribe(value => this.isAuth = value);
    title.setTitle("Log in - Study Manager");
    if(this.isAuth){
      router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    if(!this.loginForm.valid){
      return;
    }

    this.loading = true;
    const newModel = {
      login: this.loginForm.controls.login.value,
      password: this.loginForm.controls.password.value
    };

    this.authService.Login(newModel).subscribe(
      (next) => {
        this.AuthorizeUser(next.token);
        this.authService.LoginToggle();
      },
      (error) =>{
        this.errorText = error.error.message;
        this.loginForm.controls.password.setValue('');
        this.loginForm.controls.password.markAsUntouched();
        this.loading = false;
      }
    );
  }

  private AuthorizeUser(token:string){
    localStorage.setItem("token", token);
    document.location.href = '/';
  }
}
