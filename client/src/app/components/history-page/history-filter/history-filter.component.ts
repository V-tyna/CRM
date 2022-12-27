import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Filter } from 'src/app/models/filter.model';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})
export class HistoryFilterComponent {
  @Output() onFilter = new EventEmitter<Filter>();
  public filterApplied = false;
  public noData = true;
  public formFilter = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    order: new FormControl<number | null>(null, [Validators.pattern("[0-9]+"), Validators.min(1)])
  });

  public clearForm() {
    this.formFilter.reset();
    this.onFilter.emit({});
    this.filterApplied = false;
  }

  public onSubmitFilter(): void {
    this.filterApplied = true;
    let { end, start, order } = this.formFilter.value;
    if (order) {
      this.onFilter.emit({ order });
      return;
    }
    if (start && end) {
      end = new Date(end.toString().split(' ').map(time => {
        if (time === '00:00:00') {
          time = '23:59:59';
        }
          return time;
      }).join(' '));
      this.onFilter.emit({ start, end });
    }
  }
}
