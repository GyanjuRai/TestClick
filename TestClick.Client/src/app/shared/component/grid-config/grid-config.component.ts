import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { gridConfig } from './grid-config.model';

@Component({
  selector: 'GridComponent',
  templateUrl: './grid-config.component.html',
  styleUrl: './grid-config.component.scss',
})
export class GridConfigComponent implements OnChanges {

  @Input() gridConfig!: gridConfig;
  @Output() clickRow = new EventEmitter<any>();
  @Output() rowDblClick = new EventEmitter<any>();

  protected columns!: string[];
  private selectedRow!: any;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['gridConfig']) {
      this.columns = this.gridConfig.columns.map(c => c.name) ?? [];
    }
  }
  
  /**
   * 
   * @param name That matches the model key
   * @returns string: type of column in either type or empty string 
   */
  getColumnType(name: string): string {
    return this.gridConfig.columns.find(c => c.name == name)?.type || '';
  }

  public selectRow(row: any) :void {
    this.selectedRow = row;
    this.clickRow.emit(this.selectedRow);
  }

  public doubleClickRow(row: any) :void {
    this.rowDblClick.emit(this.selectedRow);
  }
}
