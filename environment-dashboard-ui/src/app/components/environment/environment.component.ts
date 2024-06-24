import {Component, effect, inject, input, OnInit, signal} from '@angular/core';
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
export class EnvironmentComponent implements OnInit {
  environmentService = inject(EnvironmentService);
  // environments = signal<Environment[]>([]);
  environments: Environment[] | undefined;

  bookings = input<Booking[]>()

  constructor() {
    effect(() => {
      const allEnvironments = this.environmentService.allEnvironments().value;
      if (allEnvironments) {
        this.environments = allEnvironments;
      }
    });
    // this.loadAllEnvironments()
    //   .then(() => console.log('All environments loaded', this.environments()));
  }

  ngOnInit(): void {
    this.getEnvironments();
  }

  private getEnvironments() {
    this.environmentService.getEnvironments();
  }

  // private async loadAllEnvironments() {
  //   try {
  //     const environments = await this.environmentService.loadAllEnvironments();
  //     this.environments.set(environments);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
