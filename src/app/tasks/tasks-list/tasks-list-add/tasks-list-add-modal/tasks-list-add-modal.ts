import { ChangeDetectionStrategy,Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks-list-add-modal',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule,MatInputModule, ReactiveFormsModule],
  templateUrl: './tasks-list-add-modal.html',
  styleUrl: './tasks-list-add-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListAddModal {
  private readonly dialogRef = inject(MatDialogRef);
  private readonly fb = inject(FormBuilder)
  protected readonly taskForm = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  })

  public close(): void {
    this.dialogRef.close(null);
  }

  public submit(): void {
    if(this.taskForm.valid) this.dialogRef.close({...this.taskForm.value, isCompleted: false});
  }
}
