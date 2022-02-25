import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse} from '@angular/common/http';
import { Observable ,throwError} from 'rxjs';
import { User } from './sign-up/user';
import { Admin } from './Admin';
import { Catagories } from './interface/Catagories';
import { catchError } from 'rxjs/operators';
import { Items } from './interface/Items';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  users:any;
  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
   return this.http.get<User>("http://localhost:8080/api/getUsers").pipe(
    catchError(this.handleError)
  );
    // response.subscribe((data)=>this.users=data)
    // console.log(this.users)
    // return this.users;
    
  }
  getUserByEmail(email:String){
    return this.http.get<User>("http://localhost:8080/api/user/"+email).pipe(
      catchError(this.handleError)
    );;
  }
  addUsers(user:User){
    return this.http.post<User>("http://localhost:8080/api",user).pipe(
      catchError(this.handleError)
    );;
    // response.subscribe((data)=>this.users=data)
  }

  getadmin(admin:String){
    return this.http.get<Admin>("http://localhost:8080/api/admin/"+admin).pipe(
      catchError(this.handleError)
    );;
  }
  getCatagories(){
    return this.http.get<Catagories>("http://localhost:8080/api/getcatagories").pipe(
      catchError(this.handleError)
    );;
  }
  getItemsByCatagory(catagory:String){
    return this.http.get<Items[]>("http://localhost:8080/api/getitems/"+catagory).pipe(
      catchError(this.handleError)
    );;
  }
  deleteUser(email:String){
    return this.http.delete<String>("http://localhost:8080/api/user/delete/"+email).pipe(
      catchError(this.handleError)
    );;
  }
  addcatagory(catagory:Catagories){
    return this.http.post<Catagories>("http://localhost:8080/api/catagory",catagory).pipe(
      catchError(this.handleError)
    );;
  }

  getAllItems():Observable<any>{
    return this.http.get<Items>("http://localhost:8080/api/getAllItems").pipe(
      catchError(this.handleError)
    );;
  }

  addItems(item:Items){
    return this.http.post<Items>("http://localhost:8080/api/items",item).pipe(
      catchError(this.handleError)
    );;
  }

  deleteCategory(catagory :String){
    return this.http.delete<String>("http://localhost:8080/api/catagory/delete/"+catagory).pipe(
      catchError(this.handleError)
    );;
  }
  deleteItems(catagory:String){
    return this.http.delete<String>("http://localhost:8080/api/item/delete/"+catagory).pipe(
      catchError(this.handleError)
    );;
  }

  deleteItem(id:String){
    return this.http.delete<String>("http://localhost:8080/api/item/deleteById/"+id).pipe(
      catchError(this.handleError)
    );;
  }

  getCatagoryByName(name:String):Observable<any>{
    return this.http.get<Items[]>("http://localhost:8080/api/getCatagoryByName/"+name).pipe(
      catchError(this.handleError)
    );;
  }
  edititemsCatagory(old:String,ne:String){
    return this.http.get<Items>("http://localhost:8080/api/itemsCatagoryUpdate/"+old+"/"+ne).pipe(
      catchError(this.handleError)
    );;
  }
  getItemByName(name:String):Observable<any>{
    return this.http.get<Items[]>("http://localhost:8080/api/getitemsByName/"+name).pipe(
      catchError(this.handleError)
    );;
  }


  sendItems(user:User){
    return this.http.post<Items>("http://localhost:8080/api/sendItems",user).pipe(
      catchError(this.handleError)
    );;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
