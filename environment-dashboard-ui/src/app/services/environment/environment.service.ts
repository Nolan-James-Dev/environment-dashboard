import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Environment} from "../../models/Environment.model";
import {firstValueFrom} from "rxjs";
import {State} from "../../models/state.model";


@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  http: HttpClient = inject(HttpClient);
  env = environment

  private allEnvironments$: WritableSignal<State<Environment[], HttpErrorResponse>>
    = signal(State.Builder<Environment[], HttpErrorResponse>().forInit().build());
  allEnvironments = computed(() => this.allEnvironments$());

  private newEnvironment$: WritableSignal<State<Environment, HttpErrorResponse>>
    = signal(State.Builder<Environment, HttpErrorResponse>().forInit().build());
  newEnvironment = computed(() => this.newEnvironment$());

  getEnvironments() {
    this.http.get<Environment[]>(`${this.env.apiRoot}/environments`)
      .subscribe({
        next: response => this.allEnvironments$
          .set(State.Builder<Environment[], HttpErrorResponse>().forSuccess(response).build()),
        error: err => {
          this.allEnvironments$
            .set(State.Builder<Environment[], HttpErrorResponse>().forError(err).build())
        }
      })
  }

  createEnvironment(environment: Environment) {
    this.http.post<Environment>(`${this.env.apiRoot}/environments`, environment)
      .subscribe({
        next: response => this.newEnvironment$
          .set(State.Builder<Environment, HttpErrorResponse>().forSuccess(response).build()),
        error: err => this.newEnvironment$
          .set(State.Builder<Environment, HttpErrorResponse>().forError(err).build()),
      })
  }

  // async createEnvironment(environment: Environment): Promise<Environment> {
  //   const environment$ =
  //     this.http.post<Environment>(`${this.env.apiRoot}/environments`, environment);
  //   return await firstValueFrom(environment$);
  // }
  //
  // async loadAllEnvironments(): Promise<Environment[]> {
  //   const environments$ =
  //     this.http.get<Environment[]>(`${this.env.apiRoot}/environments`);
  //   return await firstValueFrom(environments$);
  // }
}
