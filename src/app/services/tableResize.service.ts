import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { capitalize } from '../utils';

interface TargetStyles { height?: string, width?: string }
interface ResizerStyles extends TargetStyles { right?: string, bottom?: string }
interface Target {
  styles: TargetStyles
  id: string
  initSize: number
}
@Injectable({
  providedIn: 'root'
})
export class TableResizeService {
  public resizerstyles: ResizerStyles = {}
  public target: Target = {} as Target

  private resizerInitPos: number
  private sizeProp: 'height' | 'width'
  private mouseEventProp: "pageX" | "pageY"
  private sub: Subscription

  startResizing(event: MouseEvent, table: HTMLElement) {
    const dir = (event.target as HTMLElement).dataset.direction
    this.mouseEventProp = `page${dir}` as "pageX" | "pageY"
    this.resizerInitPos = event[this.mouseEventProp]

    this.sizeProp = dir === 'X' ? 'width' : 'height'
    this.target.initSize = (event.target as HTMLElement).parentElement[`offset${capitalize(this.sizeProp)}`]

    const scrollDir = dir === 'X' ? 'height' : 'width'
    this.resizerstyles = { [scrollDir]: table[`scroll${capitalize(scrollDir)}`] + 'px' }

    console.log(window.getComputedStyle((event.target as HTMLElement)).backgroundColor)

    this.sub = fromEvent<MouseEvent>(table, 'mousemove').subscribe(e => {
      this.resizerstyles[dir === 'X' ? 'right' : 'bottom'] = `${this.resizerInitPos - e[this.mouseEventProp]}px`
    })
  }

finishResizing(event: MouseEvent, index) {
  event.stopPropagation()

  this.sub.unsubscribe()
  this.resizerstyles = {}
  this.target.styles = { [this.sizeProp]: `${this.target.initSize + event[this.mouseEventProp] - this.resizerInitPos}px` }
  this.target.id = index
  console.log("TableResizeService -> finishResizing -> this.target", this.target.id)
}

}
