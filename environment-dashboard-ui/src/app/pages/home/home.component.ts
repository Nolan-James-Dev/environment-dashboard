import { Component } from '@angular/core';
import {EnvironmentComponent} from "../../components/environment/environment.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    EnvironmentComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
