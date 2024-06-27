import {Component, effect, inject, input} from '@angular/core';
import {User} from "../../../models/User.model";
import {NgFor} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {AddComponent, addUserDialog} from "../add/add.component";
import {filter} from "rxjs";
import {UserService} from "../../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, MatButton, AddComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  userService = inject(UserService);
  readonly dialog = inject(MatDialog);
  users: User[] | undefined = [];

  constructor() {
    this.listenUsers();
    this.listenUserCreate();
  }

  addUser() {
    addUserDialog(this.dialog)
      .pipe(
        filter(value => !!value)
      )
      .subscribe(
        value => {
          this.userService.createUser(value);
        }
      )
  }

  private listenUsers() {
    effect(() => {
      const allUsers = this.userService.allUsers().value;
      if (allUsers) {
        this.users = allUsers;
      }
    });
  }

  private listenUserCreate() {
    effect(() => {
      const newUser = this.userService.newUser().value;
      if (newUser) {
        this.users?.push(newUser);
      }
    });
  }
}
