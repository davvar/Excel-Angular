import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';

import { TableHighlightService } from 'src/app/services/tableHighlight.service';

import { TableResizeService } from 'src/app/services/tableResize.service';

@Component({
  selector: 'app-table',
  templateUrl: './Table.component.html',
  styleUrls: ['./Table.component.scss']
})
export class TableComponent implements AfterViewInit {
  @ViewChild('table') table: ElementRef;
  private readonly charCodes = {
    A: "A".charCodeAt(0),
    Z: "Z".charCodeAt(0),
    get interval() {
      return this.Z - this.A + 1
    }
  }
  private rowsCount = 20
  private selectedCell = { row: 1, col: 1 }
  private tableEvents$: Observable<MouseEvent>

  constructor(
    public highlighter: TableHighlightService,
    public resizer: TableResizeService,
  ) { }

  ngAfterViewInit() {
    this.tableEvents$ = merge<MouseEvent, MouseEvent>(
      fromEvent(this.table.nativeElement, 'mousedown'),
      fromEvent(this.table.nativeElement, 'mouseup')
    )
  }

  public get columns(): number[] {
    return [...Array(this.charCodes.interval)].map((_, index) => this.charCodes.A + index)
  }

  public get rows(): number[] {
    return [...Array(this.rowsCount)].map((_, index) => index + 1)
  }

  public selectCell(row = 1, col = 1): this {
    this.selectedCell = { row, col }
    return this
  }

  public isSelectedCell(row: number, col: number): boolean {
    return this.selectedCell.row === row && this.selectedCell.col === col
  }

  public highlight(e: HTMLElement, table: HTMLElement, index?: number): void {
    this.highlighter.highlight(e, table, index)

    e.dataset.type === 'col'
      ? this.selectCell(1, index)
      : this.selectCell(index, 1)

    this.subscribeToTableEvents()
  }

  public shouldHighlight(e: HTMLElement, index: number): boolean {
    return this.highlighter.shouldHighlightHeader(e, index) || this.highlighter.tableIsHighlighted
  }

  private subscribeToTableEvents(): this {
    let tableSub$ = this.tableEvents$.subscribe(e => {
      const dataType = (e.target as HTMLElement).dataset.type

      if (e.type === 'mousedown' && ['cell', 'highlighter'].includes(dataType)) {
        this.highlighter.destroyHighlighter()
      } else {
        (e.target as HTMLElement).click()
        tableSub$.unsubscribe()
      }
    })

    return this
  }

}
