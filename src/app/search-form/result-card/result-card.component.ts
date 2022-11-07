import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent implements OnInit {
  loadTable: boolean = false;
  loadDetail: boolean = false;
  businessData: [any];
  detailData:any;
  reviewsData:[];
  @ViewChild("resultCard") resCard: ElementRef;
  constructor(private backendApi: BackendApiService) { }

  ngOnInit(): void {
    this.backendApi.dataFetched.subscribe((data)=>{
      this.loadDetail = false;
      this.loadTable = true;
      this.businessData = data;
      console.log("In result-card");
      console.log(this.businessData);
     
    });

 
    this.backendApi.detailsFetched.subscribe((data)=>{
       this.loadTable = false;
      this.loadDetail = true;
      this.detailData = data;
      console.log("In result-card details fetched into parent")
      console.log(this.detailData);
      setTimeout(() => {
         this.backendApi.gotDataEvent.emit();
      }, 1);
     
    });
    this.backendApi.reviewsFetched.subscribe((data:any)=>{
      this.reviewsData = data;
      console.log("In result-card details fetched into parent")
      console.log(this.reviewsData);
    })
    this.backendApi.backEvent.subscribe(()=>{
      this.loadDetail = false;
      this.loadTable = true;
    })
    this.backendApi.clearEvent.subscribe(()=>{
      this.loadTable = false;
      this.loadDetail = false;
    })
  }


 

}
