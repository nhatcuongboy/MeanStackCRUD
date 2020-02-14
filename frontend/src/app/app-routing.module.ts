import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ListEquipmentComponent } from './components/list-equipment/list-equipment.component';
import { AddEquipmentComponent } from './components/add-equipment/add-equipment.component';
import { EditEquipmentComponent } from './components/edit-equipment/edit-equipment.component';
import { ViewEquipmentComponent } from './components/view-equipment/view-equipment.component';
import { ListUserComponent } from './components/list-user/list-user.component';

import { AuthGuard } from "./shared/auth.guard";
import { LoginGuard } from "./shared/login.guard";
import { SignupGuard } from "./shared/signup.guard";
import { AdminGuard } from "./shared/admin.guard";

const routes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
  { path: 'log-in', component: SigninComponent, canActivate: [LoginGuard] },
  { path: 'sign-up', component: SignupComponent, canActivate: [SignupGuard] },
  { path: 'equipments', component: ListEquipmentComponent, canActivate: [AuthGuard] },
  { path: 'view-equipment/:id', component: ViewEquipmentComponent, canActivate: [AuthGuard] },
  { path: 'edit-equipment/:id', component: EditEquipmentComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'create-equipment', component: AddEquipmentComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'users', component: ListUserComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'user-profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
