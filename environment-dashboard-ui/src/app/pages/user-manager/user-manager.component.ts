import {Component, effect, inject, OnInit, signal} from '@angular/core';
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


    // this.loadAllUsers()
    //   .then(() => console.log("All users loaded", this.users()));
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsers();
  }

  // private async loadAllUsers() {
  //   try {
  //     const users = await this.userService.loadAllUsers();
  //     this.users.set(users);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


}
