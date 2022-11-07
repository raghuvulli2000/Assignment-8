import { Input,Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() tableData: [] = [];
  @ViewChild("table") table: ElementRef;
  constructor(private backendapi: BackendApiService) { }

  ngOnInit(): void {
    console.log(this.tableData);
    console.log(this.tableData.length);

  }
//  ngAfterViewChecked(): void {
//         this.table.nativeElement.scrollIntoView();
//   }
ngOnChanges(): void {
    console.log("In result-card onChanges");
    setTimeout(() => {
        this.table.nativeElement.scrollIntoView();
    }, 1);
     //   this.table.nativeElement.scrollIntoView();

  
  }

  toMiles(dist: string){
    return (parseFloat(dist) / 1609.34).toFixed(2)
  }

  viewDetail(id: string){
    
   // console.log(id);
    this.backendapi.fetchIdDetail(id);
  }

}
