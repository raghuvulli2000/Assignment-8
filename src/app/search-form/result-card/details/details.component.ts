import { Input, Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { NgbModal, ModalDismissReasons, NgbCarousel,  NgbSlideEventSource  } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormArray, Validators, NgForm, NgModel } from '@angular/forms';
import { ReservationsService } from 'src/app/services/reservations.service';
import {MatIconModule} from '@angular/material/icon'
import { DataSource } from '@angular/cdk/collections';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {
  load: boolean = false;
  minDate: string;
  	closeResult = '';
    @ViewChild('detailComponent') detailComponent:ElementRef;
@ViewChild('email') emailIp:NgbModal;
@ViewChild('date') dateIp:NgbModal;
@ViewChild('carousel') carousel: NgbCarousel;
 @Input() detailData: any;
 @Input() reviewsData: any;
 cycle: boolean = false;  
 filteredData: any[][] = [];
 smallScreenFilterData: any[][] = [];
 hours: any = [10,11,12,13,14,15,16,17];
mins: any = ["00","15","30","45"];
mapOptions: google.maps.MapOptions;
marker;
openModalInstance:any;
status_style : any =  {"color": "red"};
resformData:{"id":string, "name":string,"date":any, "hour":string, "minutes":string, "email":string};
  constructor(private backendapi: BackendApiService, private modalService: NgbModal, private resService: ReservationsService) { }

  ngOnInit(): void {
  this.minDate = new Date().toISOString().split("T")[0];
  console.log(this.minDate);
  this.backendapi.gotDataEvent.subscribe(()=>{
    console.log("Observed in Detail Component on detail data");
     // this.backendapi.recieveDataInDetailComponent.subscribe(()=>{
    //   console.log("recieveEvent Emitted");
    // console.log(this.detailData);
    // console.log(this.reviewsData);
    // console.log("photos:" + this.detailData.photos.length);
    // console.log(this.detailData.coordinates.latitude);
    // });
    this.filteredData = [];
    this.smallScreenFilterData = [];
    this.load = true;
   setTimeout(() => {
   // console.log(this.detailComponent.nativeElement);
   this.detailComponent.nativeElement.scrollIntoView();
   console.log(this.detailData.photos)
   if(this.detailData.photos.length !== 0)
      this.carousel.pause();
   }, 2);
    this.mapOptions = {
   center: { lat: this.detailData.coordinates.latitude, lng: this.detailData.coordinates.longitude },
   zoom : 14
}
this.marker = {
   position: { lat: this.detailData.coordinates.latitude, lng: this.detailData.coordinates.longitude },
}
  
//this.filteredData.push(["Visit Yelp For More", this.detailData.url]);
   console.log(this.filteredData);


this.filterData();


this.smallScreenData();
   this.resformData = {
  "id": this.detailData.id,
  "name": this.detailData.name,
  "date":"",
  "hour":"",
  "minutes":"",
  "email":"",
};
  });
    this.backendapi.backEvent.subscribe(()=>{
      console.log("observed back press in detail component");
    })
   
  }


filterData(){
if(this.detailData.location && this.detailData.location.display_address){
 this.filteredData.push(["Address", this.detailData.location.display_address.join(" ")]);
 
  }
  if(this.detailData.categories && this.detailData.categories.length !== 0){
         var combine = "";
  var categories = this.detailData.categories;
    for (var i = 0; i < categories.length - 1; i++) {
    combine += categories[i].title + " | ";
   
  }
 combine += categories[categories.length - 1].title;
this.filteredData.push(["Category", combine]);
  }
    var status = "Closed";
  if(this.detailData.hours && this.detailData.hours[0].is_open_now){
    status = "Open Now"
 
  }
  if(this.detailData.display_phone)
this.filteredData.push(["Phone", this.detailData.display_phone]);
if(this.detailData.price){
this.filteredData.push(["Price range", this.detailData.price]);
}
this.filteredData.push(["Status", status]);
}


smallScreenData(){
  if(this.detailData.location && this.detailData.location.display_address){
 this.smallScreenFilterData.push(["Address", this.detailData.location.display_address.join(" ")]);
 
  }
   if(this.detailData.display_phone)
this.smallScreenFilterData.push(["Phone", this.detailData.display_phone]);

    var status = "Closed";
  if(this.detailData.hours && this.detailData.hours[0].is_open_now){
    status = "Open Now"
 
  }
  this.smallScreenFilterData.push(["Status", status]);
  if(this.detailData.categories && this.detailData.categories.length !== 0){
         var combine = "";
  var categories = this.detailData.categories;
    for (var i = 0; i < categories.length - 1; i++) {
    combine += categories[i].title + " | ";
   
  }
 combine += categories[categories.length - 1].title;
this.smallScreenFilterData.push(["Category", combine]);
  }

 
if(this.detailData.price){
this.smallScreenFilterData.push(["Price range", this.detailData.price]);
}

}



  goBack(){
    this.backendapi.backEvent.emit();
  }


	open(content) {
    this.openModalInstance = content;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',  
      backdrop : 'static',
      keyboard : false,
    
} ).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
  find_res(){
    return this.resService.findItemForDetail(this.detailData.id);
  }
  cancelReservation(){
   this.resService.deleteData(this.detailData.id);
   alert("Reservation Cancelled!")
  }
    validate(form1: NgForm, email:NgModel){
   console.log(form1);
   console.log(email);
   if(form1.form.status === "VALID"){
    
  console.log(this.resformData);
  this.resService.appendData(this.resformData);
  alert("Reservation Created!");
  this.modalService.dismissAll()
   }
   else{
  //  const invalidElement = document.querySelectorAll('.ng-invalid')[1];
  // (<HTMLInputElement>invalidElement).focus();
  // if((<HTMLInputElement>invalidElement).name == "email" || (<HTMLInputElement>invalidElement).name == "date"){
  //   this.resformData[(<HTMLInputElement>invalidElement).name] = "";
  // }
   }
  }

  getDetailData(){
    if(window.innerWidth < 600){
      return this.smallScreenFilterData
    }
    return this.filteredData;
  }
  ngAfterViewInit() {
    
    
  }
 // console.log(this.carousel);
onSlideClicked(crrSlide: any){
  console.log("Clicked");
  console.log(crrSlide);
 if(!this.cycle){
 this.carousel.cycle();
 this.cycle = true;
 }

 else{
  this.carousel.pause();
  console.log("paused");
  setTimeout(() => {
    this.carousel.cycle();
    console.log("started");
  }, 3000);
 }
 
}

carSlide(slideEvent: any){
  // if(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT){
  //   this.carousel.cycle();
  //   console.log("slide with arrow");
  // }
}



  getColor(item: string){
    
   // console.log("item:" + item);
    if(item === "Status" && this.detailData.hours && this.detailData.hours[0].is_open_now){
      return "green";
    }
    else if(item === "Status"){
      return "red";
    }
    else{
      return "";
    }
  }
}


