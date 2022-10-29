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
  }

  goBack(){
    this.backendapi.backEvent.emit();
  }

}
