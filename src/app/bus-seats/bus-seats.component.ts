import { element } from 'protractor';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookTicketService } from '../services/book-ticket.service';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { ConformationDialogComponent } from '../conformation-dialog/conformation-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-bus-seats',
  templateUrl: './bus-seats.component.html',
  styleUrls: ['./bus-seats.component.scss']
})
export class BusSeatsComponent implements OnInit {

  constructor(public busSeatsService: BookTicketService, public dialog: MatDialog, ) { }
  public seatedChecked = false;
  public selectedArr: any = [];
  public SeatListArr: any = [];
  public errorMsg = '';
  public enableErrorMsg = false;
  public getBookingDetails: any;
  public bookingId = '';
  public totalSeatArr = [];
  public updatedSeatObj: any = [];
  ngOnInit(): void {
    this.getBookingDetails =  localStorage.getItem('bookingDetails');
    this.getBookingDetails = JSON.parse(this.getBookingDetails);
    this.selectedArr = [];
    this.bindSeats();
    this.bookingId = uuidv4();
  }
  // tslint:disable-next-line:typedef
  bindSeats(){
    this.getBookingDetails.dateVal = moment(this.getBookingDetails.dateVal).format('DD/MM/YYYY');
    // tslint:disable-next-line:no-
    this.busSeatsService.getSeatsList().subscribe(
      res => {
        this.totalSeatArr = res;
        // tslint:disable-next-line:no-shadowed-variable
        this.totalSeatArr.forEach((element: any) => {
          if (element.selectedDate === this.getBookingDetails.dateVal) {
            this.SeatListArr.push(element);
          }
        });

      }
    );
  }

  // tslint:disable-next-line:typedef
  ConfirmBooking(){
    this.updatedSeatObj[0].seatsArr.forEach((Ele: any) => {
    // tslint:disable-next-line:no-shadowed-variable
    this.selectedArr.forEach((element: any , index: any) => {
      // debugger
      if (element.seatedChecked) {
        element.enableChecked = true;
      }
      if (Ele.id === element.id) {
        Ele.enableChecked = true;

      }
    });

  });
    this.serviceCallBack(this.updatedSeatObj[0]);

    const bookingObj = {
     date: this.getBookingDetails.dateVal,
     seatNo: this.selectedArr,
     mobileNumber: this.getBookingDetails.mobileVal,
     bookingId: this.bookingId
    };
    const dialogRef = this.dialog.open(ConformationDialogComponent, {
      width: '550px',
      panelClass: '',
      data: {bookingObj,  selectedArr: this.selectedArr}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
  // tslint:disable-next-line:no-shadowed-variable
  // tslint:disable-next-line:typedef
  showOptions(eventVal: any, element: any, item: any, parentIndex: any) {
    // if(this.selectedArr.length <= 6) {


      this.errorMsg = '';
      this.enableErrorMsg = false;

      element.seatsArr.forEach((innerItem: any) => {
        if (innerItem.id === item.id) {
          if (eventVal.checked) {
            item.seatedChecked = true;
            innerItem.seatedChecked = true;
            this.selectedArr.push(innerItem);
            // this.displaySeatArr.push(innerItem);
          } else {

            const index = this.selectedArr.indexOf(innerItem);
            if (index > -1) {
              // item.enableChecked = false;
              item.seatedChecked = false;
              // this.serviceCallBack(item);
              this.selectedArr.splice(index, 1);
            }
          }
        }

      });
      this.updatedSeatObj[parentIndex] = element;
      console.log('selectedArr', this.selectedArr);
  }
  // tslint:disable-next-line:typedef
  serviceCallBack(item: any ){
    // tslint:disable-next-line:no-debugger
    debugger;
    this.busSeatsService.editSaetSelection(item).subscribe(
      res => {
        this.bindSeats();
        // this.SeatListArr = res;
      }
    );
  }
}
