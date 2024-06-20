import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {firstValueFrom} from "rxjs";
import {User} from "../../models/User.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  env = environment

  users$ = this.loadAllUsers();

  async createUser(user: User): Promise<User> {
    const user$ =
      this.http.post<User>(`${this.env.apiRoot}/users`, user);
    return await firstValueFrom(user$);
  }

  async loadAllUsers(): Promise<User[]> {
    const users$ =
      this.http.get<User[]>(`${this.env.apiRoot}/users`);
    return await firstValueFrom(users$);
  }
}
