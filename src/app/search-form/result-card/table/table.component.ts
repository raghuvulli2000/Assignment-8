import { Input,Component, OnInit } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() tableData: [any];
  constructor(private backendapi: BackendApiService) { }

  ngOnInit(): void {
  }

  toMiles(dist: string){
    return (parseFloat(dist) / 1609.34).toFixed(2)
  }

  viewDetail(id: string){
    
   // console.log(id);
    this.backendapi.fetchIdDetail(id);
  }

}
