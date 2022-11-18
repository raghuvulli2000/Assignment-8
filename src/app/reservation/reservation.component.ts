import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../services/reservations.service';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  resData: Array<{"id":string, "name":string, "date":any, "hour":string, "minutes":string, "email":string}> = [];
  constructor(private resService: ReservationsService) { }

  ngOnInit(): void {
    this.resService.getData();
    this.resData = this.resService.resData;
    this.resService.changeDataEvent.subscribe((data:Array<{"id":string,  "name":string,"date":any, "hour":string, "minutes":string, "email":string}>)=>{
      this.resData = this.resService.resData;
  //    console.log(this.resData);
    });
  }

  deleteReservation(id:string){
    
    this.resService.deleteData(id);
    alert("Reservation Cancelled!");

  }



}
