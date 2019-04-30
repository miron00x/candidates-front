import {Directive, EventEmitter, Input, Output} from '@angular/core';

export type SortDirection = 'ASC' | 'DESC' | 'NULL';
const rotate: {[key: string]: SortDirection} = { 'ASC': 'DESC', 'DESC': 'NULL', 'NULL': 'ASC' };

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "ASC"',
    '[class.desc]': 'direction === "DESC"',
	'[class.null]': 'direction === "NULL"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = 'NULL';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}