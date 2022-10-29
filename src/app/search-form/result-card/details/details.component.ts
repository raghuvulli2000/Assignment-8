import { Input, Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
 @Input() detailData: {};
  constructor(private backendapi: BackendApiService) { }

  ngOnInit(): void {
  }

}
