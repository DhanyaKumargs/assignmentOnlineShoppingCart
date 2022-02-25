import { Component, OnInit,ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Catagories } from '../interface/Catagories';
import { UserServiceService } from '../user-service.service';
import { Head, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Items } from '../interface/Items';
import { HeaderComponent } from '../header/header.component';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  isEdit=false;
  loccatagory:any;
  catagories:any;
  clickEventSubsciption:Subscription;
  itemForm:FormGroup;
  displayedColumns: string[] = ['name', 'price', 'stock', 'edit', 'delete'];
  product: any[] = [];
  dataSource = new MatTableDataSource<any>(this.product);
  catagory:Catagories = new Catagories;
  item: Items = new Items;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  categoryForm = this.fb.group({
    catId:['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
  constructor(private SharedService:SharedService,private fb:FormBuilder,private userService:UserServiceService, private route: Router,private hed:HeaderComponent) { 
   
    this.itemForm=fb.group({
    
      name:['',Validators.required],
      description:['' ,Validators.required],
      price:['' ,Validators.required],
      stock:['' ,Validators.required],
      category:['',Validators.required]
    }) 
    
    this.clickEventSubsciption=this.SharedService.getCliCkEvent3().subscribe(res=>{
      this.ngOnInit();
     })
    
  }

  ngOnInit(): void {
    this.userService.getCatagories().subscribe(res =>{
      this.catagories=res;
      
   })
   let temp =JSON.parse(localStorage.getItem('catagoryName')!);
  if(temp==null){
    
  }else{
    this.loccatagory=temp;
      this.userService.getItemsByCatagory(temp).subscribe(res =>{
        this.product=res;
        console.log(res);
          this.dataSource = new MatTableDataSource<any[]>(this.product);
          this.dataSource.paginator = this.paginator;
      })
    }
   console.log(this.loccatagory)
  }
  deleteCategory() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You need to delete user..!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteCategory(this.loccatagory).subscribe(res => {
          console.log(res);
          this.userService.deleteItems(this.loccatagory).subscribe(res => {
            console.log(res);
          })
        })
      this.hed.ngOnInit();
        this.route.navigateByUrl("");
        
      }
    })

  }
  
  addItems(){

  }
tempcat:any;
tempcat2:Catagories=new Catagories;
  editCategory() {
      if(this.categoryForm.value.name==""){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Name cannot be empty',
          showConfirmButton: false,
          timer: 1000,
          
          
        })
      }else{
      Swal.fire({
        title: 'Are you sure?',
        text: "You need to edit user details..!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, edit it!'
      }).then((result) => {
        if (result.isConfirmed){
          console.log(this.loccatagory)
            this.userService.getCatagoryByName(this.loccatagory).subscribe(res =>{
              this.tempcat=res;
            console.log(res)
              // this.tempcat2.name=this.categoryForm.value.name;
              // this.tempcat2.description=this.categoryForm.value.description;
              this.categoryForm.controls['catId'].setValue(this.tempcat.catId);
              let cat = this.categoryForm.value;
              console.log(cat)
              this.userService.addcatagory(cat).subscribe(res =>{
                this.tempcat=res;
                  
                this.userService.edititemsCatagory(this.loccatagory,res.name).subscribe(res =>{
                  console.log("....",this.tempcat.name)
                  localStorage.setItem("catagoryName",JSON.stringify(this.tempcat.name));
                this.loccatagory= this.tempcat.name;
                this.hed.ngOnInit();
                this.ngOnInit();
              window.location.reload();
                  
                })
              })
            
            })

        }
      })
    }
  }
  deleteItem(id:String,name:String){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete Item "+name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.isConfirmed){
        this.userService.deleteItem(id).subscribe(res => {
          console.log(res);
          this.ngOnInit();
        })
       }
    })
  }
  addProduct() {
    if(this.itemForm.controls['name'].value==""){
      Swal.fire({
        position: 'center',
        icon:"error",
        title: "Oops... Item Name can't be empty",
        showConfirmButton: false,
        timer: 1300,
        
        
      })

    }else{
   
    this.item.name = this.itemForm.controls['name'].value;
    this.item.category = this.loccatagory
    this.item.price = this.itemForm.controls['price'].value;
    this.item.stock = this.itemForm.controls['stock'].value;
    this.item.description=this.itemForm.controls['description'].value

    console.log(this.item)
    this.itemForm.reset();
    this.userService.addItems(this.item).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    })
  }
  }
  editForm: FormGroup = this.fb.group({
    category: [''],
    name: [''],
    description: [''],
    price: [''],
    stock: [''],
    itemsId: ['']
  });
  edititem(element:any){
console.log(element.itemsId)
    this.editForm.controls['category'].setValue(element.category);
    this.editForm.controls['itemsId'].setValue(element.itemsId);
    this.editForm.controls['name'].setValue(element.name);
    this.editForm.controls['description'].setValue(element.description);
    this.editForm.controls['price'].setValue(element.price);
    this.editForm.controls['stock'].setValue(element.stock);
    this.isEdit=true;
    
  }
  notedit(){
    this.isEdit=false;
  }
  updateProduct(){

    if(this.editForm.value.name==""){
      Swal.fire({
        position: 'center',
        icon:"error",
        title: "Oops... Item Name can't be empty",
        showConfirmButton: false,
        timer: 1300,
      })
    }else{
      let itemupate = this.editForm.value;
      this.editForm.reset();
      this.userService.addItems(itemupate).subscribe(res => {
        console.log(res);
      window.location.reload();
      });
    }
 
  }
}

