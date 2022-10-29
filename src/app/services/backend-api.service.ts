import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  businessData: [any];
  dataFetched = new EventEmitter<[any]>();
  clearEvent = new EventEmitter();
  detailsFetched = new EventEmitter<{}>();

  constructor(private http: HttpClient) { }

  fetchFormData(data: {"term": string, "radius": string, "latitude": string, "longitude":string, "category":string}){
    console.log("Fetch Worked");
    console.log(data);
    var searchParams = new URLSearchParams(data);
    var uri = "http://localhost:5000" + "/route?" + searchParams.toString();
    console.log(uri);
    this.http.get(uri).subscribe((data:any)=>{
     // console.log(data.businesses)
      this.businessData = data.businesses;
      console.log(this.businessData);
      this.dataFetched.emit(this.businessData);
    })
  }

  fetchIdDetail(id: string){
    
    console.log(id);
    var trl = "http://localhost:5000" + "/businessid?id=" + id;
    console.log(trl);
    this.http.get(trl).subscribe((data)=>{
      console.log(data);
      this.detailsFetched.emit(data);
    });
  }

}
