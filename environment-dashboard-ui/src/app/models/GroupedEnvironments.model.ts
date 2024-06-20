import {Booking} from "./Booking.model";

export type GroupedEnvironments = {
  environment: string,
  bookings: Booking[]
}
