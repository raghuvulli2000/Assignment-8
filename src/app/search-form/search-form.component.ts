import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged } from 'rxjs/operators';
import { BackendApiService } from '../services/backend-api.service'; 
@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  isLoading = false;
  options: string[] = [];
  searchForm: FormGroup;
  longitude: string;
  latitude: string;
  @ViewChild('locationField') loc:ElementRef;

  constructor(private http: HttpClient, private backendApi: BackendApiService) { }

  ngOnInit(): void {

    this.initForm();


  //   console.log(this.searchForm);
  //   console.log(this.searchForm.get("keyword"));
  //      this.searchForm.get("keyword").valueChanges.subscribe((data) => {
  //   console.log(data);
  //  })


     this.searchForm.get("keyword").valueChanges
      .pipe(
        filter(res => {
          this.options = [];
          return res !== null && (res.length == 0 || res.length >= 2)
        }),
        distinctUntilChanged(),
        debounceTime(1000),
          tap(() => {
         
          this.options = [];
          this.isLoading = true;
        }),
        //https://second-python-flask-8639972999.wl.r.appspot.com/route?term=biryani&latitude=33.8658484&longitude=-118.0831212&radius=16093&category=food
        switchMap(value => this.http.get('http://localhost:3000/options?id=' + value, {
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${'1Qfvd-mBsP9XSvBJ8L3aAHDRYxp2owcYjtvu8JgvxI3mM_Jf7iukKAWwHt-0vfNkCFUV7CGKk2y_izbfNIIoI-j16ej7SR7efBnig2XMczkSCijr3jerfbXMKlw3Y3Yx'}`,
  }
})
  .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )   
      )
      .subscribe((data: any) => {
        console.log(data);

        for(let category in data.categories)
        this.options.push(data.categories[category].title)
        for(let term in data.terms)
        this.options.push(data.terms[term].text)
      
       console.log(this.options);
      });  


        this.searchForm.get('category').valueChanges.subscribe((data)=>console.log(data));
    this.searchForm.get('distance').valueChanges.subscribe((data)=>console.log(data));
     //  this.searchForm.get('location').valueChanges.subscribe((data)=>console.log(data));
          this.searchForm.get('checkbox').valueChanges.subscribe((data)=>{
            console.log(data)
            if(data){
              this.searchForm.get('location').disable();
              this.loc.nativeElement.value = "";
              this.http.get("https://ipinfo.io/?token=5c0e5f4b3c703a").subscribe((data:any)=>{
              this.latitude = data.loc.split(",")[0];
              
              // this.latitude = points[0];
               this.longitude = data.loc.split(",")[1];
               console.log(this.latitude);
               console.log(this.longitude);
              })
            }
            else
            {
              this.searchForm.get('location').enable();
            }
          });
  }
  private initForm(){
        this.searchForm = new FormGroup({
      'keyword': new FormControl("", Validators.required),
      'distance': new FormControl("", Validators.required),
      'category': new FormControl("All", Validators.required),
      'location': new FormControl("", Validators.required),
      'checkbox': new FormControl("", Validators.required)
    });
  }
  onLocationBlur(value){
    console.log(value);
    var apiKey: string = "AIzaSyAhACUFKciRtELjw59DxRj6NKjg2P-kfH0";
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      value +
      "&key=AIzaSyAhACUFKciRtELjw59DxRj6NKjg2P-kfH0";
      this.http.get(url, {
  headers: {
    'Accept': 'application/json',
  }
}).subscribe((data: any) => {
  console.log(data.results[0].geometry.location);
    this.longitude =  data.results[0].geometry.location.lng;
    this.latitude = data.results[0].geometry.location.lat;
    console.log(this.latitude);
     console.log(this.longitude);
})

  }
  onSubmit() {
    setTimeout(() => {
      var data: {"term": string, "radius": string, "latitude": string, "longitude":string, "category":string} = {
      "latitude": this.latitude,
      "longitude": this.longitude,
      "term": this.searchForm.get('keyword').value,
      'radius': Math.round(parseFloat(this.searchForm.get('distance').value) * 1609.34) + "",
      "category" : this.searchForm.get("category").value
    }
    this.backendApi.fetchFormData(data);
    }, 500);
    

  }
  onClear(){
    this.searchForm.reset({'category':'All'});
    this.backendApi.clearEvent.emit();
  }

}
