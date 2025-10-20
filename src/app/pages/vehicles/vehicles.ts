import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { APIResponse, CarModel } from '../../model/car';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  imports: [FormsModule],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css'
})
export class Vehicles {
  newCarObj: CarModel;
  carList: CarModel[] = [];
  // newUserObj: UserModel;

  http = inject(HttpClient);

  constructor() {
    this.newCarObj = new CarModel();
    // this.newUserObj = new UserModel();
  }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.http.get<APIResponse>(`https://freeapi.miniprojectideas.com/api/CarRentalApp/GetCars`)
      .subscribe((res: APIResponse) => {
        this.carList = res.data;
      });
  }

  onEdit(car: CarModel) {
    this.newCarObj = car;



  }

  onUpdateCar() {

    this.http.put<APIResponse>(`https://freeapi.miniprojectideas.com/api/CarRentalApp/UpdateCar`, this.newCarObj)
      .subscribe((res: APIResponse) => {
        if (res.result) {
          alert("Car updated successfully");
        }
        else {
          alert("Failed to update car: " + res.message);
        }
      })
    this.newCarObj = new CarModel();
  }

  onSaveCar() {
    //debugger;
    this.http.post<APIResponse>(`https://freeapi.miniprojectideas.com/api/CarRentalApp/CreateNewCustomer`, this.newCarObj)
      .subscribe((res: APIResponse) => {
        if (res.result) {
          alert("Car added successfully");
        } else {
          alert("Failed to add car: " + res.message);
        }
      });
    // next: (result) => {
    //   alert("user created successfully")
    // },
    // error: (error) => {
    //   alert("error - " + error)
    // }
    // })
  }

}
