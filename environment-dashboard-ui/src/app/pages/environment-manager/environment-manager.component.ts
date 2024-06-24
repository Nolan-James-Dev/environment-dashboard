import {Component, effect, inject, OnInit, signal} from '@angular/core';
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
export class EnvironmentManagerComponent implements OnInit {
  environmentService = inject(EnvironmentService);
  // environments = signal<Environment[]>([]);
  environments: Environment[] | undefined;

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
