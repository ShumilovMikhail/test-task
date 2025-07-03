import { Component,ChangeDetectionStrategy, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog
} from '@angular/material/dialog';

import { TasksListAddModal } from './tasks-list-add-modal/tasks-list-add-modal';
import { TaskModel } from '@tasks/tasks.types';

@Component({
  selector: 'app-tasks-list-add',
  imports: [MatIconModule,MatDividerModule,MatButtonModule],
  templateUrl: './tasks-list-add.html',
  styleUrl: './tasks-list-add.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListAdd {
  public readonly addEvent = output<TaskModel>();
  readonly dialog = inject(MatDialog);

  public openDialog() {
    const dialogRef = this.dialog.open(TasksListAddModal, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe((value: TaskModel | null) => {
      if(value) this.addEvent.emit(value)
    })
  }
}
