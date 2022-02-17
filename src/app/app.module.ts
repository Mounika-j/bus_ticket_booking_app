import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookTicketPageComponent } from './book-ticket-page/book-ticket-page.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { formatDate } from '@angular/common';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { BusSeatsComponent } from './bus-seats/bus-seats.component';
import { ConformationDialogComponent } from './conformation-dialog/conformation-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { ViewTicketListComponent } from './view-ticket-list/view-ticket-list.component';
import { MatTableModule } from '@angular/material/table';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'short', year: 'numeric', day: 'numeric' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' }
  }
};

export class PickDateAdapter extends NativeDateAdapter {
  // tslint:disable-next-line:ban-types
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MM-yyyy', this.locale);
    } else {
      return super.format(date, displayFormat);
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    BookTicketPageComponent,
    BusSeatsComponent,
    ConformationDialogComponent,
    ViewTicketListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    MatTableModule
  ],
  exports: [MatFormFieldModule,MatInputModule, MatDatepickerModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
