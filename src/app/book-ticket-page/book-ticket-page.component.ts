import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-book-ticket-page',
  templateUrl: './book-ticket-page.component.html',
  styleUrls: ['./book-ticket-page.component.scss']
})
export class BookTicketPageComponent implements OnInit {

  constructor(public routes: Router) { }
  public bookTicketObj = {
    dateVal: '',
    mobileVal:  ''
  };
public errorMsg = '';
public enableErrorMsg = false;
currentDate = '';
  events: string[] = [];
  ngOnInit(): void {
    // this.currentDate = new Date();

    this.currentDate = moment().format('MM/DD/YYYY');
  }

  // tslint:disable-next-line:typedef
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }
  // tslint:disable-next-line:typedef
  bookingSave() {
    if (this.bookTicketObj.dateVal !== '' && this.bookTicketObj.mobileVal !== '') {
      this.errorMsg = '';
      this.enableErrorMsg = false;
      localStorage.setItem('bookingDetails', JSON.stringify(this.bookTicketObj));
      debugger
      this.routes.navigateByUrl('/busSeats');
    } else {
      this.errorMsg = 'PLease all manditory fields';
      this.enableErrorMsg = true;
    }
  }

  // Listen for input event on numInput.

  // tslint:disable-next-line:typedef
  allowNumberonly(evt: any){
    evt = (evt) ? evt : window.event;
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.errorMsg = 'Please Enter valid mobile numbeer';
      this.enableErrorMsg = true;
      return false;

    }
    return true;
  }
}
