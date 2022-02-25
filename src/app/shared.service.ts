import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private subject = new Subject<any>();
  private subject2 = new Subject<any>();
  private subject3= new Subject<any>();
  sendClickEvent(){
   
    this.subject.next("");
  }
  sendClickEvent2(){
   
    this.subject2.next("");
  }
  sendClickEvent3(){
   
    this.subject3.next("");
    
  }
  getCliCkEvent():Observable<any>{
   
    return this.subject.asObservable();
  }
  getCliCkEvent2():Observable<any>{
   
    return this.subject2.asObservable();
  }
  getCliCkEvent3():Observable<any>{
   
    return this.subject3.asObservable();
  }
}
