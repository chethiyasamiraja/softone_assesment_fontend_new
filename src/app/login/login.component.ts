import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { TaskService } from '../shared/services/tasks.service';

interface LoginResponse {
  isValid: boolean;
  message: string;
  responseCode: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  errorMessage: string | null = null;

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  onLogin(): void {
    this.errorMessage = null;

    // Trim input
    const username = this.credentials.username.trim();
    const password = this.credentials.password.trim();

    if (!username) {
      this.errorMessage = 'Username is required.';
      return;
    }

    if (!password) {
      this.errorMessage = 'Password is required.';
      return;
    }
 
    this.taskService.validateUser(username, password).subscribe({
      next: (response: LoginResponse) => {
        if (response.isValid) { 
          sessionStorage.setItem('isLoggedIn', 'true');
          
          // Redirect to dashboard
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.message || 'Invalid username or password.';
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Server connection failed. Please try again later.';
      }
    });
  }
}