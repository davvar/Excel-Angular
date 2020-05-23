import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { capitalize } from '../utils';

type Resizer = { transform?: string, height?: string, width?: string }

@Injectable({
  providedIn: 'root'
})
export class TableResizeService {
  public styles: Resizer = {}
  initialCoordinate: number
  finalCoordinate: number
  prop = ''

  sub: Subscription

  startResizing(event: MouseEvent, table: HTMLElement) {
    const dir = (event.target as HTMLElement).dataset.direction
    try {

      if (!["Y", 'X'].includes(dir)) {
        throw new Error(`dataset.direction must be either 'X' or 'Y' instead got --> '${dir}'`)
      }

      this.prop = 'page' + dir
      const scrollDir = dir === 'X' ? 'height' : 'width'
      this.initialCoordinate = event[this.prop]

      this.styles = { [scrollDir]: table['scroll' + capitalize(scrollDir)] + 'px' }

      this.sub = fromEvent<MouseEvent>(table, 'mousemove').subscribe(e => {

        this.styles.transform = `translate${dir}(${e[this.prop] - this.initialCoordinate}px)`

      })

    } catch (error) { console.error(error) }
  }

  finishResizing(event: MouseEvent) {
    this.sub.unsubscribe()
    this.styles = {}
    this.finalCoordinate = event[this.prop] - this.initialCoordinate
  }

}
