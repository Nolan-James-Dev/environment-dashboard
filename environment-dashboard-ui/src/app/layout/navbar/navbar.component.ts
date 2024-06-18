import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AddComponent} from "../../components/environment/add/add.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly dialog = inject(MatDialog);

  addEnvironment() {
    this.dialog.open(AddComponent, {});
  }

  addUser() {
    this.dialog.open(AddComponent, {});
  }

  openDialog() {
    this.dialog.open(AddComponent, {});
  }
}
