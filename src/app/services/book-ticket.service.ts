import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json; charset=UTF-8',
      // tslint:disable-next-line:object-literal-key-quotes
      // 'access_token': idToken
    }
  )
};
@Injectable({
  providedIn: 'root'
})

export class BookTicketService {
 baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }


  getSeatsList(): Observable<any> {
    return this.http.get(this.baseUrl + '/listofSeats');
  }

  editSaetSelection(item: any): Observable<any> {
    return this.http.put(this.baseUrl + '/listofSeats/' + item.id  , item, httpOptions );
  }

  saveBookingDetails(bookingDetails: any): Observable<any> {
    return this.http.post(this.baseUrl + '/bookingDetails', bookingDetails, httpOptions );
  }
  getBookingDetails() {
    return this.http.get(this.baseUrl + '/bookingDetails')
  }
}
