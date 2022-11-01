import { Input, Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { ReservationsService } from 'src/app/services/reservations.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {
  	closeResult = '';
@ViewChild('email') emailIp:NgbModal;
@ViewChild('date') dateIp:NgbModal;
 @Input() detailData: any;
 @Input() reviewsData: any;
 filteredData: any[][] = [];
mapOptions: google.maps.MapOptions;
marker;
openModalInstance:any;
resformData:{"id":string, "name":string,"date":any, "time":string, "email":string};
  constructor(private backendapi: BackendApiService, private modalService: NgbModal, private resService: ReservationsService) { }

  ngOnInit(): void {
    console.log(this.detailData.coordinates.latitude);
    this.mapOptions = {
   center: { lat: this.detailData.coordinates.latitude, lng: this.detailData.coordinates.longitude },
   zoom : 14
}
this.marker = {
   position: { lat: this.detailData.coordinates.latitude, lng: this.detailData.coordinates.longitude },
}
  if(this.detailData.location && this.detailData.location.display_address){
 this.filteredData.push(["Address", this.detailData.location.display_address.join(" ")]);
  }
  if(this.detailData.categories){
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
//this.filteredData.push(["Visit Yelp For More", this.detailData.url]);
   console.log(this.filteredData);

   this.resformData = {
  "id": this.detailData.id,
  "name": this.detailData.name,
  "date":"",
  "time":"",
  "email":"",
};
  }
filterData(){

}
  goBack(){
    this.backendapi.backEvent.emit();
  }


	open(content) {
    this.openModalInstance = content;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
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
    validate(form1: NgForm){
   console.log(form1);
   if(form1.form.status === "VALID"){
    
  console.log(this.resformData);
  this.resService.appendData(this.resformData);
  alert("Reservation Created!");
  this.modalService.dismissAll()
   }
   else{
    
   const invalidElement = document.querySelectorAll('.ng-invalid')[1];
  (<HTMLInputElement>invalidElement).focus();
  if((<HTMLInputElement>invalidElement).name == "email" || (<HTMLInputElement>invalidElement).name == "date"){
    this.resformData[(<HTMLInputElement>invalidElement).name] = "";
  }
   }
  }

}


