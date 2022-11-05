import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  businessData: [any];
  dataFetched = new EventEmitter<[any]>();
  clearEvent = new EventEmitter();
  detailsFetched = new EventEmitter<any>();
  reviewsFetched = new EventEmitter<[any]>();
  backEvent = new EventEmitter();
  //server: string = "https://angular-node-business-app.wl.r.appspot.com/options?id=";
  server: string = "https://angular-node-business-app.wl.r.appspot.com/options?id=";

  constructor(private http: HttpClient) { }

  fetchFormData(data: {"term": string, "radius": string, "latitude": string, "longitude":string, "category":string}){
    console.log("Fetch Worked");
    console.log(data);
    var searchParams = new URLSearchParams(data);
    var uri = "https://angular-node-business-app.wl.r.appspot.com" + "/route?" + searchParams.toString();
    console.log(uri);
    this.http.get(uri).subscribe((data:any)=>{
     // console.log(data.businesses)
      this.businessData = data.businesses;
      console.log(this.businessData);
      this.dataFetched.emit(this.businessData);
    })
  }


  fetchOptions(id){
    console.log("Fetching Options");
    return this.http.get(this.server + id);

  }


  fetchIdDetail(id: string){
    
    console.log(id);
    var trl = "https://angular-node-business-app.wl.r.appspot.com" + "/businessid?id=" + id;
    console.log(trl);
    this.http.get(trl).subscribe((data)=>{
      console.log(data);
      this.detailsFetched.emit(data);
    });
    var prl = "https://angular-node-business-app.wl.r.appspot.com" + "/businessid?id=" + id + "/reviews";
    console.log(prl);
    this.http.get(prl).subscribe((data:any)=>{
      console.log(data.reviews);
      this.reviewsFetched.emit(data.reviews);
    })
  }

}
