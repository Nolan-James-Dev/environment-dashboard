import {Component, effect, inject, OnInit, signal} from '@angular/core';
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
export class BookingComponent implements OnInit {
  bookingService = inject(BookingService);
  // bookings = signal<Booking[]>([]);
  bookingsByEnvironment: GroupedEnvironments[] = [];
  date = moment(new Date()).format('Do MMMM YYYY');

  bookings: Booking[] | undefined;
  selectedDay: Booking[] | undefined

  constructor() {
    this.listenBookingsCurrentDay();
    this.listenBookingsForSelectedDay();
    // this.loadBookingsForCurrentDay();
  }

  ngOnInit(): void {
    this.getBookingsForCurrentDay();
  }

  updateDate() {
    this.date = moment(this.date).format('Do MMMM YYYY');
    this.getBookingsForSelectedDay(this.date);
    this.selectedDay = this.bookingService.allBookingsBySelectedDay().value;
    // this.loadBookingsForSelectedDay(this.date);
  }

  private getBookingsForCurrentDay() {
    this.bookingService.getBookingsByCurrentDay();
  }

  private getBookingsForSelectedDay(date: string) {
    const requestDate = moment(date, "Do MMMM YYYY").format("yyyy-MM-DD");
    this.bookingService.getBookingsBySelectedDay(requestDate);
  }

  weekdayFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  private groupBookings() {
    const group = this.bookings?.reduce((acc: any, booking) => {
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
  }

  groupBookingsOnSelectedDay() {
    const group = this.selectedDay?.reduce((acc: any, booking) => {
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
  }

  private listenBookingsCurrentDay() {
    effect(() => {
      const allBookingsForCurrentDay = this.bookingService.allBookingsByCurrentDay().value;
      if (allBookingsForCurrentDay) {
        this.bookings = allBookingsForCurrentDay;
        this.groupBookings();
      }
    });
  }

  private listenBookingsForSelectedDay() {
    effect(() => {
      const allBookingsForSelectedDay = this.bookingService.allBookingsBySelectedDay().value;
      if (allBookingsForSelectedDay) {
        this.selectedDay = allBookingsForSelectedDay;
        this.groupBookingsOnSelectedDay();
      }
    });

  }
}
