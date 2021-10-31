import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private subscription:Subscription;
  public courseId:string;
  
  constructor(private activateRoute:ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params=>{
      this.courseId = params['id'];
      //this.GetCourse(this.courseId);
    });
  }

  ngOnInit(): void {
  }

}
