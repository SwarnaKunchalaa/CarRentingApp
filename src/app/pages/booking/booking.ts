import { Component, inject } from '@angular/core';
import { BookingModel } from '../../model/booking';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class Booking {

  newBookingObj: BookingModel;

  http = inject(HttpClient);

  constructor() {
    this.newBookingObj = new BookingModel();
  }

  onSaveBooking() {
    this.http.post(`https://freeapi.miniprojectideas.com/api/CarRentalApp/CreateNewBooking`, this.newBookingObj)
      .subscribe((res: any) => {
        if (res.result) {
          alert("Booking saved successfully");
        } else {
          alert("Failed to save booking: " + res.message);
        }
      });

  }
}
