import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
  styleUrls: ['./createtask.component.css']
})
export class CreatetaskComponent {
  taskType: string;
  daysList: string[] = ['Monday', 'Tuesday', 'Wednesday',' Thursday', 'Friday', 'Saturday', 'Sunday'];
  newTaskForm = this.fb.group({
    taskId: [0, Validators.required],
    taskType: ['', Validators.required],
    client: ['', Validators.required],
    openDays: ['', Validators.required],
    hour1: '',
    hour2: '',
    hour3: '',
    hour4: '',
    retailer: '',
    pickupList: ''
  });

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  onSubmit() {
    let task = new Task();
    let formValues = this.newTaskForm.value;
    let hours: any = [
      { key: "start", value: formValues.hour1 },
      { key: "stop", value: formValues.hour2 },
      { key: "start", value: formValues.hour3 },
      { key: "stop", value: formValues.hour4 },
    ];

    task.id = formValues.taskId;
    task.type = formValues.taskType;
    task.client = formValues.client;
    task.availableDay = formValues.openDays;
    task.availableTime = hours;

    if (formValues.taskType.toLowerCase() === 'pickup') {
      task.retailer = formValues.retailer;
    } else {
      task.pickupList = formValues.pickupList;
    }

    task.completed = false;

    this.taskService.createTask(task).subscribe();
  }
}
