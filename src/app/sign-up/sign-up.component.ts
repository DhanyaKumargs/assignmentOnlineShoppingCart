import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../sign-up/user';
import Swal from 'sweetalert2';
import { CustomResponse } from '../interface/custom';
import { UsersPageComponent } from '../users-page/users-page.component';
import { UserServiceService } from '../user-service.service';
declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm:FormGroup;
  users: any;
  temp:any;
  emailpresent:any
  present:boolean=true;
  user :User =new User;
  unamePattern = "^[ a-zA-Z0-9]{3,15}$";
  pwdPattern = "^[0-9a-zA-Z]{6,20}$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  userfond : any;
  msg : String ="";
  pwd : boolean = false;
  fond : boolean = false;
  email :String ="";

  constructor(private fb:FormBuilder,private http:HttpClient,private userService:UserServiceService) { 
  this.signupForm=fb.group({
    
        name:['',[Validators.required,Validators.minLength(4),Validators.pattern(this.unamePattern)]],
        email:['' ,[Validators.email, Validators.required]],
        password:['' ,[Validators.required, Validators.pattern(this.pwdPattern)]],
        confirmpassword:['' , [Validators.required]],
        mobil:['',[Validators.required, Validators.pattern(this.mobnumPattern)]],
        date:['',Validators.required],
        address:['',[Validators.required,Validators.minLength(10)]]
      }) 
    }

  ngOnInit(): void {
  }

  register(){
    this.user=this.signupForm.value;
   
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your Registration successful',
      showConfirmButton: false,
      timer: 1100
    })
    this.userService.addUsers(this.user).subscribe( res =>{
      console.log(res)
      this.temp=res
      
     
      this.closePopUp();
      this.clear();
      // window.location.reload();
      // alert("You have Successfully registered with unique Id :"+this.temp.id);
     
     
    });
    this.closePopUp();
    
    
  }
 
  clear(){
    this.signupForm.reset();
    this.pwd=false;
    this.fond=false;
  }
  closePopUp() {
    // this.clear();
    $('#myModal.close').click()
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }
 
  getmail(event: any) {
    this.email = event.target.value;
    console.log("In event" , this.email)
    this.userService.getUserByEmail(this.email).subscribe(res =>{
      this.userfond = res;
    if(this.userfond == null)
    {
      this.fond = false;
    }
    else{
    if(this.userfond.email == this.email){
        this.msg="User already exists";
        this.fond=true;
      }
    }
    })
  }
  passwordValidator(){
    if(this.signupForm.controls['password'].value !== this.signupForm.controls['confirmpassword'].value)
    {
        this.msg = "password and confirm password mismatch";
        this.pwd = true;
    }
    if(this.signupForm.controls['password'].value == this.signupForm.controls['confirmpassword'].value)
    {
        this.pwd = false;
    }
  }
}
