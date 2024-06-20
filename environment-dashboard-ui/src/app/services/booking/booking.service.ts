import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Booking} from "../../models/Booking.model";
import {firstValueFrom} from "rxjs";
import {TimeSlot} from "../../models/TimeSlot.model";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  http: HttpClient = inject(HttpClient);
  env = environment

  async createBooking(booking: Booking): Promise<Booking> {
    const booking$ =
      this.http.post<Booking>(`${this.env.apiRoot}/bookings`, booking);
    return await firstValueFrom(booking$);
  }

  async getAllTimeslots() {
    const timeslots$ =
      this.http.get<TimeSlot[]>(`${this.env.apiRoot}/timeslots`);
    return await firstValueFrom(timeslots$);
  }
}
