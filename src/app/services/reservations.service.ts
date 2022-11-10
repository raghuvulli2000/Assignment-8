import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  resData: Array<{"id":string, "name":string, "date":any, "hour":string, "minutes":string, "email":string}> = [];
  changeDataEvent = new EventEmitter<Array<{"id":string, "name":string, "date":any, "hour":string, "minutes":string, "email":string}>>();
  constructor() {

    this.resData = JSON.parse(localStorage.getItem("resData"));
   // console.log(this.resData);

    if(this.resData)
    this.changeDataEvent.emit(this.resData.slice());
    else{
      this.resData = [];
    }
  } 
  appendData(data: {"id":string,  "name":string,"date":any, "hour":string, "minutes":string, "email":string}){
    this.getData();
    this.resData.push(data);
    localStorage.setItem("resData", JSON.stringify(this.resData));
    this.changeDataEvent.emit(this.resData.slice());
  }

findItemForDetail(id:string){
  this.getData();
    var i:number=0;
    for(var item of this.resData){
      if(item.id == id)
        return true;
      i++;
    }
    return false;
  }
  deleteData(id:string){
    this.getData();
    var index = this.resData.findIndex((e) => e.id==id);
    if(index != -1){
      this.resData.splice(index, 1);
      localStorage.setItem("resData", JSON.stringify(this.resData));
       this.changeDataEvent.emit(this.resData.slice());
       return index;
    }
    
  }
  getData(){
    this.resData = JSON.parse(localStorage.getItem("resData"));
   // console.log(this.resData);

    if(this.resData)
    this.changeDataEvent.emit(this.resData.slice());
    else{
      this.resData = [];
    }
  }
}
