import {Component, effect, inject, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/User.model";
import {NgForOf} from "@angular/common";
import {ListComponent} from "../../components/user/list/list.component";

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [
    NgForOf,
    ListComponent
  ],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.scss'
})
export class UserManagerComponent implements OnInit {
  userService = inject(UserService);
  // users = signal<User[]>([])
  users: User[] | undefined;

  constructor() {
    effect(() => {
      const allUsers = this.userService.allUsers().value;
      if (allUsers) {
        this.users = allUsers;
      }
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsers();
  }

}
