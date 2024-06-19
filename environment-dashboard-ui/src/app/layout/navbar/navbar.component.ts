import {Component, inject} from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AddComponent, addEnvironmentDialog} from "../../components/environment/add/add.component";
import {EnvironmentService} from "../../services/environment/environment.service";
import {filter} from "rxjs";
import {UserService} from "../../services/user/user.service";
import {addUserDialog} from "../../components/user/add/add.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButton,
    MatAnchor,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly dialog = inject(MatDialog);
  environmentService = inject(EnvironmentService);
  userService = inject(UserService);

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

  openDialog() {
    this.dialog.open(AddComponent, {});
  }
}
