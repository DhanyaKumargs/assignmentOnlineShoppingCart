import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['product', 'price', 'inStock' , 'action1'];
  product: any[] = [];
  dataSource = new MatTableDataSource<any>(this.product);
  catagory:any;
  constructor(private userService:UserServiceService) { }
  temp2:any;
  showCheckout=false;
  totalPrice=0;
  ngOnInit(): void {
    let temp =JSON.parse(localStorage.getItem('catagoryName')!);
    if(temp!=null){
      this.catagory=temp;
      let email = sessionStorage.getItem("email");
      if(email!=null){
        this.userService.getUserByEmail(email).subscribe(res =>{
          this.temp2=res;
          console.log(res);
            this.dataSource = new MatTableDataSource<any[]>(this.temp2.items);
            if(this.temp2.items.length==0){
              this.showCheckout=false;
            }else{
              this.showCheckout=true;
              this.totalPrice=0
              for(let item of this.temp2.items){
                this.totalPrice=(item.price*item.qty)+this.totalPrice
              }
              console.log(this.totalPrice)
            }
        })
      }
  }
 
  
  }

  delete(i:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(i);
        console.log(this.temp2.items)
         let any = this.temp2.items.splice(i,1)
         this.userService.addUsers(this.temp2).subscribe(res => {
          
          this.ngOnInit();
          });
         console.log(this.temp2.items)
      }
    })
    // console.log(i);
    // console.log(this.temp2.items)
    //  let any = this.temp2.items.splice(i,1)
    //  this.userService.addUsers(this.temp2).subscribe(res => {
      
    //   this.ngOnInit();
    //   });
    //  console.log(this.temp2.items)
  }
  itemstockchange:any;
  order(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Order successful placed',
      showConfirmButton: false,
      timer: 1100
    })
   
      let email = sessionStorage.getItem("email");
      if(email!=null){
        this.userService.getUserByEmail(email).subscribe(res =>{
          this.temp2=res;
          this.userService.sendItems(this.temp2).subscribe(res =>{});
          for(let ite of this.temp2.items){
            this.userService.getItemByName(ite.name).subscribe(res =>{
              this.itemstockchange=res;
              this.itemstockchange.stock=(this.itemstockchange.stock)-(ite.qty);
              this.userService.addItems(this.itemstockchange).subscribe(res=>{

              })
            });
          }

          this.temp2.items=[]
          this.userService.addUsers(this.temp2).subscribe(res =>{

          console.log(res);
          this.ngOnInit();
          this.showCheckout=false;
            // this.dataSource = new MatTableDataSource<any[]>(this.temp2.items);
          })
        })
      }
  
  }
}
