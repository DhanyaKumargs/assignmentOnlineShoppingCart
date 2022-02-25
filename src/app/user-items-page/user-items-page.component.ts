import { Component, OnInit,ViewChild } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Items } from '../interface/Items';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-items-page',
  templateUrl: './user-items-page.component.html',
  styleUrls: ['./user-items-page.component.css']
})
export class UserItemsPageComponent implements OnInit {
  clickEventSubsciption:Subscription;
  displayedColumns: string[] = ['product', 'price', 'inStock' , 'action1'];
  product: any[] = [];
  dataSource = new MatTableDataSource<any>(this.product);
  catagory:any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private userService:UserServiceService,private SharedService:SharedService) { 
    
    this.clickEventSubsciption=this.SharedService.getCliCkEvent3().subscribe(res=>{
      this.ngOnInit();
     })
  }
  
  loccatagory:any;
 
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    let temp =JSON.parse(localStorage.getItem('catagoryName')!);
    
    if(temp=="All"){
      this.catagory=temp;
    this.userService.getAllItems().subscribe(res =>{
      this.product=res;
      console.log(res);
        this.dataSource = new MatTableDataSource<any[]>(this.product);
        this.dataSource.paginator = this.paginator;
    })
  }
  else{
    this.catagory=temp;
    this.userService.getItemsByCatagory(temp).subscribe(res =>{
      this.product=res;
   
      console.log(res);
        this.dataSource = new MatTableDataSource<any[]>(this.product);
        this.dataSource.paginator = this.paginator;
    })
  }
  
  }
  temp:any;
  addItem(element:any){
    if(this.qty==0){
      Swal.fire({
        position: 'center',
        
        title: '0 items can,t be placed',
        showConfirmButton: false,
        timer: 1100
      });
      this.qty=1;
    }else{
   if(sessionStorage.getItem('email')){
     let email = sessionStorage.getItem('email');
     if(email!=null){
      this.userService.getUserByEmail(email).subscribe( res =>{
        this.temp=res;
        console.log(this.temp.items)
       
       let same=false;
       for(let item of this.temp.items){
       
         if(item.itemsId==element.itemsId){
          console.log("item : ",item.itemsId)
          same=true;
         }
       }
       if(!same){
         element.qty=this.qty;
        console.log(this.temp.items.push(element));
        this.userService.addUsers(this.temp).subscribe(res => {
          this.qty=1
        let d = res;
        console.log(d);
          });
        }
      })
    }
   }
   Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Item added to cart',
    showConfirmButton: false,
    timer: 1000
  })
  }
}

qty:number = 1;
increment(){
  this.qty=this.qty+1;
  }
  decrement(){
    this.qty=this.qty-1;
  }
  element:any;
  itemName:any;
  addname(item:any){
  this.itemName=item.name;
  this.element=item;
  }
}
