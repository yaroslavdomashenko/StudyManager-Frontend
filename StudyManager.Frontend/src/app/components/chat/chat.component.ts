import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as signalR from "@microsoft/signalr";
import { endpointConfig } from 'src/app/config';
import { messageModel } from 'src/app/models/messageModel';
import { ChatService } from 'src/app/services/chat.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { courseModel } from 'src/app/models/courseModel';
import { UserService } from 'src/app/services/user.service';
import { userModel } from 'src/app/models/userModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild("chat") chat:ElementRef;
  public loading = true;
  public apiUrl = endpointConfig.apiEndpoint;
  private subscription:Subscription;
  private hubConnection: signalR.HubConnection
  public courseId:string;
  public messages:messageModel[] = [];
  public course:courseModel;
  public user:userModel;
  public chatOnline:number = 0;

  textForm = new FormGroup({
    text: new FormControl(null, Validators.required)
  });

  constructor(
    private activateRoute:ActivatedRoute, 
    private chatService:ChatService,
    private userService:UserService,
    private router:Router,
    private courseService:CourseService)
  {
    this.subscription = activateRoute.params.subscribe(params=>{
      this.courseId = params['id'];
      this.GetMessages(this.courseId);
      this.GetCourse(this.courseId);
    });
    this.GetMe();
  }

  public StartConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(this.apiUrl + "/signalr").build();
    this.hubConnection
      .start()
      .then(() => {
        this.hubConnection.invoke("EnterToGroup", this.courseId);
      }).catch(err => console.log('Error while starting connection: ' + err));
    
    this.hubConnection.on('ReceiveMessage', (data:messageModel) => {
      this.messages.push(data);
      this.ScrollToTheBottom();
    });

    this.hubConnection.on("GroupInfo", data => {
      this.chatOnline = data;
    });

  }

  ngOnInit(): void{
    this.StartConnection();
  }

  ngAfterViewInit(): void{
    this.ScrollToTheBottom();
  }

  public GetMe(){
    this.userService.GetMe().subscribe(data => {
      this.user = data;
    }, err => this.router.navigate(['/'])
    );
  }

  public ScrollToTheBottom(){
    try{
      this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight - 1;
    }catch(cth) { }
  }

  public GetMessages(chatId:string){
    this.chatService.GetMessages(this.courseId, this.messages.length).subscribe(data => {
      this.messages = data;
      this.loading = false;
    });
  }
  public GetCourse(courseId:string){
    this.courseService.GetCourse(this.courseId).subscribe(data => {
      this.course = data;
      this.ScrollToTheBottom();
    })
  }

  public OnSubmit(){
    if(!this.textForm.valid) return;
    const text = this.textForm.controls.text.value;
    const MessageModel = {
      text: text,
      userId: this.user.id,
      chatId: this.courseId
    };
    this.hubConnection.invoke("SendMessageToGroup", MessageModel);
    this.textForm.reset();
  }

  public ConvertTime(time:Date){
    const datepipe:DatePipe = new DatePipe('en');
    return datepipe.transform(time, 'dd.MM.yyyy HH:mm');
  }

}
