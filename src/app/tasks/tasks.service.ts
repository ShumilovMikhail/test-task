import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

import { TaskModel } from './tasks.types';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly tasksSignal: WritableSignal<TaskModel[] | null> = signal(null);
  public readonly tasks: Signal<TaskModel[] | null> = computed(() => this.tasksSignal());
  public readonly isLoaded: WritableSignal<boolean> = signal(false);
  private readonly jwtKey = 'tasks';

  constructor() {
    this.loadTasks()
  }

  public loadTasks(): void {
    const tasks = localStorage.getItem(this.jwtKey);
    if(tasks) {
      this.tasksSignal.set(JSON.parse(tasks))
      this.isLoaded.set(true)
    };
  }

  public addTask(task: TaskModel): void {
    let tasks = this.tasksSignal();
    if(tasks) {
      const maxId = tasks.reduce((acc: number,item: TaskModel) => acc > item.id ? acc : item.id,0)
      const newTask = {...task,id: maxId + 1 };
      tasks.unshift(newTask)
    }
    else tasks = [{...task,id: 0}];
    localStorage.setItem(this.jwtKey,JSON.stringify(tasks));
    this.tasksSignal.set(tasks);
  }

  public getTask(id: number): TaskModel | null {
    const tasks = this.tasks();
    if(!tasks) return null;
    const task = tasks.find((task: TaskModel) => task.id === id);
    return task ? task : null;
  }

  public changeTaskStatus(id: number, isCompleted: boolean): void {
    let tasks = this.tasksSignal();
    if(!tasks) return
    const taskIndex = tasks.findIndex((task) => task.id === id);
    const task = tasks[taskIndex];
    if(taskIndex >= 0) tasks[taskIndex] = {...task, isCompleted: isCompleted}
    localStorage.setItem(this.jwtKey,JSON.stringify(tasks));
    this.tasksSignal.set(tasks);
  }

  public deleteTask(id: number): void {
    let tasks = this.tasksSignal();
    if(!tasks) return;
    tasks = tasks.filter((task) => task.id !== id)
    localStorage.setItem(this.jwtKey,JSON.stringify(tasks));
    this.tasksSignal.set(tasks);
  }
}
