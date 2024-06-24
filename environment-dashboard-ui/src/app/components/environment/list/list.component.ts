import {Component, input} from '@angular/core';
import {Environment} from "../../../models/Environment.model";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  environments = input.required<Environment[] | undefined>();

}
