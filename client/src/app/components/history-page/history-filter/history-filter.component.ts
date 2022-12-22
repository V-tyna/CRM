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
  public noData = true;
  public formFilter = new FormGroup({
    start: new FormControl<Date | string>(''),
    end: new FormControl<Date | string>(''),
    order: new FormControl<number | null>(null, Validators.pattern("[0-9]+"))
  });

  public clearForm() {
    this.formFilter.reset();
  }

  public onSubmitFilter(): void {
    let {end, start, order} = this.formFilter.value;
    if (order)  {
      end = null;
      start = null;
    }
    this.onFilter.emit({end: end || '', start: start || '', order: order || ''});
  }
}
