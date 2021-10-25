import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { endpointConfig } from 'src/app/config';
import { comment } from 'src/app/models/comment';
import { Role } from 'src/app/models/Role';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  serverUrl = endpointConfig.apiEndpoint;
  subscription:Subscription;
  comments:comment[] = [];
  loading = true;
  homeworkId:string = "";
  @Input() userRole:Role;

  sendForm = new FormGroup({
    text: new FormControl(null, Validators.required)
  });

  constructor(private commentService:CommentService, private activateRoute:ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params=>{
      this.homeworkId = params['task'];
    });
    this.GetComments();
  }

  ngOnInit(): void {
  }

  public GetComments() {
    this.loading = true;
    this.commentService.GetComments(this.homeworkId, 10, 0).subscribe(data => {
      this.comments = data;
      if(data.length < 10){
        
      }
      this.loading = false;
    });
  }

  public Remove(id:string){
    if(this.userRole != 2) return;
    this.commentService.DeleteComment(id).subscribe(() => {
      this.comments = this.comments.filter(x => x.id != id);
    });
  }

  public SendComment(){
    if(!this.sendForm.valid) return;
    let text = this.sendForm.controls.text.value;
    this.commentService.SendComment(this.homeworkId, text).subscribe(data => {
      this.comments.push(data);
    })
    this.sendForm.reset();
  }

  public ConvertTime(time:Date){
    const datepipe:DatePipe = new DatePipe('en-UK');
    return datepipe.transform(time, 'dd.MM.yyyy');
  }

}
