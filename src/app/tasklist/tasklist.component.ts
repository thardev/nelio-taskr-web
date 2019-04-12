import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList, ComponentFactoryResolver, Input } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Observable, of, forkJoin } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-tasklist',
  providers: [ TaskService ],
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  private tasks: Task[];
  private checkboxesArray: any[];
  @ViewChildren('bulkCheckbox') checkboxes: QueryList<any>;

  constructor(private breakpointObserver: BreakpointObserver, private taskService: TaskService, private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks()
        .subscribe(task => this.tasks = task);
  }

  bulkDelete(): void {
    let idsToDelete = [];
    let tasksToDelete = [];
    let taskIndex;

    this.checkboxesArray = this.checkboxes.toArray();
    this.checkboxesArray.map((checkbox) => {
      if (checkbox._checked) {
        idsToDelete.push(parseInt(checkbox.value));
        tasksToDelete.push(this.taskService.deleteTask(checkbox.value));
      }
    });

    if (idsToDelete.length === 0) {
      this.snackBar.open('No tasks selected to delete', 'Close');
      return;
    }

    idsToDelete.map((id) => {
      taskIndex = this.tasks.findIndex((task) => { return task.id === id });
      this.tasks.splice(taskIndex, 1);
    });

    forkJoin(tasksToDelete).subscribe();
  }

  deleteTask(id): void {
    let taskIndex = this.tasks.findIndex((task) => { return task.id === id });
    if (!this.tasks[taskIndex].completed) {
      this.snackBar.open('Cannot delete uncompleted tasks', 'Close');
      return;
    }
    this.taskService.deleteTask(id)
        .subscribe((res) => {
          this.tasks.splice(taskIndex, 1);
        });
  }
}
