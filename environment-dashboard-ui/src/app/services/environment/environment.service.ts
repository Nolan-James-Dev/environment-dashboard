import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {Environment} from "../../models/Environment.model";
import {firstValueFrom} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  http: HttpClient = inject(HttpClient);
  env = environment

  async createEnvironment(environment: Environment): Promise<Environment> {
    const environment$ =
      this.http.post<Environment>(`${this.env.apiRoot}/environments`, environment);
    return await firstValueFrom(environment$);
  }

  async loadAllEnvironments(): Promise<Environment[]> {
    const environments$ =
      this.http.get<Environment[]>(`${this.env.apiRoot}/environments`);
    return await firstValueFrom(environments$);
  }
}
