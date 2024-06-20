import {Component, inject} from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AddComponent, addEnvironmentDialog} from "../../components/environment/add/add.component";
import {EnvironmentService} from "../../services/environment/environment.service";
import {filter} from "rxjs";
import {UserService} from "../../services/user/user.service";
import {addUserDialog} from "../../components/user/add/add.component";
import {RouterLink} from "@angular/router";
import {addBookingDialog} from "../../components/booking/add/add.component";
import {BookingService} from '../../services/booking/booking.service';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButton,
    MatAnchor,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly dialog = inject(MatDialog);
  environmentService = inject(EnvironmentService);
  userService = inject(UserService);
  bookingService = inject(BookingService);

  addEnvironment() {
    addEnvironmentDialog(this.dialog)
      .pipe(
        filter(value => !!value)
      )
      .subscribe(
        value => {
          const environment = this.environmentService.createEnvironment(value);
        }
      );
  }

  addUser() {
    addUserDialog(this.dialog)
      .pipe(
        filter(value => !!value)
      )
      .subscribe(
        value => {
          const user = this.userService.createUser(value);
        }
      )
  }

  addBooking() {
    addBookingDialog(this.dialog)
      .pipe(
        filter(value => !!value)
      )
      .subscribe(
        value => {
          const booking = this.bookingService.createBooking(value);
        }
      )
  }

  openDialog() {
    this.dialog.open(AddComponent, {});
  }
}
