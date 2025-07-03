import { ChangeDetectionStrategy,Component, output } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tasks-list-search',
  imports: [MatFormFieldModule,MatIconModule,MatInputModule],
  templateUrl: './tasks-list-search.html',
  styleUrl: './tasks-list-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListSearch {
  public inputEvent = output<string>();

  public onInput(event: Event): void {
    this.inputEvent.emit((event.target as HTMLInputElement).value);
  }
}
