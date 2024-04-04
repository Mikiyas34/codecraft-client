import { BehaviorSubject } from 'rxjs';
import { createElem, getIndexOfElem, placeByIndex } from '../util';
import { writer } from './writer';

class Cursor {
  cursorElem!: HTMLElement;
  ln = new BehaviorSubject<number>(1);
  col = new BehaviorSubject<number>(1);
  textarea?: HTMLElement;
  constructor() {
    this.cursorElem = createElem('div', 'cursor');
  }
  configure(textarea: HTMLElement) {
    this.textarea = textarea;
    textarea.appendChild(this.cursorElem);
  }
  moveTo(ln: number, col: number) {
    console.log('c', col);
    this.cursorElem!.style.top = ln * 19 + 'px';
    this.cursorElem!.style.left = col * 8 + 'px';
    this.ln.next(ln);
    this.col.next(col);
  }
  moveToLeft() {
    let cursorLeft = parseInt(this.cursorElem?.style.left || '1');
    this.cursorElem!.style.left = cursorLeft + 7 + 'px';
  }
}

export const cursor = new Cursor();
