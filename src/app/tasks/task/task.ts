import { ChangeDetectionStrategy,Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, Observable, take } from 'rxjs';

import { TasksService } from '@tasks/tasks.service';
import { TaskModel } from '@tasks/tasks.types';

@Component({
  selector: 'app-book',
  imports: [RouterLink],
  templateUrl: './task.html',
  styleUrl: './task.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Task implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router)
  private readonly taskService = inject(TasksService);
  private readonly isLoaded: Observable<boolean> = toObservable(this.taskService.isLoaded);
  protected task: WritableSignal<TaskModel | null> = signal(null);

  public ngOnInit(): void {
    this.isLoaded.pipe(filter((value) => value), take(1)).subscribe(() => {
      const id = this.route.snapshot.paramMap.get('id');
      if(id === null || isNaN(+id)) {
        this.router.navigateByUrl('/');
        return
      }
      const task = this.taskService.getTask(+id);
      if(!task) {
        this.router.navigateByUrl('/')
        return
      };
      this.task.set(task)
    })
  }
}
