import {Component, effect, inject} from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AddComponent, addEnvironmentDialog} from "../../components/environment/add/add.component";
import {EnvironmentService} from "../../services/environment/environment.service";
import {filter} from "rxjs";
import {UserService} from "../../services/user/user.service";
import {RouterLink} from "@angular/router";
import {addBookingDialog} from "../../components/booking/add/add.component";
import {BookingService} from '../../services/booking/booking.service';
import {NgOptimizedImage} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private _snackBar: MatSnackBar) {
    effect(() => {
      this.bookingService.getBookingsByCurrentDay();

      this.userSnackBar()
      this.environmentSnackBar();
      this.bookingSnackBar();
    });
  }

  addEnvironment() {
    addEnvironmentDialog(this.dialog)
      .pipe(
        filter(value => !!value)
      )
      .subscribe(
        value => {
          this.environmentService.createEnvironment(value);
        }
      );
  }

  // addUser() {
  //   addUserDialog(this.dialog)
  //     .pipe(
  //       filter(value => !!value)
  //     )
  //     .subscribe(
  //       value => {
  //         this.userService.createUser(value);
  //       }
  //     )
  // }


  addBooking() {
    addBookingDialog(this.dialog)
      .pipe(
        filter(value => !!value)
      ).subscribe(
      value => {
        this.bookingService.createBooking(value);
      }
    )
  }

  openDialog() {
    this.dialog.open(AddComponent, {});
  }

  private userSnackBar() {
    const user = this.userService.newUser();
    if (user.status == "ERROR") {
      this._snackBar.open(user.error?.error.error, '', {
        duration: 3000,
        panelClass: ['custom-style']
      });
    }
    if (user.value) {
      this._snackBar.open(`User ${user.value.username} created successfully`, '', {
        duration: 3000,
        panelClass: ['custom-style']
      });
    }
  }

  private environmentSnackBar() {
    const environment = this.environmentService.newEnvironment();
    if (environment.status == "ERROR") {
      this._snackBar.open(environment.error?.error.error, '', {
        duration: 3000,
        panelClass: ['custom-style']
      });
    }
    if (environment.value) {
      this._snackBar.open(`Environment ${environment.value.name} created successfully`, '', {
        duration: 3000,
        panelClass: ['custom-style']
      });
    }
  }

  private bookingSnackBar() {
    const booking = this.bookingService.addBooking();
    if (booking.status == "ERROR") {
      this._snackBar.open(booking.error?.error.error, '', {
        duration: 3000,
        panelClass: ['custom-style']
      });
    }
    if (booking.value) {
      this._snackBar.open(`Booking for ${booking.value.username} created successfully`, '', {
        duration: 3000,
        panelClass: ['custom-style']
      });
    }
  }
}
