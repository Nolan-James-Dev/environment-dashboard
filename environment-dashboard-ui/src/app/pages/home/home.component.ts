import {Component} from '@angular/core';
import {EnvironmentComponent} from "../../components/environment/environment.component";
import moment from "moment";
import {BookingComponent} from "../../components/booking/booking.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    EnvironmentComponent,
    BookingComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  today = moment(new Date()).format('Do MMMM YYYY');

}
