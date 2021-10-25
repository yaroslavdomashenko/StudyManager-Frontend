import { Component, OnInit } from '@angular/core';
import { Output, Input } from '@angular/core';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {
  @Input() Text:string = "";
  @Input() Link:string = "";
  @Input() Role?:Role;
  

  constructor() {}

  ngOnInit(): void {
    
  }

}
