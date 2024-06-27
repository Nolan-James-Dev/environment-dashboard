import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {firstValueFrom} from "rxjs";
import {User} from "../../models/User.model";
import {State} from "../../models/state.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  env = environment


  private allUsers$: WritableSignal<State<User[], HttpErrorResponse>>
    = signal(State.Builder<User[], HttpErrorResponse>().forInit().build());
  allUsers = computed(() => this.allUsers$());

  private newUser$: WritableSignal<State<User, HttpErrorResponse>>
    = signal(State.Builder<User, HttpErrorResponse>().forInit().build());
  newUser = computed(() => this.newUser$());

  getUsers() {
    this.http.get<User[]>(`${this.env.apiRoot}/users`)
      .subscribe({
        next: response => this.allUsers$
          .set(State.Builder<User[], HttpErrorResponse>().forSuccess(response).build()),
        error: err => this.allUsers$
          .set(State.Builder<User[], HttpErrorResponse>().forError(err).build())
      });
  }

  createUser(user: User) {
    this.http.post<User>(`${this.env.apiRoot}/users`, user)
      .subscribe({
        next: response => {
          let newUser
            = State.Builder<User, HttpErrorResponse>().forSuccess(response).build()
          this.newUser$
            .set(State.Builder<User, HttpErrorResponse>().forSuccess(response).build())
          this.allUsers$.update(value => value);
        },
        error: err => this.newUser$
          .set(State.Builder<User, HttpErrorResponse>().forError(err).build())
      });
  }
}
