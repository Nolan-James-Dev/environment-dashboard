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

  async loadAllEnvironments(): Promise<Environment[]> {
    const environments$ =
      this.http.get<Environment[]>(`${this.env.apiRoot}/environments`);
    return await firstValueFrom(environments$);
  }
}
