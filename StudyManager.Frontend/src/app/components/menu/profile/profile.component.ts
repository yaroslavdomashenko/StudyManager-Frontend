import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { endpointConfig } from '../../../config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  serverUrl:string = "";
  @Input() Name:string = "";
  @Input() Login:string = "";
  @Input() Avatar:string = "";
  

  constructor() {
    this.serverUrl = endpointConfig.apiEndpoint;
  }

  ngOnInit(): void {
  }

}
