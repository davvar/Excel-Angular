import { Injectable } from '@angular/core';

type HighlighterStyles = null | {
  width: string;
  height: string,
  left: string,
  top: string
}

@Injectable({
  providedIn: 'root'
})
export class TableHighlightService {
  public styles: HighlighterStyles = null
  public headerId: string | null
  public tableIsHighlighted: boolean = false

  public highlight(e: HTMLElement, table: HTMLElement, index?: number): void {
    if (!index) {
      this.highlightTable(e, table)
    } else {
      this.destroyHighlighter()

      const { type } = e.dataset
      const prop = type === 'col' ? 'scrollHeight' : 'scrollWidth'
      let size = table[prop] - e[prop]
      this.headerId = `${type}:${index}`

      type === 'col'
        ? this.highlightCol(e, size)
        : this.highlightRow(e, size)
    }

  }

  private highlightTable(e: HTMLElement, table: HTMLElement): this {
    this.tableIsHighlighted = true

    this.styles = {
      height: `${table.scrollHeight - e.offsetHeight}px`,
      width: `${table.scrollWidth - e.offsetWidth}px`,
      left: `${e.clientWidth}px`,
      top: `${e.clientHeight}px`
    }

    return this
  }

  private highlightCol(e: HTMLElement, height: number): this {
    this.styles = {
      height: `${height}px`,
      width: `${e.scrollWidth}px`,
      left: `${e.offsetLeft}px`,
      top: `${e.offsetHeight}px`
    }

    return this
  }

  private highlightRow(e: HTMLElement, width: number): this {
    this.styles = {
      width: `${width}px`,
      height: `${e.scrollHeight}px`,
      left: `${e.offsetWidth}px`,
      top: `${e.offsetTop}px`
    }

    return this
  }

  public destroyHighlighter(): this {
    this.styles = null
    this.headerId = null
    this.tableIsHighlighted = false

    return this
  }

  public shouldHighlightHeader(e: HTMLElement, index: number): boolean {
    return this.headerId === `${e.dataset.type}:${index}`
  }

}
