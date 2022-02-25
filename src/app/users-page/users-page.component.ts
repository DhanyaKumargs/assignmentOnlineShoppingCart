import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  flag = false;
  show = false;
  displayedColumns: string[] = ['index', 'name', 'email', 'dob', 'phone', 'action1', 'action2'];
  users:any;
  message:any;
  user: any[] = [];
  dataSource = new MatTableDataSource<any>(this.user);
  constructor( private fb: FormBuilder, private formBuilder: FormBuilder,private http:HttpClient,private userService:UserServiceService) { }
showtable=true;
@ViewChild(MatPaginator)
paginator!: MatPaginator;
  ngOnInit(): void {
   
    this.userService.getUsers().subscribe(res=> {
      this.users=res;
     
      if(this.users==null){
          this.showtable=false;
      }else{
        let tem=[];
        for(let obj of this.users){
          if(obj.role=="User"){
          tem.push(obj);
          }
        }
      this.dataSource = new MatTableDataSource<any[]>(tem);
      this.dataSource.paginator = this.paginator;
      }
    });
    console.log(this.users)
    
  }
  
  delete(email: String) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete "+email+" !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(email).subscribe(res => console.log(res));
        window.location.reload();
      }
    })
  }
  editForm: FormGroup = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
    confirmpassword: [''],
    mobil: [''],
    date: [''],
    address: [''],
    id: ['']
  });

  data: any;
  edit(email: String) {
    // this.index = i;
    //alert("edit");
    Swal.fire({
      title: 'Are you sure?',
      text: "You need to edit user "+email+" !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Edit'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.getUserByEmail(email).subscribe(res => {
          this.data = res;
          console.log(this.data);
          this.flag = true;
          this.assignValue(res);
        });
      }
    })
  }
  assignValue(data: any) {
    console.log(data);
    this.editForm.controls['name'].setValue(data.name);
    this.editForm.controls['email'].setValue(data.email);
    this.editForm.controls['password'].setValue(data.password);
    this.editForm.controls['confirmpassword'].setValue(data.confirmpassword);
    this.editForm.controls['mobil'].setValue(data.mobil);
    this.editForm.controls['date'].setValue(data.date);
    this.editForm.controls['address'].setValue(data.address);
    this.editForm.controls['id'].setValue(data.id);
  }
  update() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Edited details has been saved',
      showConfirmButton: false,
      timer: 1000,
      
      
    })
    let signUpDetails = this.editForm.value;
    this.editForm.reset();
    console.log(signUpDetails);
    this.userService.addUsers(signUpDetails).subscribe(res => {
    this.flag = false;
   this.ngOnInit();
    });
  }
  cancel(){
    this.flag = false;
  }
}
