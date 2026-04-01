import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { gridConfig } from '../../model/grid-config.model';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'GridComponent',
  templateUrl: './grid-config.component.html',
  styleUrl: './grid-config.component.scss',
})
export class GridConfigComponent implements OnChanges {
  @Input() gridConfig!: gridConfig;
  // @Output() clickRow = new EventEmitter<any>();
  @Output() rowDblClick = new EventEmitter<any>();
  @Output() rowDltBtnClick = new EventEmitter<any>();
  @Output() rowUpdBtnClick = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();

  private offSet!: number;
  private pageSize!: number;
  protected columns!: string[];
  protected totalRows!: number;
  protected currentPage: number = 1;
  protected faTrash = faTrash as any;
  protected faPen = faPen as any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gridConfig']) {
      this.columns = this.gridConfig.columns.map((c) => c.name) ?? [];
      this.totalRows = this.gridConfig.dataSource.totalRows ?? 0;
      this.offSet = this.gridConfig.options.offset ?? 0;
      this.pageSize = this.gridConfig.options.pageSize ?? 10;
    }
  }

  /**
   *
   * @param name That matches the model key
   * @returns string: type of column in either type or empty string
   */
  getColumnType(name: string): string {
    return this.gridConfig.columns.find((c) => c.name == name)?.type || '';
  }

  public doubleClickRow(row: any): void {
    this.rowDblClick.emit(row);
  }

  public deleteRow(row: any): void {
    this.rowDltBtnClick.emit(row);
  }

  public updateRow(row: any): void {
    this.rowUpdBtnClick.emit(row);
  }

  // Pagination
  
  /**
   * Calculates total pages based on totalRows and pageSize.
   */
  get totalPage(): number {
    return Math.ceil(this.totalRows / this.pageSize);
  }

  /***
   * Returns an array of page numbers to display in pagination controls.
   * Shows 5 pages at a time.
   */
  get pageList(): number[] {
    const totalPages = this.totalPage;
    let startPage = Math.max(1, this.currentPage - 2); // Show 5 pages at a time
    let endPage = Math.min(totalPages, startPage + 4); 

    if(endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    const pages: number[] = [];
    for(let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.offSet = (page - 1) * this.pageSize;
    this.pageChange.emit(this.offSet);
  }

  /**
   * Shows the first row number being displayed on the current grid. 
   */
  get showingFrom(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  /**
   * Shows the last row number being displayed on the current grid
   */
  get showingTo(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalRows);
  }
}
