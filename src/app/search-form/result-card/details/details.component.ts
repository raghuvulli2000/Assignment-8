import { Input, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {
 @Input() detailData: any;
 @Input() reviewsData: any;
 filteredData: any[][] = [];
mapOptions: google.maps.MapOptions;
marker;
  constructor(private backendapi: BackendApiService) { }

  ngOnInit(): void {
    console.log(this.detailData.coordinates.latitude);
    this.mapOptions = {
   center: { lat: this.detailData.coordinates.latitude, lng: this.detailData.coordinates.longitude },
   zoom : 14
}
this.marker = {
   position: { lat: this.detailData.coordinates.latitude, lng: this.detailData.coordinates.longitude },
}

     var combine = "";
  var categories = this.detailData.categories;
    for (var i = 0; i < categories.length - 1; i++) {
    combine += categories[i].title + " | ";
  }
  var status = "Closed";
  if(this.detailData.hours[0].is_open_now){
    status = "Open Now"
  }
 

  combine += categories[categories.length - 1].title;
 this.filteredData.push(["Address", this.detailData.location.display_address.join(" ")]);
this.filteredData.push(["Category", combine]);
this.filteredData.push(["Phone", this.detailData.display_phone]);
this.filteredData.push(["Price range", this.detailData.price]);
this.filteredData.push(["Status", status]);
//this.filteredData.push(["Visit Yelp For More", this.detailData.url]);
   console.log(this.filteredData);

  }
filterData(){

}
  goBack(){
    this.backendapi.backEvent.emit();
  }

}
