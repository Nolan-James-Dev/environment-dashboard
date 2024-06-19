import {Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {UserManagerComponent} from "./pages/user-manager/user-manager.component";
import {EnvironmentManagerComponent} from "./pages/environment-manager/environment-manager.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user-manager', component: UserManagerComponent},
  {path: 'environment-manager', component: EnvironmentManagerComponent},
];
