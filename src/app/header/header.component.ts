import { Component, Injectable, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginUserAndAdminComponent } from '../login-user-and-admin/login-user-and-admin.component';
import { SharedService } from '../shared.service';
import { UserServiceService } from '../user-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catagories } from '../interface/Catagories';
import { Router } from '@angular/router';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AppModule } from '../app.module';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
clickEventSubsciption:Subscription;
clickEventSubsciption2:Subscription;
 isLogin:boolean=false;
 isAdmin:boolean=false;
catagories:any;
catagoryForm:FormGroup;
catagory:Catagories = new Catagories;
  uname:any;
  constructor(private sharedService:SharedService,private userService:UserServiceService,private fb:FormBuilder,private router: Router) {

   let login = localStorage.getItem("isLogin");
   let admin = localStorage.getItem("isAdmin");
   this.uname=sessionStorage.getItem('name');
   if(login=="true"){
    this.isLogin=true;
   }
   if(admin=="true"){
    this.isAdmin=true;
   }
    this.clickEventSubsciption=this.sharedService.getCliCkEvent().subscribe(()=>{
     
     this.loginSuccess();
    })

   
    this.clickEventSubsciption2=this.sharedService.getCliCkEvent2().subscribe(()=>{
      this.adminloginSuccess();
     })

    //  -----------catagoryForm
     this.catagoryForm=fb.group({

      name:['', [Validators.required,Validators.minLength(3)]],
      description:['']
  
    })
   }
 
  ngOnInit(): void {
  
    this.userService.getCatagories().subscribe(res =>{
      this.catagories=res;
      console.log("hed",res)
   })
   
  }

 
  loginSuccess(){
    // location.reload();
    localStorage.setItem("isLogin",JSON.stringify(true))
    this.isLogin=true;
    // Swal.fire({
    //   position: 'center',
    //   icon: 'success',
    //   title: 'Login Succesful',
    //   showConfirmButton: false,
    //   timer: 1500,
    // })
    this.uname=sessionStorage.getItem('name');
    //let uname = sessionStorage.getItem('name');
    // console.log(this.clickEventSubsciption)
   
  }
  adminloginSuccess(){
   
    localStorage.setItem("isLogin",JSON.stringify(true))
    localStorage.setItem("isAdmin",JSON.stringify(true))
    this.isLogin=true;
    this.isAdmin=true;
    // Swal.fire({
    //   position: 'center',
    //   icon: 'success',
    //   title: 'Login Succesful',
    //   showConfirmButton: false,
    //   timer: 1500,
    // })
    //let uname = sessionStorage.getItem('name');
    this.uname=sessionStorage.getItem('name');
   
  }
  logOut(){
    localStorage.setItem("isLogin",JSON.stringify(false))
    localStorage.setItem("isAdmin",JSON.stringify(false))
    this.isLogin=false;
    this.isAdmin=false;
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'your session is finished. logged out successfully',
      showConfirmButton: false,
      timer: 1500,
    })
  }
  cat:any;
  addCatagory(){
   if(this.catagoryForm.value.name!=""){
     
   this.userService.getCatagoryByName(this.catagoryForm.value.name).subscribe( res =>{
     let cat = res;
     if(cat==null){
      this.catagory=this.catagoryForm.value;
      this.userService.addcatagory(this.catagory).subscribe( res =>{
       this.cat=res;
       this.catagoryForm.reset();
       this.ngOnInit();
      });
     }
     else{
      Swal.fire({
        position: 'center',
        
        title: 'Catagory Already Present',
        showConfirmButton: false,
        timer: 1000
      })
     }
   })
    
   
  }
    this.closePopUp();
  }
  clear(){
    this.catagoryForm.reset();
  }
  closePopUp() {
    $('#category.close').click()
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  addcat(name:String){
    localStorage.setItem("catagoryName",JSON.stringify(name));
    this.sharedService.sendClickEvent3();
  }

  te(){
      this.userService.getCatagories().subscribe(res =>{
        this.catagories=res;
    })
   
  }
}
