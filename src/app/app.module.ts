import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { RouterModule, RouterOutlet } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,   
  ],
  imports: [
    BrowserModule,
   FormsModule,
   HttpClientModule,
   RouterModule.forRoot(routes)
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
