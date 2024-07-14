import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [MatIconModule, 
            MatTableModule,
            CommonModule],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {

  @Input() columns: any = [];
  @Input() displayColumns: any = [];
  @Input() dataSource:any = [];
  @Input() actions: string[] = ['null','null','null'];
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowActionDetails: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowActionEdit: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() {}

  ngOnInit(): void {}

  emitRowAction(row: any) {
    this.rowAction.emit(row);
  }

  emitRowActionEdit(row: any) {
    this.rowActionEdit.emit(row);
  }

  emitRowActionDetails(row: any) {
    this.rowActionDetails.emit(row);
  }

}
