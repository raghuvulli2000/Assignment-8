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
    return 0;
  }

  deleteData(id:string){
    var index:number = this.findItem(id);
    if(index != 0){
      this.resData.splice(index, 1);
       this.changeDataEvent.emit(this.resData.slice());
    }
  }
}
