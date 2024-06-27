import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Booking} from "../../models/Booking.model";
import {firstValueFrom} from "rxjs";
import {TimeSlot} from "../../models/TimeSlot.model";
import {State} from "../../models/state.model";
import {User} from "../../models/User.model";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  http: HttpClient = inject(HttpClient);
  env = environment

  private allBookingsByCurrentDay$: WritableSignal<State<Booking[], HttpErrorResponse>>
    = signal(State.Builder<Booking[], HttpErrorResponse>().forInit().build());
  allBookingsByCurrentDay = computed(() => this.allBookingsByCurrentDay$());

  private allBookingsBySelectedDay$: WritableSignal<State<Booking[], HttpErrorResponse>>
    = signal(State.Builder<Booking[], HttpErrorResponse>().forInit().build());
  allBookingsBySelectedDay = computed(() => this.allBookingsBySelectedDay$());

  private addBooking$: WritableSignal<State<Booking, HttpErrorResponse>>
    = signal(State.Builder<Booking, HttpErrorResponse>().forInit().build());
  addBooking = computed(() => this.addBooking$());

  getBookingsByCurrentDay() {
    this.http.get<Booking[]>(`${this.env.apiRoot}/bookings`)
      .subscribe({
        next: response => this.allBookingsByCurrentDay$
          .set(State.Builder<Booking[], HttpErrorResponse>().forSuccess(response).build()),
        error: err => this.allBookingsByCurrentDay$
          .set(State.Builder<Booking[], HttpErrorResponse>().forSuccess(err).build())
      });
  }

  getBookingsBySelectedDay(date: string) {
    this.http.get<Booking[]>(`${this.env.apiRoot}/bookings/date?date=${date}`)
      .subscribe({
        next: response => this.allBookingsByCurrentDay$
          .set(State.Builder<Booking[], HttpErrorResponse>().forSuccess(response).build()),
        error: err => this.allBookingsByCurrentDay$
          .set(State.Builder<Booking[], HttpErrorResponse>().forSuccess(err).build())
      });
  }

  createBooking(booking: Booking) {
    this.http.post<Booking>(`${this.env.apiRoot}/bookings`, booking)
      .subscribe({
        next: response => this.addBooking$
          .set(State.Builder<Booking, HttpErrorResponse>().forSuccess(response).build()),
        error: err => this.addBooking$
          .set(State.Builder<Booking, HttpErrorResponse>().forError(err).build()),
      })
  }

  async getAllTimeslots() {
    const timeslots$ =
      this.http.get<TimeSlot[]>(`${this.env.apiRoot}/timeslots`);

    return await firstValueFrom(timeslots$);
  }


}
