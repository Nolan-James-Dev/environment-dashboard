import {Component, inject, input, signal} from '@angular/core';
import {EnvironmentService} from "../../services/environment/environment.service";
import {Environment} from "../../models/Environment.model";
import {NgFor} from "@angular/common";
import {Booking} from "../../models/Booking.model";

@Component({
  selector: 'app-environment',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './environment.component.html',
  styleUrl: './environment.component.scss'
})
export class EnvironmentComponent {
  environmentService = inject(EnvironmentService);
  environments = signal<Environment[]>([]);

  bookings = input<Booking[]>()

  constructor() {
    this.loadAllEnvironments()
      .then(() => console.log('All environments loaded', this.environments()));
  }

  private async loadAllEnvironments() {
    try {
      const environments = await this.environmentService.loadAllEnvironments();
      this.environments.set(environments);
    } catch (err) {
      console.log(err);
    }
  }
}
