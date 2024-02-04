import { BehaviorSubject } from 'rxjs';
import { createElem, getIndexOfElem, placeByIndex } from '../util';

class Cursor {
  cursorElem?: HTMLElement;
  ln = new BehaviorSubject<number>(1);
  col = new BehaviorSubject<number>(1);
  constructor() {
    this.cursorElem = createElem('div', 'cursor');
  }
  configure(textarea: HTMLElement) {
    const rect = textarea.getBoundingClientRect();
    textarea.appendChild(this.cursorElem!);
    textarea.addEventListener('mousedown', (e) => {
      console.log(e.clientX - rect.left);
      console.log(e.clientX);
      console.log(rect.left);
      this.cursorElem!.style.left = e.clientX - rect!.left + 'px';
      this.cursorElem!.style.top = e.clientY - rect!.top + 'px';
    });
  }
  moveTo(ln: number, col: number) {}
  moveToLeft() {
    let cursorLeft = parseInt(this.cursorElem?.style.left || '1');
    this.cursorElem!.style.left = cursorLeft + 7 + 'px';
  }
}

export const cursor = new Cursor();
