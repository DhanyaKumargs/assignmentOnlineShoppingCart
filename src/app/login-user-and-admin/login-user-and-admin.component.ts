import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../sign-up/user';
import { CustomResponse } from '../interface/custom';
import { UserServiceService } from '../user-service.service';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-login-user-and-admin',
  templateUrl: './login-user-and-admin.component.html',
  styleUrls: ['./login-user-and-admin.component.css']
})
export class LoginUserAndAdminComponent implements OnInit {
  loginForm:FormGroup;
  passwordpresent:boolean=true;
  // signUpForm:FormGroup;
 
  constructor(private SharedService:SharedService,private fb:FormBuilder,private userService:UserServiceService,private header:HeaderComponent,private router: Router) { 

    this.loginForm=fb.group({

      email_ID:['' ,[Validators.email, Validators.required]],
      password:['',Validators.required]
  
    })
  
    
  }
  emailpresent:boolean=true;
  users: User[] = []
  temp:any;
  ngOnInit(): void {

  }

  userloginvalidate(){
    
    this.userService.getUserByEmail(this.loginForm.value.email_ID).subscribe( res =>{
      this.temp=res;
    })
    if(this.temp==null){
      this.emailpresent=false;
    }else{
      if(this.loginForm.value.email_ID==this.temp.email &&  this.loginForm.value.password==this.temp.password){
       
        sessionStorage.setItem('email',this.temp.email);
        sessionStorage.setItem('name',this.temp.name);
        this.SharedService.sendClickEvent();
         this.closePopUp();
      }else{
       
        this.emailpresent=true;
        this.passwordpresent=false;
      }

    }
 
  }
  loginvalidate(){
        console.log(this.loginForm.value.email_ID)
      this.userService.getadmin(this.loginForm.value.email_ID).subscribe( res =>{
        this.temp=res;
      })
      

      if(this.temp==null){
        this.emailpresent=false;
        this.passwordpresent=true;
      }else{
      
        if(this.loginForm.value.email_ID==this.temp.email &&  this.loginForm.value.password==this.temp.password){
          sessionStorage.setItem('name',this.temp.name);
          this.SharedService.sendClickEvent2();
          this.closePopUp();
        }else{
         
          this.emailpresent=true;
          this.passwordpresent=false;
        }
      }
 
    }
    clear(){
      this.loginForm.reset();
      this.emailpresent=true;
          this.passwordpresent=true;
    }

    closePopUp() {
      $('#modalLRForm.close').click()
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
    }
    myFunction(){
    
      this.userService.getadmin(this.loginForm.value.email_ID).subscribe( res =>{
        this.temp=res;
      })
      
    }
    myuserFunction(){
     
      this.userService.getUserByEmail(this.loginForm.value.email_ID).subscribe( res =>{
        this.temp=res;
      })
    }

    commonloginvalidate(){
     
      console.log(this.loginForm.value.email_ID)
    this.userService.getUserByEmail(this.loginForm.value.email_ID).subscribe( res =>{
      this.temp=res;
    })
    

    if(this.temp==null){
      this.emailpresent=false;
    }else{
    
      if(this.loginForm.value.email_ID==this.temp.email &&  this.loginForm.value.password==this.temp.password){
        sessionStorage.setItem('name',this.temp.name);
        if(this.temp.role=="Admin"){
        this.SharedService.sendClickEvent2();
        this.closePopUp();
        this.router.navigateByUrl("/landing")
        }else{
          sessionStorage.setItem('email',this.temp.email);
          sessionStorage.setItem('name',this.temp.name);
          this.SharedService.sendClickEvent();
           this.closePopUp();
           this.router.navigateByUrl("/landing")
        }
      }else{
       
        this.emailpresent=true;
        this.passwordpresent=false;
      }
    }

  }
}
