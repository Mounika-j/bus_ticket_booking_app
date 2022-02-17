import { Component, OnInit } from '@angular/core';
import { BookTicketService } from '../services/book-ticket.service';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-view-ticket-list',
  templateUrl: './view-ticket-list.component.html',
  styleUrls: ['./view-ticket-list.component.scss']
})
export class ViewTicketListComponent implements OnInit {

  constructor( public busSeatsService: BookTicketService) { }
  public displayedColumns: string[] = ['date', 'mobileNumber', 'seatNo'];
  public dataSource: any = new MatTableDataSource();
  public bookingDetailsArr: any = [];
  ngOnInit(): void {
    this.bindBookigDetails();
  }
  bindBookigDetails(){
    this.busSeatsService.getBookingDetails().subscribe( res => {
      this.bookingDetailsArr = res;
      this.dataSource = new MatTableDataSource(this.bookingDetailsArr );
      this.dataSource.filterPredicate = (data: any, filter: any) => {
        const localformatDate =  (d: any) => {
          const date = new Date(d);
          if (isNaN(date.getTime())){
              return d;
            }else{
            const month = new Array();
            month[0] = '01';
            month[1] = '02';
            month[2] = '03';
            month[3] = '04';
            month[4] = '05';
            month[5] = '06';
            month[6] = '07';
            month[7] = '08';
            month[8] = '09';
            month[9] = '10';
            month[10] = '11';
            month[11] = '12';
            const day = date.getDate();
            let locDay = '';
            if (day < 10){
                locDay = '0' + day;
              }else {
                locDay = '' + day + '';
              }
            return '' + locDay + '/' + month[date.getMonth()] + '/' + date.getFullYear() + '';
            }
          };
        const locDate = localformatDate(data.date);
        const locMobileNo = data.mobileNumber;

        return locDate.toLowerCase().includes(filter) || locMobileNo.toString().toLowerCase().includes(filter);

        console.log(res, 'resonse');
        };
    });


  }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  // applyFilter(filterValue: string) {
  //   this.dataSource.filterPredicate = filterPeriod;
  // }
  applyFilter(event: any) {
    if (event.keyCode === 32 && event.target.value){
      event.target.value = event.target.value + ' ';
    }
    if (!event.target){
      this.dataSource.filter = '';
    }else{
      this.dataSource.filter = event.target.value.toLowerCase();
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
