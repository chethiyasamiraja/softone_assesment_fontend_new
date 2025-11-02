import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  //standalone:true,
  templateUrl: './app.component.html',
   
  styles: [],
})
export class AppComponent {
  title = 'crudApp_new';
}
