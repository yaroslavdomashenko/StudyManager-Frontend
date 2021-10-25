import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeworkService } from 'src/app/services/homework.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})

export class CreateTaskComponent implements OnInit {
  @Input() courseId:string = "";
  @Output() onUpdate = new EventEmitter<any>();
  today:Date = new Date;
  files: File[] = [];
  loading = false;
  createForm = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    text: new FormControl(null),
    date: new FormControl(null, Validators.required)
  });

  constructor(private homeworkService:HomeworkService) 
  {
  }

  ngOnInit(): void{
  }

  public get TodayDate(){
    return `${this.today.getFullYear()}-${this.today.getUTCMonth() + 1}-${this.today.getDate()}`;
  }
  public get Form(){
    return this.createForm.controls;
  }
  public CreateTask(){
    if(!this.createForm.valid) return;

    this.loading = true;
    const title = this.Form.title.value;
    const date = this.Form.date.value;
    const text = this.Form.text.value;
    
    this.homeworkService.CreateTask(this.courseId, title, text, date).subscribe(data => {
      if(this.files.length !== 0){
        this.homeworkService.AddAttachment(data, this.files).subscribe();
        this.files = [];
      }
      this.onUpdate.emit();
      this.loading = false;
    });
    this.createForm.reset();
  }

  public UploadAttachment(hwId:string){
    this.loading = true;
    
  }

  public onFileSelected (files:any){
    if (files.length === 0) {
      return;
    }
    for(let i = 0; i < files.length; i++){
      this.files[i] = <File>files[i];
    }
  }

}
