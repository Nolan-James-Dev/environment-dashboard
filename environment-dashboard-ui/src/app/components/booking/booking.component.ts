import {Component, inject, signal} from '@angular/core';
import {BookingService} from "../../services/booking/booking.service";
import {Booking} from "../../models/Booking.model";
import {NgForOf} from "@angular/common";
import {EnvironmentComponent} from "../environment/environment.component";
import {GroupedEnvironments} from "../../models/GroupedEnvironments.model";

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    NgForOf,
    EnvironmentComponent
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  bookingService = inject(BookingService);

  bookings = signal<Booking[]>([]);
  bookingsByEnvironment: GroupedEnvironments[] = [];

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
}
