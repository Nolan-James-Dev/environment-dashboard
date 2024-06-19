import {Component, inject, signal} from '@angular/core';
import {EnvironmentService} from "../../services/environment/environment.service";
import {Environment} from "../../models/Environment.model";
import {ListComponent} from "../../components/environment/list/list.component";

@Component({
  selector: 'app-environment-manager',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './environment-manager.component.html',
  styleUrl: './environment-manager.component.scss'
})
export class EnvironmentManagerComponent {
  environmentService = inject(EnvironmentService);
  environments = signal<Environment[]>([]);

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
