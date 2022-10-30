import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  resData: Array<{"id":string, "name":string, "date":any, "time":string, "email":string}> = [];
  changeDataEvent = new EventEmitter<Array<{"id":string, "name":string, "date":any, "time":string, "email":string}>>();
  constructor() {} 
  appendData(data: {"id":string,  "name":string,"date":any, "time":string, "email":string}){
    this.resData.push(data);
    this.changeDataEvent.emit(this.resData.slice());
  }
  findItem(id:string){
    var i:number=0;
    for(var item of this.resData){
      if(item.id == id)
        return i;
      i++;
    }
    return -1;
  }
findItemForDetail(id:string){
    var i:number=0;
    for(var item of this.resData){
      if(item.id == id)
        return true;
      i++;
    }
    return false;
  }
  deleteData(id:string){
    var index:number = this.findItem(id);
   // console.log("index:" + index);
    if(index != -1){
      this.resData.splice(index, 1);
       this.changeDataEvent.emit(this.resData.slice());
       return index;
    }
    
  }
}
