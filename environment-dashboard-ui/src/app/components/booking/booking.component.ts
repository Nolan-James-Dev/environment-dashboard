import {Component, inject, signal} from '@angular/core';
import {BookingService} from "../../services/booking/booking.service";
import {Booking} from "../../models/Booking.model";
import {NgForOf} from "@angular/common";
import {EnvironmentComponent} from "../environment/environment.component";
import {GroupedEnvironments} from "../../models/GroupedEnvironments.model";
import moment from "moment/moment";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    NgForOf,
    EnvironmentComponent,
    MatFormField,
    MatNativeDateModule,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    FormsModule,
    MatHint,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
  ],
  providers: [MatDatepickerModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  bookingService = inject(BookingService);
  bookings = signal<Booking[]>([]);
  bookingsByEnvironment: GroupedEnvironments[] = [];
  date = moment(new Date()).format('Do MMMM YYYY');

  constructor() {
    this.loadBookingsForCurrentDay();
  }

  private async loadBookingsForCurrentDay() {
    try {
      const bookings = await this.bookingService.getBookingsForCurrentDay();

      const group = bookings.reduce((acc: any, booking) => {
        let key = booking.environment;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(booking);
        return acc;
      }, {});

      this.bookingsByEnvironment = Object.keys(group).map(key => ({
        environment: key,
        bookings: group[key]
      }));
      this.bookings.set(bookings);
    } catch (err) {
      console.log(err);
    }
  }

  private async loadBookingsForSelectedDay(date: string) {
    const requestDate = moment(date, "Do MMMM YYYY").format("yyyy-MM-DD");
    const bookings = await this.bookingService.getBookingsForSelectedDay(requestDate);

    const group = bookings.reduce((acc: any, booking) => {
      let key = booking.environment;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(booking);
      return acc;
    }, {});

    this.bookingsByEnvironment = Object.keys(group).map(key => ({
      environment: key,
      bookings: group[key]
    }));
    this.bookings.set(bookings);
  }

  weekdayFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  updateDate() {
    this.date = moment(this.date).format('Do MMMM YYYY');
    this.loadBookingsForSelectedDay(this.date);
  }


}
