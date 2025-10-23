import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  http = inject(HttpClient);

  getBookings() {
    return this.http.get(`https://freeapi.miniprojectideas.com/api/CarRentalApp/geAllBookings`);
  }

  getAllCars() {
    return this.http.get(`https://freeapi.miniprojectideas.com/api/CarRentalApp/GetCars`);
  }

}
