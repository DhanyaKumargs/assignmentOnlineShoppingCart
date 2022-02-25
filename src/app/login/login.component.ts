import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private SharedService:SharedService) { }

  ngOnInit(): void {

  }

  loginvalidate(){

  this.SharedService.sendClickEvent();
  }
}
