import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { ListEquipmentComponent } from './components/list-equipment/list-equipment.component';
import { AddEquipmentComponent } from './components/add-equipment/add-equipment.component';
import { ViewEquipmentComponent } from './components/view-equipment/view-equipment.component';
import { EditEquipmentComponent } from './components/edit-equipment/edit-equipment.component';
import { ListUserComponent } from './components/list-user/list-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    ListEquipmentComponent,
    AddEquipmentComponent,
    ViewEquipmentComponent,
    EditEquipmentComponent,
    ListUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
