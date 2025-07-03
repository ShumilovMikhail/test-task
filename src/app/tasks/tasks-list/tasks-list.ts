import { ChangeDetectionStrategy,Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { RouterLink } from '@angular/router';

import { TaskModel } from '@tasks/tasks.types';
import { TasksService } from '@tasks/tasks.service';
import { TruncatePipe } from 'app/share/pipes/truncate-pipe';
import { TasksListSearch } from './tasks-list-search/tasks-list-search';
import { TasksListAdd } from './tasks-list-add/tasks-list-add';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-tasks-list',
  imports: [MatCardModule,MatChipsModule,TruncatePipe, TasksListSearch,TasksListAdd, RouterLink, MatButtonModule, MatSlideToggle ],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksList {
  private readonly tasksService = inject(TasksService);
  protected readonly tasks: Signal<TaskModel[] | null> = this.tasksService.tasks;
  protected readonly query: WritableSignal<string> = signal('');
  protected readonly filteredTasks: Signal<TaskModel[] | null> = computed(() => {
    const query = this.query()?.toLowerCase().trim() ?? '';
    if (!query) return this.tasks();
    return this.tasks()?.filter(task =>
      task.title.toLowerCase().includes(query)
    ) || null;
  });

  public onAddTask(task: TaskModel): void {
    this.tasksService.addTask(task);
  }

  public onChangeTaskStatus(id: number, isCompleted: boolean): void {
    this.tasksService.changeTaskStatus(id,isCompleted)
  }

  public onDeleteTask(id: number): void {
    this.tasksService.deleteTask(id)
  }
}
