import {Component, input} from '@angular/core';
import {User} from "../../../models/User.model";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  users = input.required<User[]>();

}
