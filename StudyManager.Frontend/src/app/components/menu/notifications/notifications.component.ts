import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationModel } from 'src/app/models/NotificationModel';
import { NotificationServiceService } from 'src/app/services/notification-service.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  toggle = false;
  loading = false;
  notifications:NotificationModel[] = [];

  constructor(private notService:NotificationServiceService) { 
    this.GetNotifications();
  }

  ngOnInit(): void {
  }

  public GetNotifications(){
    this.notService.GetNotifications(5, 0).subscribe(
      data=>{
        this.notifications = data;
    });
  }

  ToggleButton(){
    this.toggle = !this.toggle;
  }

  public ConvertTime(time:Date){
    const datepipe:DatePipe = new DatePipe('en-UK');
    return datepipe.transform(time, 'dd.MM.yyyy HH:mm');
  }

  public GetUnReadCount(): number{
    const count = this.notifications.filter(x => x.isRead == false).length;
    return count;
  }

  public Read(id:string){
    this.notService.MarkAsRead(id).subscribe(data=>{
      this.notifications.filter(element => {
        if(element.id == id){
          element.isRead = true;
      }});
      this.notifications.sort(function(a, b){
        return (a === b)? 0 : a? 1 : -1;
      })


    });
  }

  public LoadMore(){
    this.loading = true;
    this.notService.GetNotifications(5, this.notifications.length).subscribe(data=>{
      if(data.length > 0){
        this.notifications = this.notifications.concat(data);
      }
      this.loading = false;
    });
  }

}
