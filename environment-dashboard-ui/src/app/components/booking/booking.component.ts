import {Component, inject, signal} from '@angular/core';
import {BookingService} from "../../services/booking/booking.service";
import {Booking} from "../../models/Booking.model";
import {NgForOf} from "@angular/common";
import {EnvironmentComponent} from "../environment/environment.component";

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

  constructor() {
    this.loadBookingsForCurrentDay();
  }

  private async loadBookingsForCurrentDay() {
    try {
      const bookings = await this.bookingService.getBookingsForCurrentDay();
      this.bookings.set(bookings);
    } catch (err) {
      console.log(err);
    }
  }
}
