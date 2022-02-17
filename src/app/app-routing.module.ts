import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookTicketPageComponent } from './book-ticket-page/book-ticket-page.component';
import { BusSeatsComponent } from './bus-seats/bus-seats.component';
import { ViewTicketListComponent } from './view-ticket-list/view-ticket-list.component';

const routes: Routes = [
  {path: '', component: BookTicketPageComponent},
  {path: 'bookingDetails', component: BookTicketPageComponent},
  {path: 'busSeats', component: BusSeatsComponent},
  {path: 'viewBookings', component: ViewTicketListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
