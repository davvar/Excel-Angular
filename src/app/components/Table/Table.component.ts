import { Component, OnInit } from '@angular/core';


type Highlighter = null | { width: string; height: string, left: string, top: string }

@Component({
  selector: 'app-table',
  templateUrl: './Table.component.html',
  styleUrls: ['./Table.component.scss']
})
export class TableComponent {
  private readonly charCodes = {
    A: "A".charCodeAt(0),
    Z: "Z".charCodeAt(0),
    get interval() {
      return this.Z - this.A + 1
    }
  }
  private rowsCount = 20
  private selectedCell = { row: 1, col: 1 }
  public highlighter: Highlighter = null
  highlightGroupHeader


  public get columns() {
    return [...Array(this.charCodes.interval)].map((_, index) => this.charCodes.A + index)
  }

  public get rows() {
    return [...Array(this.rowsCount)].map((_, index) => index + 1)
  }

  public selectCell(row: number, col: number) {
    this.selectedCell = { row, col }
  }

  public isSelectedCell(row: number, col: number) {
    return this.selectedCell.row === row && this.selectedCell.col === col
  }

  public highlightGroup(element, table) {
    const prop = element.dataset.type === 'col' ? 'scrollHeight' : 'scrollWidth'
    console.log({ element});

    this.highlightGroupHeader = {
      type: element.dataset.type,
      index:0
    }

    if (prop.includes('Height')) {
      this.highlighter = {
        height: `${table[prop] - element[prop]}px`,
        width: `${element.clientWidth}px`,
        left: `${element.offsetLeft}px`,
        top: `${element.offsetHeight}px`
      }
    } else {
      this.highlighter = {
        width: `${table[prop] - element[prop]}px`,
        height: `${element.clientHeight}px`,
        left: `${element.offsetWidth}px`,
        top: `${element.offsetTop}px`
      }
    }
  }
}
