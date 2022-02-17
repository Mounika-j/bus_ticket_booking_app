import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookTicketService } from '../services/book-ticket.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-conformation-dialog',
  templateUrl: './conformation-dialog.component.html',
  styleUrls: ['./conformation-dialog.component.scss']
})
export class ConformationDialogComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private toastr: ToastrService, public routes: Router, public busSeatsService: BookTicketService, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,  public dialogRef: MatDialogRef<ConformationDialogComponent>) { }

  public datArr: any = [];
  ngOnInit(): void {
    this.datArr = this.data;
    console.log(this.data);
  }
  // tslint:disable-next-line:typedef
  confirmTicketBooking(){
   if (  this.datArr.bookingObj.seatNo.length > 0){
      this.busSeatsService.saveBookingDetails(this.datArr.bookingObj).subscribe(res => {
        console.log('Booking Details', this.datArr.bookingObj);
        localStorage.setItem('bookingDetails', '');
        this.data.selectedArr = [];
        this.toastr.success('Ticket Booked Sucessfully');
        this.routes.navigateByUrl('/viewBookings');
        this.closeDialog();
      });
    } else {
      this.toastr.error('Please select Seat to Proceed the booking');
      this.routes.navigateByUrl('/busSeats');
      this.dialogRef.close(false);
    }

  }
  // tslint:disable-next-line:typedef
  closeDialog() {
    this.dialogRef.close(false);
  }
}
