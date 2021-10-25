import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MaxValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.scss']
})
export class LogonComponent implements OnInit {
  errorText: string = "";
  loading = false;
  isAuth = false;
  subscription?:Subscription;

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surename: new FormControl('', Validators.required),
    login: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', Validators.required)
  });

  constructor(private authService:AuthService, private router:Router, title:Title) {
    this.subscription = this.authService.Subscribe().subscribe(value => this.isAuth = value);
    title.setTitle("Log on - Study Manager");
    if(this.isAuth){
      router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  get form(){
    return this.registerForm.controls;
  }

  onSubmit(): void{
    if(!this.registerForm.valid){
      return;
    }
    if(this.form.password.value != this.form.confirmPassword.value){
      this.errorText = "Password doesn't match";
      return;
    }
    this.loading = true;

    const newModel = {
      login: this.form.login.value,
      password: this.form.password.value,
      name: this.form.name.value,
      surename: this.form.surename.value,
      avatar: "assets/images/avatar.jpg"
    }

    this.authService.Logon(newModel).subscribe(
      (next) => {
        alert("Account has been registered");
        this.router.navigate(['login']);
      },
      (error) => {
        this.errorText = error.error.message;
        this.form.password.setValue("");
        this.form.confirmPassword.setValue("");
        this.loading = false;
      }
    );
  }

}
