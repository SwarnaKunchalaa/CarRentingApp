import { Component, inject, OnInit } from '@angular/core';
import { BookingModel } from '../../model/booking';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from '../../service/booking-service';
import { Customer } from '../customer/customer';
import { CarModel } from '../../model/car';

@Component({
  selector: 'app-booking',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class Booking implements OnInit {

  newBookingObj: BookingModel;

  bookingList: BookingModel[] = [];

  http = inject(HttpClient);

  carList: CarModel[] = [];
  bookingsList: BookingModel[] = [];
  bookingService = inject(BookingService);
  bookingForm: FormGroup = new FormGroup({
    customerName: new FormControl(''),
    customerCity: new FormControl(''),
    mobileNo: new FormControl(''),
    email: new FormControl(''),
    // bookingId: new FormControl(''),
    carId: new FormControl(''),
    bookingDate: new FormControl(''),
    discount: new FormControl(''),
    totalBillAmount: new FormControl(''),
  })

  constructor() {
    this.newBookingObj = new BookingModel();
  }

  ngOnInit(): void {
    this.getCarList();
    this.getBookings();
  }

  getCarList() {
    this.bookingService.getAllCars().subscribe((res: any) => {
      this.carList = res.data;
    });
  }

  getBookings() {
    this.bookingService.getBookings().subscribe((res: any) => {
      this.bookingsList = res.data;
    });
  }

  getAllBookings() {
    this.http.get('https://freeapi.miniprojectideas.com/api/CarRentalApp/geAllBookings')
      .subscribe((res: any) => {
        this.bookingList = res.data;
      })
  }

  onSaveBooking() {
    const bookingData = this.bookingForm.value;
    this.http.post(`https://freeapi.miniprojectideas.com/api/CarRentalApp/CreateNewBooking`, this.bookingForm.value)
      .subscribe((res: any) => {
        if (res.result) {
          alert("Booking saved successfully");
        } else {
          alert("Failed to save booking: " + res.message);
        }
      });

  }
}
