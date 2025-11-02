import { Component, OnInit } from '@angular/core';  
import { Task } from '../Modal/task.model'; 
import { TaskService } from '../shared/services/tasks.service';
import { Router, RouterModule } from '@angular/router';
 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  // standalone: true, 
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  
 
  taskTitle: string = '';
  taskDescription: string = '';
  dueDate: string = '';  
  isCompleted: boolean = false; 
  editingTask: Task | null = null;
  allTasks: Task[] = [];
  filteredTasks: Task[] = []; 
  filterStatus: 'all' | 'active' | 'completed' = 'all';
  sortBy: 'created' | 'title' | 'duedate' = 'created';

  constructor(
 private taskService: TaskService,
  private router: Router
  ) {}

  ngOnInit(): void {  
    this.loadTasks();
    this.applyFiltersAndSort();
  }
  


public loadTasks(): void {
  this.taskService.getAllTasks().subscribe({
    next: (response) => {
      if (response.succeeded && response.data) {
         
        this.allTasks = response.data.map(t => ({
          ...t,
          createdDate: new Date(t.createdDate),
          dueDate: t.dueDate ? new Date(t.dueDate) : null
        }));
        this.applyFiltersAndSort();
      } else {
        
      }
    },
    error: (err) => {
      console.error('API Error', err);
       
    }
  });
}


 
 public editTask(task: Task): void {
    this.editingTask = { ...task };
    this.taskTitle = task.title;
    this.taskDescription = task.description || '';
    this.isCompleted = task.isCompleted;
    this.dueDate = task.dueDate ? this.formatDateForInput(task.dueDate) : '';
  }
 
 public resetForm(): void {
    this.editingTask = null;
    this.taskTitle = '';
    this.taskDescription = '';
    this.isCompleted = false;
    this.dueDate = '';
  }
 


public saveTask(): void {
  if (!this.taskTitle.trim()) return;

  const task: Task = {
    id: this.editingTask?.id,
    title: this.taskTitle.trim(),
    description: this.taskDescription.trim(),
    isCompleted: this.isCompleted,
    createdDate: this.editingTask ? this.editingTask.createdDate : new Date(),
    dueDate: this.dueDate ? new Date(this.dueDate) : null
  };

  this.taskService.saveTask(task).subscribe({
    next: (response) => {
      if (response.succeeded && response.data) {
        const savedTask = response.data;

        const index = this.allTasks.findIndex(t => t.id === savedTask.id);
        if (index > -1) {
          this.allTasks[index] = savedTask;
        } else {
          this.allTasks.unshift(savedTask);
        }

        this.applyFiltersAndSort();
        
         
        alert(response.message || 'Task saved successfully!');

        this.resetForm();
      } else {
         
        alert(response.message || 'Failed to save task.');
      }
    },
    error: (err) => {
      console.error('Save error:', err);
      alert('An error occurred while saving the task: ' + (err.error?.message || 'Unknown error'));
    }
  });
}

 
  // Delete task
 public deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.allTasks = this.allTasks.filter(t => t.id !== id);
      if (this.editingTask?.id === id) this.resetForm();
      this.persistAndRefresh();
    }
  }

  // Apply filters and sorting
 public applyFiltersAndSort(): void {
    let filtered = [...this.allTasks];
 
    if (this.filterStatus === 'active') {
      filtered = filtered.filter(t => !t.isCompleted);
    } else if (this.filterStatus === 'completed') {
      filtered = filtered.filter(t => t.isCompleted);
    }
 
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'duedate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        default: // created
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      }
    });

    this.filteredTasks = filtered;
  }
 
 public formatDateForInput(date: Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];  
  }
 
  private persistAndRefresh(): void {
    this.filteredTasks = [...this.allTasks];
    this.applyFiltersAndSort();
  }





LogoutForm(): void { 
    sessionStorage.removeItem('isLoggedIn');
 
    this.router.navigate(['/login']);
  }



  

}
